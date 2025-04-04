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
    <AppBar
      position="static"
      className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 shadow-lg rounded-b-xl"
    >
      <Toolbar className="flex justify-between items-center p-4">
        <Typography variant="h6" className="text-white font-semibold text-2xl">
          Message Thread
        </Typography>
        <Box className="flex items-center">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
            className="rounded-full p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;