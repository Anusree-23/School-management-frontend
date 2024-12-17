import React, { useState, useEffect } from 'react';
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from '../../service/api/studentaApi';
import ReusableTable from '../../components/ReusableTable';
import EditModal from '../../components/Shared/EditModal';
import DeleteModal from '../../components/Shared/DeleteModal';

const StudentsPage = () => {
  const [data, setData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(''); // Assume you fetch this from the auth context or API

  const columns = [
    { header: 'Student ID', accessor: '_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Class', accessor: 'class' },
    { header: 'Total Fees Paid', accessor: 'totalFeesPaid' },
    { header: 'Outstanding Fees', accessor: 'outstandingFees' },
    { header: 'Books Borrowed', accessor: 'booksBorrowed' },
    { header: 'Books Returned', accessor: 'booksReturned' },
  ];

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const students = await getStudents();

      // Process data for derived fields
      const processedStudents = students.map((student) => {
        const totalFeesPaid = student.feesHistory
          .filter((fee) => fee.status === 'paid')
          .reduce((acc, fee) => acc + fee.amount, 0);

        const outstandingFees = student.feesHistory
          .filter((fee) => fee.status === 'unpaid')
          .reduce((acc, fee) => acc + fee.amount, 0);

        const booksBorrowed = student.libraryHistory.filter(
          (book) => book.status === 'borrowed'
        ).length;

        const booksReturned = student.libraryHistory.filter(
          (book) => book.status === 'returned'
        ).length;

        return {
          ...student,
          totalFeesPaid,
          outstandingFees,
          booksBorrowed,
          booksReturned,
        };
      });

      setData(processedStudents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    // Assume you fetch the user role from an API or context
    const fetchUserRole = async () => {
      // Fetch or set the role of the user here
      const role = 'Librarian'; // Example role (this should be dynamic)
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  // Add a new student
  const handleAddSubmit = async (newStudent) => {
    try {
      await addStudent(newStudent);
      setAddModalOpen(false);
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Update a student
  const handleEditSubmit = async (updatedStudent) => {
    try {
      await updateStudent(updatedStudent._id, updatedStudent);
      setEditModalOpen(false);
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Delete a student
  const handleDeleteConfirm = async () => {
    try {
      await deleteStudent(currentStudent._id);
      setDeleteModalOpen(false);
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Open Edit Modal
  const handleEdit = (row) => {
    setCurrentStudent(row);
    setEditModalOpen(true);
  };

  // Open Delete Modal
  const handleDelete = (row) => {
    setCurrentStudent(row);
    setDeleteModalOpen(true);
  };

  return (
    <div>
      <h1>Student Details</h1>

      {/* Hide Add New button if the user is a Librarian */}
      {userRole !== 'Librarian' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '10px',
            marginRight: '30px',
          }}
        >
          <button
            onClick={() => {
              setCurrentStudent({ name: '', class: '' });
              setAddModalOpen(true);
            }}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Add New
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <ReusableTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionsEnabled={true}
        />
      )}

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        formData={currentStudent}
        fields={[
          { name: '_id', label: 'Student ID', disabled: true },
          { name: 'name', label: 'Name' },
          { name: 'class', label: 'Class' },
        ]}
        title="Edit Student"
      />

      {/* Add Modal */}
      <EditModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        formData={currentStudent}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'class', label: 'Class' },
        ]}
        title="Add New Student"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete "${currentStudent?.name}"?`}
      />
    </div>
  );
};

export default StudentsPage;
