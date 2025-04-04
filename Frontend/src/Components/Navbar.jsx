import { AppBar, Toolbar, Typography, TextField, Box } from "@mui/material";
import { useState } from "react";
import axios from "../axios";

const Navbar = ({ onSearchResults }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim()) {
      const res = await axios.get(`/users/search?query=${query}`);
      onSearchResults(res.data);
    } else {
      onSearchResults([]);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Typography variant="h6">Message Thread</Typography>
        <Box>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;