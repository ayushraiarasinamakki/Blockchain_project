import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="header" onClick={() => setOpen(false)}>
      <img 
  src="https://voters.eci.gov.in/static/media/Portallogo.239672214918b407e9c7d3e4312b8ac4.svg" 
  alt="E-Voting Logo"
/>
    
<span style={{ marginLeft: "10px" }}>E-Voting</span>




























      </div>

      <ul className={`navbar-links ${open ? "active" : ""}`}>
        <li>
          <NavLink to="/Registration" className={({ isActive }) => isActive ? "nav-active" : ""}>
            <i className="fas fa-user-plus" /> Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/Voting" className={({ isActive }) => isActive ? "nav-active" : ""}>
            <i className="fas fa-check-circle" /> Vote
          </NavLink>
        </li>
        <li>
          <NavLink to="/Results" className={({ isActive }) => isActive ? "nav-active" : ""}>
            <i className="fas fa-chart-line" /> Results
          </NavLink>
        </li>
      </ul>

      <div className="burger-menu" onClick={() => setOpen(!open)}>
        <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
      </div>
    </nav>
  );
}
