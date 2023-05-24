import SearchBar from "./SearchBar";
import "../CSS/LandingPage.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Stack from "@mui/material/Stack";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';


import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';


const LandingPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 10;
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
    console.log("selected", selected)
  };


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
  const editDetails = () => { }

  return (
    <>
      <div className="Search">
        <SearchBar />
      </div>

      <div>
        <table className="table">
          <tr>
            <th>
              <input type="checkbox" className="checkbox" />{" "}
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
                list.name.includes(setSearch) ||
                list.email.includes(setSearch) ||
                list.role.includes(setSearch)
              ) {
                return dataList;
              }
            })
            .slice(startIndex, endIndex)
            .map((list) => (
              <tr>
                <td>
                  <input type="checkbox" className="checkbox" />{" "}
                </td>
                <td>{list.id}</td>
                <td>{list.name}</td>
                <td>{list.email}</td>
                <td>{list.role}</td>
                <td>
                  <Button className="edit-btn" onClick={editDetails}><BorderColorOutlinedIcon /></Button>
                  <Button className="delete-btn"><DeleteOutlineIcon /></Button>
                </td>
              </tr>
            ))}

        </table>
      </div>
      <div className="footer">
        <Button className="selected-delete" >Delete Selected</Button>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
          pageCount={Math.ceil(dataList.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}

        />





      </div>





    </>
  );
};
export default LandingPage;
