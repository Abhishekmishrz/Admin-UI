import SearchBar from "./SearchBar";
import "../CSS/LandingPage.css";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import Fragment from 'react-dot-fragment';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import axios from "axios";

import Button from '@mui/material/Button';

const LandingPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);const [editedRowId, setEditedRowId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');
  


  const PerformApiCall = async () => {
    const URL =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    try {
      let response = await axios.get(URL);
      console.log("data", response.data);
      setDataList(response.data);
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });

        return null;
      } else {
        enqueueSnackbar("Result not found. Check that the backend is running", {
          variant: "error",
        });
      }
    }
  };
  useEffect(() => {
    PerformApiCall();
  }, [1]);

  const itemsPerPage = 10;
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCount= Math.ceil(dataList.length / itemsPerPage);
  const displayedData = dataList.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
    setSelectedItems([]);
    console.log("selected", selected)


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
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        ...pageItems.filter((itemId) => !prevSelectedItems.includes(itemId)),
      ]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((itemId) => !pageItems.includes(itemId))
      );
    }
  };
  
  const handleDeleteSelected = () => {
    // Delete the selected items from the data source
    const updatedData = dataList.filter((item) => !selectedItems.includes(item.id));
    setDataList(updatedData);
    setSelectedItems([]);
  };

  const handleDeleteRow = (id) => {
    const remainingMembers = dataList.filter((member) => member.id !== id);
    setDataList(remainingMembers);
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

    console.log("target",e.target.value);
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="Search">
        <SearchBar  handleClick={handleClick} />
      </div>

      <div>
        <table className="table">
          <tr>
            <th>
              <input type="checkbox" className="checkbox" 
              checked={displayedData.length > 0 && selectedItems.length === displayedData.length}
              onChange={handleCheckboxChange}
              />{" "}
            </th>
            <th>ID</th>
            <th>Name </th>
            <th>Email </th>
            <th> Role</th>
            <th>Action</th>
          </tr>


          {dataList
            .filter((list) => {
              if (search === "") return list;
              else if (
                list.name.toLowerCase().includes(search) ||
                list.email.toLowerCase().includes(search) ||
                list.role.toLowerCase().includes(search)
              ) {
                return dataList;
              }
            })
            .slice(startIndex, endIndex)
            .map((list) => (
              <tr>
                <td>
                  <input type="checkbox" className= "checkbox"
                  checked={selectedItems.includes(list.id)}
                  onChange={() => handleSingleCheckboxChange(list.id)}
                  />{" "}
                </td>
                <td>{list.id}</td>
                <td>
                {editedRowId === list.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  list.name
                )}
                  
                  </td>
                <td>
                {editedRowId === list.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  list.email
                )}
                </td>
                <td>
                {editedRowId === list.id ? (
                  <input
                    type="text"
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                  />
                ) : (
                  list.role
                )}
                </td>
                <td>
                {editedRowId === list.id ? (
                  <Fragment>
                    <Button onClick={() => handleSaveEdit(list.id)}>Save</Button>
                    <Button onClick={() => handleCancelEdit()}>Cancel</Button>
                  </Fragment>
                ) : (
                  <Button className="edit-btn" onClick={() => editDetails(list.id)}><BorderColorOutlinedIcon /></Button>
                )}
                <Button className="delete-btn"  onClick={() => handleDeleteRow(list.id)}  ><DeleteOutlineIcon /></Button>
              </td>
              </tr>
            ))}

        </table>
      </div>
      <div className="footer">
        <Button className="selected-delete"  onClick={handleDeleteSelected}> Delete Selected </Button>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}

        />
      </div>

    </>
  );
};
export default LandingPage;
