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
    await logout(); // Call the logout function
    console.log("Logout success");
    navigate("/"); // Ensure this points to the correct home route
  } catch (err) {
    setError("Logout failed. Try again later.");
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
