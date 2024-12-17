import React, { useState, useEffect } from 'react';
import ReusableTable from '../../components/ReusableTable';
import { getAllStaff, createStaff, updateStaff, deleteStaff } from '../../service/api/manageStaffApi';
import EditModal from '../../components/Shared/EditModal';
import DeleteModal from '../../components/Shared/DeleteModal';

const ManageStaff = () => {
  const [staffData, setStaffData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'ID', accessor: '_id' },
    { header: 'Role', accessor: 'role' },
    { header: 'Email', accessor: 'email' },
    { header: 'Date of Join', accessor: 'dateOfJoin' },
  ];

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const staff = await getAllStaff();
        setStaffData(staff);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  const handleEdit = (row) => {
    console.log('Editing row:', row); // Debug log
    if (row?._id) { // Updated to check for `_id`
      setSelectedRow(row);
      setIsEditModalOpen(true);
    } else {
      console.error('Row does not contain an id:', row);
    }
  };

  const handleEditSubmit = async (updatedData) => {
    console.log('Submitting edit:', updatedData); // Debug log
    if (!selectedRow?._id) {
      console.error('Selected row does not have an id');
      return;
    }

    try {
      const updatedStaff = await updateStaff(selectedRow._id, updatedData); // Updated `_id`
      setStaffData((prevData) =>
        prevData.map((staff) =>
          staff._id === updatedStaff._id ? updatedStaff : staff
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const handleDelete = (row) => {
    console.log('Deleting row:', row); // Debug log
    if (row?._id) { // Updated to check for `_id`
      setSelectedRow(row);
      setIsDeleteModalOpen(true);
    } else {
      console.error('Row does not contain an id:', row);
    }
  };

  const handleDeleteConfirm = async () => {
    console.log('Confirming delete for row:', selectedRow); // Debug log
    if (!selectedRow?._id) {
      console.error('Selected row does not have an id');
      return;
    }

    try {
      await deleteStaff(selectedRow._id); // Updated `_id`
      setStaffData((prevData) => prevData.filter((staff) => staff._id !== selectedRow._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleRowClick = (row) => {
    alert(`Viewing details for ${row.name}`);
  };

  return (
    <div className="manage-staff">
      <h1>Manage Staff</h1>
      <ReusableTable
        columns={columns}
        data={staffData}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actionsEnabled={true}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        formData={selectedRow}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'role', label: 'Role' },
          { name: 'email', label: 'Email' },
          { name: 'dateOfJoin', label: 'Date of Join', disabled: true },
        ]}
        title="Edit Staff"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete ${selectedRow?.name}?`}
      />
    </div>
  );
};

export default ManageStaff;
