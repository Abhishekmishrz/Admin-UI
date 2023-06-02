
import React from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

const Table = ({
  dataList,
  displayedData,
  selectedItems,
  handleCheckboxChange,
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
    <table className="table">
      <thead>
      <TableHeader handleCheckboxChange= { handleCheckboxChange }/>
      </thead>
      <tbody>
        {displayedData.map((item) => (
          <TableRow
            key={item.id}
            item={item}
            selectedItems={selectedItems}
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
  );
};

export default Table;
