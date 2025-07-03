import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";
import Home from "../Home";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleAdminDashboardClick = () => {
    history.push("/");
  };

  return (
    <nav>
      <div className="header" onClick={handleAdminDashboardClick}>
      <img 
  src="https://img.icons8.com/?size=100&id=52232&format=png"  
  alt="Admin Logo" 
  style={{ 
    height: "35px", 
    width: "auto", 
    marginRight: "8px", 
    filter: "invert(1)" // Turns black to white
  }} 
/>

        <span>ADMIN DASHBOARD</span>
      </div>
      <ul
        className="navbar-links"
        style={{ transform: open ? "translateX(0px)" : "" }}
      >
        <li>
          <NavLink to="/Verification" activeClassName="nav-active">
            Verification
          </NavLink>
        </li>
        <li>
          <NavLink to="/AddCandidate" activeClassName="nav-active">
            Add Candidate
          </NavLink>
        </li>
        <li>
          <NavLink to="/Registration" activeClassName="nav-active">
            <i className="far fa-registered" /> Registration
          </NavLink>
        </li>
        <li>
          <NavLink to="/Voting" activeClassName="nav-active">
            <i className="fas fa-vote-yea" /> Voting
          </NavLink>
        </li>
        <li>
          <NavLink to="/Results" activeClassName="nav-active">
            <i className="fas fa-poll-h" /> Results
          </NavLink>
        </li>
      </ul>
      <i onClick={() => setOpen(!open)} className="fas fa-bars burger-menu"></i>
    </nav>
  );
}