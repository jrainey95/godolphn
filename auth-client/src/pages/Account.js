// src/pages/Account.js
import { useState, useEffect } from "react";
import { getAccount, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch account details on component mount
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const account = await getAccount();
        setCurrentUsername(account.username); // Adjust based on the response structure
      } catch (err) {
        setError("Failed to load account details.");
      }
    };
    fetchAccount();
  }, []);

 const handleLogout = async () => {
   try {
     const response = await logout(); // Call the logout function
     console.log("Logout success:", response); // Log the response
     navigate("/"); // Redirect to home or login page after logout
   } catch (err) {
     setError("Logout failed. Try again later."); // Handle errors
   }
 };


  return (
    <div>
      <h1>Account</h1>
      <p>Username: {currentUsername}</p>
      <button onClick={handleLogout}>Logout</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AccountPage;
