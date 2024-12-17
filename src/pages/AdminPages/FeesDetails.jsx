import React, { useState, useEffect } from 'react';
import ReusableTable from '../../components/ReusableTable'; // Import the reusable table component
import DeleteModal from '../../components/Shared/DeleteModal'; // Import DeleteModal
import EditModal from '../../components/Shared/EditModal'; // Import EditModal
import { fetchFeesData, updateFeeRecord, deleteFeeRecord } from '../../service/api/feesDetailsApi'; // Import API functions

const FeesRecords = () => {
  const [feesData, setFeesData] = useState([]); // State for fees data
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item

  // Fetch fees data on component mount
  useEffect(() => {
    const loadFeesData = async () => {
      try {
        const data = await fetchFeesData(); // Fetch data from API
        setFeesData(data);
      } catch (error) {
        console.error('Failed to load fees data:', error);
      }
    };

    loadFeesData();
  }, []);

  // Edit handler
  const handleEdit = (row) => {
    setSelectedItem(row); // Set selected row
    setIsEditModalOpen(true); // Open edit modal
  };

  // Delete handler
  const handleDelete = (row) => {
    setSelectedItem(row); // Set selected row
    setIsDeleteModalOpen(true); // Open delete modal
  };

  // Confirm delete action
  const handleConfirmDelete = async () => {
    try {
      await deleteFeeRecord(selectedItem._id); // Call delete API
      setFeesData((prevData) => prevData.filter((item) => item._id !== selectedItem._id)); // Update state
      setIsDeleteModalOpen(false); // Close delete modal
    } catch (error) {
      console.error('Failed to delete fee record:', error);
    }
  };

  // Handle submitting the edit form
  const handleEditSubmit = async (updatedData) => {
    try {
      const updatedRecord = await updateFeeRecord(selectedItem._id, updatedData); // Call update API
      setFeesData((prevData) =>
        prevData.map((item) =>
          item._id === selectedItem._id ? updatedRecord.data : item // Update the specific record in state
        )
      );
      setIsEditModalOpen(false); // Close edit modal
    } catch (error) {
      console.error('Failed to update fee record:', error);
    }
  };

  // Close modals
  const closeEditModal = () => setIsEditModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Columns for the table
  const columns = [
    { header: 'Student ID', accessor: 'studentId' },
    { header: 'Fee Type', accessor: 'feeType' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Payment Date', accessor: 'paymentDate' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <h1>Fees Records</h1>
      <ReusableTable
        columns={columns}
        data={feesData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actionsEnabled={true}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this fee record?"
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        formData={selectedItem}
        fields={[
          { name: 'feeType', label: 'Fee Type' },
          { name: 'amount', label: 'Amount' },
          { name: 'paymentDate', label: 'Payment Date' },
          { name: 'status', label: 'Status' },
        ]}
        title="Edit Fee Record"
      />
    </div>
  );
};

export default FeesRecords;
