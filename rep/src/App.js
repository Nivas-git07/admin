import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Users from "./components/Users";
import Login from "./components/Login"; // import your login component
import "./App.css";

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track login state

  // Show Login page first
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // After login → show normal dashboard with Navbar
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar active={active} setActive={setActive} />
      {active === "Dashboard" && <Dashboard />}
      {active === "Analytics" && <Analytics />}
      {active === "Users" && <Users />}
    </div>
  );
}

