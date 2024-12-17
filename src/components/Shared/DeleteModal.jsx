import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/DeleteModal.css'; // Add styles for the modal

const DeleteModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h2>Confirm Deletion</h2>
        <p>{message || 'Are you sure you want to delete this item?'}</p>
        <div className="delete-modal-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Yes, Delete
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default DeleteModal;
