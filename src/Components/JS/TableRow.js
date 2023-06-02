import React from 'react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Fragment from 'react-dot-fragment';

const TableRow = ({
  member,
  isSelected,
  handleSingleCheckboxChange,
  handleDeleteRow,
  editDetails,
  editedRowId,
  editedName,
  editedEmail,
  editedRole,
  handleSaveEdit,
  handleCancelEdit,
  setEditedName,
  setEditedEmail,
  setEditedRole,
}) => {
  return (
    <tr className={isSelected ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          className="checkbox"
          checked={isSelected}
          onChange={() => handleSingleCheckboxChange(member.id)}
        />
      </td>
      <td>{member.id}</td>
      <td>
        {editedRowId === member.id ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          member.name
        )}
      </td>
      <td>
        {editedRowId === member.id ? (
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        ) : (
          member.email
        )}
      </td>
      <td>
        {editedRowId === member.id ? (
          <input
            type="text"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
        ) : (
          member.role
        )}
      </td>
      <td>
        {editedRowId === member.id ? (
          <Fragment>
            <Button onClick={() => handleSaveEdit(member.id)}>Save</Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </Fragment>
        ) : (
          <Button className="edit-btn" onClick={() => editDetails(member.id)}>
            <BorderColorOutlinedIcon />
          </Button>
        )}
        <Button className="delete-btn" onClick={() => handleDeleteRow(member.id)}>
          <DeleteOutlineIcon />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
