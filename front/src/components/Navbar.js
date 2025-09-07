import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar({ active, setActive }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="navbar">
      {/* Left Section */}
      {/* Left Section */}
      <div className="navbar-left">
        <div className="navbar-circle-icon">
          <i className="fas fa-check"></i>
        </div>
        <span className="navbar-title">CiviFix</span>
        <span className="navbar-subtitle">Admin Portal</span>
      </div>

      {/* Navigation Tabs */}
      <ul className="navbar-tabs">
        {["Dashboard", "Analytics", "Users"].map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setActive(tab)}
              className={`navbar-tab ${active === tab ? "active" : ""}`}
            >
              {tab === "Dashboard" && <i className="fas fa-home mr-1"></i>}
              {tab === "Analytics" && <i className="fas fa-chart-bar mr-1"></i>}
              {tab === "Users" && <i className="fas fa-users mr-1"></i>}
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Search */}
        <div className="search-box">
          <input type="search" placeholder="Search complaints..." />
          <i className="fas fa-search search-icon"></i>
        </div>

        {/* Notifications */}
        <div
          className="notification-icon"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <i className="fas fa-bell"></i>
          <span className="notification-count">0</span>
        </div>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              <button onClick={() => setShowNotifications(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="notification-list">
              <li>No notifications yet</li>
            </ul>
          </div>
        )}

        {/* Settings */}
        <button className="settings-btn">
          <i className="fas fa-cog"></i>
        </button>

        {/* Admin User */}
        <div className="admin-user">
          <div className="admin-avatar">A</div>
          <span>Admin User</span>
        </div>
      </div>
    </nav>
  );
}
