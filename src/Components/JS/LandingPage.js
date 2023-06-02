import "../CSS/LandingPage.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import SearchBar from './SearchBar';
import Table from './Table';
import Pagination from './Pagination';

const LandingPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editedRowId, setEditedRowId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    performApiCall();
  }, []);

  const performApiCall = async () => {
    const URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

    try {
      const response = await axios.get(URL);
      setDataList(response.data);
    } catch (e) {
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Result not found. Check that the backend is running', { variant: 'success' });
      }
    }
  };
  

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
    setSelectedItems([]);
  };

  const handleSingleCheckboxChange = (itemId) => {
    const updatedSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];
    setSelectedItems(updatedSelectedItems);
  };

  const handleCheckboxChange = (event) => {
    const pageItems = displayedData.map((item) => item.id);
    const checked = event.target.checked;

    if (checked) {
      setSelectedItems(pageItems);
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = dataList.filter((item) => !selectedItems.includes(item.id));
    setDataList(updatedData);
    setSelectedItems([]);
    enqueueSnackbar('Result not found. Check that the backend is running', { variant: 'success' });
  };

  const handleDeleteRow = (id) => {
    const remainingMembers = dataList.filter((member) => member.id !== id);
    setDataList(remainingMembers);
    enqueueSnackbar('Result not found. Check that the backend is running', { variant: 'success' });
  };

  const editDetails = (id) => {
    const member = dataList.find((m) => m.id === id);
    if (member) {
      setEditedRowId(id);
      setEditedName(member.name);
      setEditedEmail(member.email);
      setEditedRole(member.role);
    }
  };

  const handleSaveEdit = (id) => {
    const updatedMembers = dataList.map((member) => {
      if (member.id === id) {
        return {
          ...member,
          name: editedName,
          email: editedEmail,
          role: editedRole,
        };
      }
      return member;
    });
    setDataList(updatedMembers);
    setEditedRowId(null);
    setEditedName('');
    setEditedEmail('');
    setEditedRole('');
  };

  const handleCancelEdit = () => {
    setEditedRowId(null);
    setEditedName('');
    setEditedEmail('');
    setEditedRole('');
  };

  const handleClick = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredData = dataList.filter((list) => {
    if (search === '') return list;
    return (
      list.name.toLowerCase().includes(search) ||
      list.email.toLowerCase().includes(search) ||
      list.role.toLowerCase().includes(search)
    );
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div className="Search">
        <SearchBar handleClick={handleClick} />
      </div>

      <Table
        dataList={displayedData}
        selectedItems={selectedItems}
        editedRowId={editedRowId}
        editedName={editedName}
        editedEmail={editedEmail}
        editedRole={editedRole}
        handleSingleCheckboxChange={handleSingleCheckboxChange}
        handleDeleteRow={handleDeleteRow}
        editDetails={editDetails}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        setEditedName={setEditedName}
        setEditedEmail={setEditedEmail}
        setEditedRole={setEditedRole}
        handleCheckboxChange={handleCheckboxChange}
      />

      <Pagination
        pageNumber={pageNumber}
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        handleDeleteSelected={handleDeleteSelected}
      />
    </>
  );
};

export default LandingPage;
