import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/EditModal.css'; // Import your modal styles

const EditModal = ({ isOpen, onClose, onSubmit, formData, fields, title }) => {
  const [formState, setFormState] = useState({});

  // Sync formState when formData changes
  useEffect(() => {
    if (formData) {
      setFormState(formData);
    }
  }, [formData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formState); // Pass the updated formState back to parent
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2>{title}</h2> {/* Dynamic title */}
        <form>
          {fields.map((field, index) => (
            <div key={index} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                value={formState[field.name] || ''} // Ensure input reflects state
                onChange={handleChange}
                disabled={field.disabled || false}
              />
            </div>
          ))}
        </form>
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="submit-button">
            Save
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  title: PropTypes.string, // New prop for the modal title
};

EditModal.defaultProps = {
  formData: {},
  title: 'Edit Item', // Default title
};

export default EditModal;
