import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Logout() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(); //Get firebase auth instance

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div className="flex items-center justify-center mt-15">
      {/* Animated Card */}
      <div
        className={`bg-white shadow-2xl flex flex-col items-center rounded-lg p-6 min-w-[300px] transition-transform duration-300 ease-out ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <p className="font-semibold text-xl text-gray-800">Are you sure?</p>
        <p className="text-gray-600 text-sm mt-1">Do you really want to logout?</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 w-full mt-6">
          <button className="w-24 bg-red-500 text-white rounded-md py-2 font-medium hover:bg-red-600 active:scale-95 transition cursor-pointer" onClick={handleLogout}>
            Yes
          </button>
          <button className="w-24 bg-gray-300 text-gray-800 rounded-md py-2 font-medium hover:bg-gray-400 active:scale-95 transition cursor-pointer" onClick={()=> navigate(-1)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
