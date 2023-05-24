import { Button, InputAdornment, TextField, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import "../CSS/SearchBar.css"
const SearchBar = ({ handleClick }) => {
  
  return (
    <>
      <div>
        <TextField
          className="search-desktop"
          size="small"
          fullWidth
          placeholder="Search by name,email or role"
          name="search"
          InputProps={{
            className: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search className="search-icon" color="primary" />
              </InputAdornment>
            )
          }}
          onChange={(e)=>handleClick(e)}
        />
      </div>
    </>
  );
};
export default SearchBar;
