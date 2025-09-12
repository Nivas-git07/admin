import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Users from "./components/Users";
import Login from "./components/Login"; 
import "./App.css";

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // When app loads → check localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // store state
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // clear state
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar active={active} setActive={setActive} onLogout={handleLogout} />
      {active === "Dashboard" && <Dashboard />}
      {active === "Analytics" && <Analytics />}
      {active === "Users" && <Users />}
    </div>
  );
}
