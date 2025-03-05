import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography, Divider } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (error) {
      setError(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login with Google Successful!");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container maxWidth="xs" className="mt-25">
      <Paper elevation={3} className="p-5 rounded-lg shadow-lg">
        <Typography variant="h5" className="text-center font-semibold">
          Login to Your Account
        </Typography>

        {error && <Typography color="error">Incorrect Email or Password </Typography>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <TextField label="Email" name="email" type="email" onChange={handleChange} fullWidth required />
          <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth required />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button onClick={handleGoogleLogin} variant="outlined" fullWidth startIcon={<FcGoogle />}>
          Login with Google
        </Button>

        <Typography variant="body2" className="text-center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <NavLink to='/signup' className="text-blue-600 hover:underline">Signup</NavLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
