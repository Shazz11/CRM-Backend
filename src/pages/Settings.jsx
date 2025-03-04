import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography, IconButton, InputAdornment, Snackbar, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const API_URL = "http://localhost:3000/api/settings";

function Settings() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState({ old: false, new: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch user data on load
  useEffect(() => {
    axios.get(`${API_URL}/getUser`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  // Handle input changes
  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Update user profile
  const handleUpdateUser = () => {
    if (!user.name || !user.email) {
      setMessage({ type: "error", text: "Name and email are required" });
      return;
    }
    setLoading(true);
    axios.put(`${API_URL}/updateUser`, user)
      .then(() => setMessage({ type: "success", text: "Profile updated successfully" }))
      .catch(() => setMessage({ type: "error", text: "Failed to update profile" }))
      .finally(() => setLoading(false));
      setUser({ oldPassword: "", newPassword: "" })
  };

  // Change Password with validation
  const handleChangePassword = () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      setMessage({ type: "error", text: "Both passwords are required" });
      return;
    }
    setLoading(true);
    axios.post(`${API_URL}/changePassword`, passwords)
      .then(() => setMessage({ type: "success", text: "Password changed successfully" }))
      .catch(() => setMessage({ type: "error", text: "Incorrect old password or error updating password" }))
      .finally(() => setLoading(false));
      setPasswords({ old: '', new: '' })
  };

  return (
    <div className="p-6">
      <Snackbar open={!!message.text} autoHideDuration={3000} onClose={() => setMessage({ type: "", text: "" })}>
        <Alert severity={message.type}>{message.text}</Alert>
      </Snackbar>

      {/* User Profile */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h6">User Profile</Typography>
          <TextField label="User Name" name="name" value={user.name} onChange={handleUserChange} fullWidth margin="normal" />
          <TextField label="Email" name="email" value={user.email} onChange={handleUserChange} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleUpdateUser} disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardContent>
          <Typography variant="h6">Change Password</Typography>
          <TextField
            label="Old Password"
            type={showPassword.old ? "text" : "password"}
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility("old")}>
                    {showPassword.old ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="New Password"
            type={showPassword.new ? "text" : "password"}
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility("new")}>
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handleChangePassword} disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;
