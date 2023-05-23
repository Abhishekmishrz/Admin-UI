import SearchBar from "./SearchBar";
import "../CSS/LandingPage.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import List from "@mui/material/List";
import ReactPaginate from 'react-paginate';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';


const LandingPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState("");

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
                  <Button className="edit-btn" ><BorderColorOutlinedIcon/></Button>
                  <Button className="delete-btn"><DeleteOutlineIcon/></Button>
                </td>
              </tr>
            ))}
          
        </table>
      </div>
      {/* <div> */}
        
        <Pagination className="pagination" count={dataList.length} color="primary" showFirstButton showLastButton /> 
        <ReactPaginate
        // previousLabel={<FaAngleDoubleLeft />}
        // nextLabel={<FaAngleDoubleRight />}
        breakLabel="..."
        pageCount={dataList.length}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        // onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />

        <Button className="delete-btn" >Delete Selected</Button>

      {/* </div> */}
     
        
        
        
      
    </>
  );
};
export default LandingPage;
