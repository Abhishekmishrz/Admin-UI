import React from "react";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const TableRow = ({
    item,
    selectedItems,
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
    setEditedRole
}) => {
  return (
    <tr
            key={item.id}
            className={selectedItems.includes(item.id) ? "selected" : ""}
          >
      <td>
        <input
          type="checkbox"
          className="checkbox"
          checked={selectedItems.includes(item.id)}
          onChange={() => handleSingleCheckboxChange(item.id)}
        />
      </td>
      <td>{item.id}</td>
      <td>
        {editedRowId === item.id ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          item.name
        )}
      </td>
      <td>
        {editedRowId === item.id ? (
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        ) : (
          item.email
        )}
      </td>
      <td>
        {editedRowId === item.id ? (
          <input
            type="text"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
        ) : (
          item.role
        )}
      </td>
      <td>
        {editedRowId === item.id ? (
          <>
            <Button onClick={() => handleSaveEdit(item.id)}>Save</Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </>
        ) : (
          <Button className="edit-btn" onClick={() => editDetails(item.id)}>
            <BorderColorOutlinedIcon />
          </Button>
        )}
        <Button
          className="delete-btn"
          onClick={() => handleDeleteRow(item.id)}
        >
          <DeleteOutlineIcon />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
