// Navbar.tsx
import React, { useEffect } from "react";
import { useAuth } from "../../Contexts";
import "./Navbar.css"; // Import the CSS file for styling
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., call an API to invalidate the session)
    // Then, remove the user from the context using the logout function
    logout();
  };

  useEffect(() => {
    const init = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/get-user-by-id`;
        const responsePrm = axios.get(apiUrl, { withCredentials: true });
        const resprm = toast.promise(responsePrm, {
          loading: "Fetching user...",
          success: "User Fetched",
          error: "error fetching user",
        });
        const res = await resprm;
        setUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
        });
      } catch (err) {
        navigate("/auth/login");
      }
    };
    init();
  }, []);

  return user ? (
    <nav className="navbar login-title">
      <div>
        Welcome, <span className="login-title-footer">{user.username}</span>
      </div>
      <button className="logout-btn">Add Task</button>
      <button className="logout-btn">Logout</button>
    </nav>
  ) : (
    <div>abc</div>
  );
};

export default Navbar;
