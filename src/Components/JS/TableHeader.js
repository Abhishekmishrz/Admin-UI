import React from "react";

const TableHeader = ({ handleCheckboxChange }) => {
  return (
    <tr>
      <th>
        <input type="checkbox" className="checkbox" onChange={ handleCheckboxChange } />
      </th>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
  );
};

export default TableHeader;
