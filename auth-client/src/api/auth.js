import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Ensure this points to your backend server
  withCredentials: true, // Important for handling cookies and sessions
});

// Login user
export const login = async (username, password) => {
  try {
    const response = await API.post("/login", {
      uname: username,
      pw: password,
    });
    return response.data; // Handle success data if needed
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Register new user
export const register = async (username, password) => {
  try {
    const response = await API.post("/register", {
      uname: username,
      pw: password,
    });
    return response.data; // Handle success data if needed
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// Logout user
export const logout = async (username, password) => {
  try {
    const response = await API.get("/account", {
      uname: username,
      pw: password,
      withCredentials: true, 
    });
   

    return response.data; // This should give you the logout message
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed"); // Handle error
  }
};

// Get account details
export const getAccount = async () => {
  try {
    const response = await API.get("/account"); // Ensure this matches your backend API endpoint
    return response.data; // Return the account data
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};
