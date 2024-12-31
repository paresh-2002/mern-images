import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";
import "./Navbar.css";

function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  // State for the mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open or close
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="navbar">
      <button
        className={`hamburger-menu ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle Navigation Menu"
      >
        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>

      <div className={`links ${menuOpen ? "open" : ""}`}>
        {/* If the user is NOT logged in */}
        <div className="falseVal">
          {loggedIn === false && (
            <>
              <Link
                to="register"
                style={{
                  backgroundColor: "#7474b3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 20px",
                  textAlign: "center",
                }}
              >
                Register
              </Link>
              <Link
                to="login"
                className="logout"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 20px",
                  textAlign: "center",
                }}
              >
                Log in
              </Link>
            </>
          )}
        </div>

        {/* If the user IS logged in */}
        <div className="trueVal">
          {loggedIn === true && (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/customer" className="nav-link">
                Customers
              </Link>
              <LogOutBtn />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
