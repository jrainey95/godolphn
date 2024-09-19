import React from "react";
import { useNavigate } from "react-router-dom";

function Account({ user }) {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Account Page</p>
    </div>
  );
}

export default Account;
