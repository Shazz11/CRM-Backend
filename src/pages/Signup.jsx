import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography, Divider } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      alert("Signup Successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signup with Google Successful!");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container maxWidth="xs" className="mt-15">
      <Paper elevation={3} className="p-6 rounded-lg shadow-lg">
        <Typography variant="h5" className="text-center font-semibold">
          Create an Account
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <TextField label="Username" name="username" onChange={handleChange} fullWidth required />
          <TextField label="Email" name="email" type="email" onChange={handleChange} fullWidth required />
          <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth required />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button onClick={handleGoogleSignup} variant="outlined" fullWidth startIcon={<FcGoogle />}>
          Sign up with Google
        </Button>

        <Typography variant="body2" className="text-center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
