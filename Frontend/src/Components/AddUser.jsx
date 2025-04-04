import { useState } from "react";
import axios from "../axios";
import { TextField, Button, Snackbar, Alert } from "@mui/material";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!username || !email) {
      setSnackbarMessage("Both username and email are required.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Send POST request to the backend to create a user
    try {
      const response = await axios.post("/users", {
        username,
        email,
      });

      // If successful
      setSnackbarMessage("User created successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      
      // Reset the form
      setUsername("");
      setEmail("");
    } catch (error) {
      // If there's an error
      setSnackbarMessage("Error creating user. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create a User</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mt-4"
        >
          Create User
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddUser;