import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar({ active, setActive }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      name: "John Doe",
      message: "Reported a broken streetlight on Main Street.",
      avatar:
        "https://storage.googleapis.com/a1aa/image/81b4f106-83a9-4d9f-419a-4eaa032bd015.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Reported potholes on 5th Avenue.",
      avatar:
        "https://storage.googleapis.com/a1aa/image/22b1a4fd-85f1-436c-6777-f19fcf2b78f6.jpg",
    },
    {
      id: 3,
      name: "Alex Johnson",
      message: "Reported graffiti on Elm Street wall.",
      avatar:
        "https://storage.googleapis.com/a1aa/image/2e540d55-2ea6-41f8-1509-2125a24bc05d.jpg",
    },
  ];

  return (
    <nav className="navbar">
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
          className="notification-icon relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <i className="fas fa-bell"></i>
          <span className="notification-count">{notifications.length}</span>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div
              className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50"
              role="region"
              aria-label="Notification panel"
              aria-live="polite"
            >
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-900 flex justify-between items-center">
                Notifications
                <button
                  aria-label="Close notifications"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowNotifications(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {notifications.map((note) => (
                  <li
                    key={note.id}
                    className="flex items-start space-x-3 p-4 hover:bg-gray-50"
                  >
                    <img
                      src={note.avatar}
                      alt={`User profile picture of ${note.name}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {note.name}
                      </p>
                      <p className="text-xs text-gray-600">{note.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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
