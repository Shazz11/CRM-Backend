import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // ✅ Import Firebase functions

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(); // ✅ Get Firebase Auth instance

  const handleResetPassword = () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Reset link sent! Check your email.");
        setError(""); // Clear error if successful
      })
      .catch((error) => {
        setError("Error: " + error.message);
        setMessage(""); // Clear message if error
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-green-600 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white py-2 rounded mt-3 hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
