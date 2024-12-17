import React, { useState, useEffect } from "react";
import ReusableTable from "../../components/ReusableTable"; // Import the reusable table component
import EditModal from "../../components/Shared/EditModal"; // Reuse the EditModal component
import DeleteModal from "../../components/Shared/DeleteModal"; // Reuse the DeleteModal component
import { getAllLibraryRecords, addLibraryRecord, editLibraryRecord, deleteLibraryRecord } from "../../service/api/libraryRecordApi";

// Helper function to format the date (MM/DD/YYYY)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');  // Add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is 0-indexed, so add 1
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;  // Return in MM/DD/YYYY format
};

const LibraryRecordsPage = () => {
  // Define the columns for the library history table
  const columns = [
    { header: "Student ID", accessor: "studentId" },
    { header: "Book Name", accessor: "bookName" },
    { header: "Borrow Date", accessor: "borrowDate" },
    { header: "Return Date", accessor: "returnDate" },
    { header: "Status", accessor: "status" },
  ];

  // State for storing library records
  const [libraryData, setLibraryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // State for modal visibility and current record
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // Fetch all library records when the component mounts
  useEffect(() => {
    const fetchLibraryRecords = async () => {
      try {
        const data = await getAllLibraryRecords();
        setLibraryData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLibraryRecords();
  }, []);

  // Handle page changes
  const handlePageChange = (page) => setCurrentPage(page);

  // Handle form submission (for editing or adding new record)
  const handleEditSubmit = async (updatedRecord) => {
    try {
      if (updatedRecord._id) {
        // Update existing record
        const data = await editLibraryRecord(updatedRecord._id, updatedRecord);
        setLibraryData((prevData) =>
          prevData.map((record) =>
            record._id === data._id ? data : record
          )
        );
      } else {
        // Add new record
        const data = await addLibraryRecord(updatedRecord);
        setLibraryData((prevData) => [...prevData, data]);
      }

      // Refetch the data after add/edit operation
      const refetchedData = await getAllLibraryRecords();
      setLibraryData(refetchedData); // Update the state with the latest data

      setEditModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error(error.message);
    }
  };

 // Handle confirm delete action
const handleDeleteConfirm = async () => {
  try {
    if (!currentRecord || !currentRecord._id) {
      throw new Error("No record selected for deletion.");
    }

    // Sending the delete request to the API
    const response = await deleteLibraryRecord(currentRecord._id);

    if (response.status === 200) {
      // If the response is successful, remove the record from the state
      setLibraryData((prevData) =>
        prevData.filter((record) => record._id !== currentRecord._id)
      );
      setDeleteModalOpen(false); // Close the delete modal
    } else {
      throw new Error("Failed to delete record.");
    }
  } catch (error) {
    console.error("Error deleting record:", error.message);
    alert("Failed to delete the record. Please try again.");
  }
};


  // Handle adding new record
  const handleAddNew = () => {
    setCurrentRecord({
      studentId: "",
      bookName: "",
      borrowDate: "",
      returnDate: "",
      status: "",
    });
    setEditModalOpen(true); // Open the modal for adding new record
  };

  // Paginate data for the current page and format dates
  const paginatedData = libraryData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  ).map(record => ({
    ...record,
    borrowDate: formatDate(record.borrowDate),  // Format borrow date
    returnDate: formatDate(record.returnDate),  // Format return date
  }));

  return (
    <div style={{ width: "100%" }}>
      <h1>Library Records</h1>

      {/* Add New Button */}
      <button
        className="add-new-button"
        onClick={handleAddNew}
        style={{
          float: "right",
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          marginRight: "30px",
        }}
      >
        Add New
      </button>

      {/* Reusable Table Component */}
      <ReusableTable
        columns={columns}
        data={paginatedData}
        onEdit={(row) => {
          setCurrentRecord(row);
          setEditModalOpen(true);
        }}
        onDelete={(row) => {
          setCurrentRecord(row);
          setDeleteModalOpen(true);
        }}
        actionsEnabled={true}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />

      {/* Edit Modal (Reused for Add New and Edit) */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        formData={currentRecord}
        fields={[
          { name: "studentId", label: "Student ID" },
          { name: "bookName", label: "Book Name" },
          { name: "borrowDate", label: "Borrow Date" },
          { name: "returnDate", label: "Return Date" },
          { name: "status", label: "Status" },
        ]}
        title={currentRecord?._id ? "Edit Library Record" : "Add New Library Record"}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the record for "${currentRecord?.bookName}"?`}
      />
    </div>
  );
};

export default LibraryRecordsPage;
