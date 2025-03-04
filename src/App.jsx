import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import DashboardLayoutBasic from "./pages/Home";
import Billing from "./pages/Billing";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import InvoiceDetails from "./pages/InvoiceDetails";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes (Agar login hai toh redirect to dashboard) */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes (Agar login nahi hai toh login pe redirect) */}
        {user ? (
          <Route path="/" element={<DashboardLayoutBasic />}>
            <Route path="billing" element={<Billing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoice" element={<InvoiceDetails />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>

      {/* Logout Button */}
      {/* {user && (
        <button
          onClick={() => signOut(auth)}
          className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )} */}
    </Router>
  );
}

export default App;
