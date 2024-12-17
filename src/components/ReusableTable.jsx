import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ReusableTable.css'; // Optional: Add styles if needed

const ReusableTable = ({
  columns,
  data,
  onRowClick,
  onEdit,
  onDelete,
  actionsEnabled,
  customActions,
  userRole, // Accept userRole as a prop
}) => {
  return (
    <div className="reusable-table-container">
      <table className="reusable-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                style={index === 0 ? { width: '215px' } : {}} // Add width to the first column
              >
                {col.header}
              </th>
            ))}
            {actionsEnabled && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    style={colIndex === 0 ? { width: '215px' } : {}} // Add width to the first column
                  >
                    {row[col.accessor]}
                  </td>
                ))}
                {actionsEnabled && (
                  <td className="action-buttons">
                    {/* Conditionally render buttons based on userRole */}
                    {onEdit && userRole !== 'Librarian' && (  // Hide Edit for Librarians
                      <button
                        className="edit-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && userRole !== 'Librarian' && (  // Hide Delete for Librarians
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row);
                        }}
                      >
                        Delete
                      </button>
                    )}
                    {customActions &&
                      customActions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className={action.className || "custom-action-button"}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.handler(row);
                          }}
                        >
                          {action.label}
                        </button>
                      ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actionsEnabled ? 1 : 0)}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  actionsEnabled: PropTypes.bool,
  customActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
      className: PropTypes.string,
    })
  ),
  userRole: PropTypes.string, // Add prop type for userRole
};

ReusableTable.defaultProps = {
  onRowClick: null,
  onEdit: null,
  onDelete: null,
  actionsEnabled: false,
  customActions: [],
  userRole: '', // Default userRole to an empty string
};

export default ReusableTable;
