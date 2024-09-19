// src/components/LogoutPage.js
import { useEffect } from "react";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate("/");
      } catch (err) {
        console.log("Error logging out", err);
      }
    };

    performLogout();
  }, [navigate]);

  return <p>Logging out...</p>;
}

export default LogoutPage;
