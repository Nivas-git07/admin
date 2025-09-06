// src/App.jsx
import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const complaints = [
  {
    id: "CIV-2024-001",
    status: "open",
    statusLabel: "Open",
    priority: "Medium Priority",
    title: "Broken streetlight on Main Street",
    description: "The streetlight at the intersection of Main St and Oak Ave has been out for 3 days.",
    email: "john.doe@gmail.com",
    categoryLabel: "Infrastructure",
    date: "2024-01-15",
  },
  {
    id: "CIV-2024-002",
    status: "inprogress",
    statusLabel: "In Progress",
    priority: "High Priority",
    title: "Broken streetlight on Main Street",
    description: "The streetlight at the intersection of Main St and Oak Ave has been out for 3 days.",
    email: "john.doe@gmail.com",
    categoryLabel: "Infrastructure",
    date: "2024-01-15",
  },
  {
    id: "CIV-2024-003",
    status: "open",
    statusLabel: "Open",
    priority: "Medium Priority",
    title: "Broken streetlight on Main Street",
    description: "The streetlight at the intersection of Main St and Oak Ave has been out for 3 days.",
    email: "john.doe@gmail.com",
    categoryLabel: "Infrastructure",
    date: "2024-01-15",
  },
  {
    id: "CIV-2024-004",
    status: "inprogress",
    statusLabel: "In Progress",
    priority: "High Priority",
    title: "Broken streetlight on Main Street",
    description: "The streetlight at the intersection of Main St and Oak Ave has been out for 3 days.",
    email: "john.doe@gmail.com",
    categoryLabel: "Infrastructure",
    date: "2024-01-15",
  },
  {
    id: "CIV-2024-005",
    status: "open",
    statusLabel: "Open",
    priority: "Medium Priority",
    title: "Broken streetlight on Main Street",
    description: "The streetlight at the intersection of Main St and Oak Ave has been out for 3 days.",
    email: "john.doe@gmail.com",
    categoryLabel: "Infrastructure",
    date: "2024-01-15",
  },
];

// Navbar
function Navbar({ active, setActive }) {
  return (
    <nav className="flex items-center justify-between px-6 h-14 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-500 text-white">
          <i className="fas fa-file-alt text-sm"></i>
        </div>
        <span className="font-extrabold text-lg text-gray-900">CiviFix</span>
        <span className="text-gray-400 text-sm">Admin Portal</span>
      </div>
      <ul className="hidden sm:flex items-center space-x-6 text-gray-600 text-sm font-medium">
        {["Dashboard", "Analytics", "Users"].map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setActive(tab)}
              className={`flex items-center ${active === tab ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
            >
              {tab === "Dashboard" && <i className="fas fa-home mr-1"></i>}
              {tab === "Analytics" && <i className="fas fa-chart-bar mr-1"></i>}
              {tab === "Users" && <i className="fas fa-users mr-1"></i>}
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search complaints..."
            className="w-64 rounded border border-gray-300 text-sm py-1.5 pl-3 pr-9 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <i className="fas fa-search absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <div className="relative cursor-pointer">
          <i className="fas fa-bell text-gray-600 text-lg"></i>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          <i className="fas fa-cog text-lg"></i>
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">A</div>
          <span className="text-gray-700 font-medium text-sm">Admin User</span>
        </div>
      </div>
    </nav>
  );
}

// Dashboard
function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto w-full px-6 mt-6">
      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 text-white rounded-lg p-5 shadow-sm">
          <p className="text-xs font-semibold">Total Complaints</p>
          <p className="text-3xl font-extrabold mt-1">{complaints.length}</p>
          <p className="text-xs mt-1">All time reports</p>
        </div>
        <div className="bg-red-600 text-white rounded-lg p-5 shadow-sm">
          <p className="text-xs font-semibold">Open</p>
          <p className="text-3xl font-extrabold mt-1">{complaints.filter((c) => c.status === "open").length}</p>
          <p className="text-xs mt-1">Needs attention</p>
        </div>
        <div className="bg-orange-600 text-white rounded-lg p-5 shadow-sm">
          <p className="text-xs font-semibold">In Progress</p>
          <p className="text-3xl font-extrabold mt-1">{complaints.filter((c) => c.status === "inprogress").length}</p>
          <p className="text-xs mt-1">Being processed</p>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-5 shadow-sm">
          <p className="text-xs font-semibold">Resolved</p>
          <p className="text-3xl font-extrabold mt-1">{complaints.filter((c) => c.status === "resolved").length}</p>
          <p className="text-xs mt-1">Successfully closed</p>
        </div>
      </section>

      {/* Complaint Reports */}
      <section className="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Complaint Reports ({complaints.length})</h3>
        {complaints.map((c) => (
          <article key={c.id} className="border-b border-gray-200 pb-4 mb-4 last:border-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{c.id}</span>
              <span
                className={`text-xs font-semibold rounded-full px-2 py-0.5 text-white ${
                  c.status === "open" ? "bg-red-600" : c.status === "inprogress" ? "bg-indigo-700" : "bg-green-600"
                }`}
              >
                {c.statusLabel}
              </span>
              <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">{c.priority}</span>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h4>
            <p className="text-xs text-gray-600 mb-2">{c.description}</p>
            <div className="flex flex-wrap items-center text-gray-500 text-xs space-x-4">
              <div className="flex items-center space-x-1">
                <i className="fas fa-user"></i>
                <span>{c.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="fas fa-tools"></i>
                <span>{c.categoryLabel}</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="fas fa-calendar-alt"></i>
                <span>{c.date}</span>
              </div>
            </div>
            <div className="mt-3 flex space-x-2 justify-end">
              <button className="text-xs text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">View Details</button>
              <button className="text-xs text-white bg-blue-600 rounded px-3 py-1 hover:bg-blue-700">Update Status</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

// Analytics
function Analytics() {
  const statusCounts = {
    Open: complaints.filter((c) => c.status === "open").length,
    "In Progress": complaints.filter((c) => c.status === "inprogress").length,
    Resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#DC2626", "#4338CA", "#16A34A"],
      },
    ],
  };

  return (
    <main className="max-w-7xl mx-auto w-full px-6 mt-6">
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Complaints by Status</h3>
            <Pie data={pieData} />
          </div>
          <div>
            <h3 className="font-semibold mb-4">Complaints by Month</h3>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: [
                  {
                    label: "Complaints",
                    data: [2, 4, 1, 3],
                    borderColor: "#2563EB",
                    backgroundColor: "rgba(37, 99, 235, 0.3)",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// Users
function Users() {
  return (
    <main className="max-w-7xl mx-auto w-full px-6 mt-6">
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Users</h2>
        <p className="text-gray-600">User management page content goes here.</p>
      </section>
    </main>
  );
}

// Main App
export default function App() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar active={active} setActive={setActive} />
      {active === "Dashboard" && <Dashboard />}
      {active === "Analytics" && <Analytics />}
      {active === "Users" && <Users />}
    </div>
  );
}
