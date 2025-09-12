import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ active, setActive }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ✅ Fetch notifications from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

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

      {/* Tabs */}
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
        {/* Notifications */}
        <div
          className="notification-icon relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <i className="fas fa-bell"></i>
          <span className="notification-count">{notifications.length}</span>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-900 flex justify-between items-center">
                Notifications
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {notifications.map((note, idx) => {
                  const DEFAULT_AVATAR =
                    "https://i.pinimg.com/474x/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg?nii=t";

                  // ✅ Detect if profile is base64 or URL
                  let imageSrc = DEFAULT_AVATAR;
                  if (note.profile) {
                    if (note.profile.startsWith("http")) {
                      imageSrc = note.profile; // already URL
                    } else {
                      imageSrc = `data:image/jpeg;base64,${note.profile}`;
                    }
                  }

                  return (
                    <li
                      key={idx}
                      className="flex items-start space-x-3 p-4 hover:bg-gray-50"
                    >
                      {/* Profile Image */}
                      <img
                        src={imageSrc}
                        alt="User avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      {/* Notification Info */}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {note.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          {note.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
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
