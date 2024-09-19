import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
