// Table.js
import React from 'react';
import TableRow from './TableRow';

const Table = ({
  dataList,
  selectedItems,
  editedRowId,
  editedName,
  editedEmail,
  editedRole,
  handleSingleCheckboxChange,
  handleDeleteRow,
  editDetails,
  handleSaveEdit,
  handleCancelEdit,
  setEditedName,
  setEditedEmail,
  setEditedRole,
  handleCheckboxChange,
}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox"
                checked={dataList.length > 0 && selectedItems.length === dataList.length}
                onChange={handleCheckboxChange}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((list) => (
            <TableRow
              key={list.id}
              member={list}
              isSelected={selectedItems.includes(list.id)}
              handleSingleCheckboxChange={handleSingleCheckboxChange}
              handleDeleteRow={handleDeleteRow}
              editDetails={editDetails}
              editedRowId={editedRowId}
              editedName={editedName}
              editedEmail={editedEmail}
              editedRole={editedRole}
              handleSaveEdit={handleSaveEdit}
              handleCancelEdit={handleCancelEdit}
              setEditedName={setEditedName}
              setEditedEmail={setEditedEmail}
              setEditedRole={setEditedRole}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
