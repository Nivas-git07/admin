import React, { useState,useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
    const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // ✅ Fetch complaints from backend
     useEffect(() => {
        fetch("http://localhost:5000/api/complaints")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched complaints:", data);
                setComplaints(data);
            })
            .catch((error) => {
                console.error("Error fetching complaints:", error);
            });
    }, []);

  const handleBack = () => setSelectedComplaint(null);

  // if (loading) {
  //   return <p className="p-4 text-gray-600">Loading complaints...</p>;
  // }
   if (selectedComplaint) {
    // ✅ Detailed report view
    return (
      <main className="p-4 max-w-7xl mx-auto space-y-4" id="mainContent">
        <button
          className="mb-4 text-blue-600 hover:underline focus:outline-none"
          type="button"
          onClick={handleBack}
        >
          ← Back to Dashboard
        </button>

        <section className="bg-white border border-gray-200 rounded-md p-6 max-w-full overflow-x-auto flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {selectedComplaint.title}
            </h2>
            <p className="mb-4 text-gray-700">
              {selectedComplaint.description}
            </p>
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <div><strong>Complaint ID:</strong> {selectedComplaint.id}</div>
              <div><strong>Status:</strong> {selectedComplaint.statusLabel}</div>
              <div><strong>Priority:</strong> {selectedComplaint.priority}</div>
              <div><strong>Reported by:</strong> {selectedComplaint.email}</div>
              <div><strong>Category:</strong> {selectedComplaint.categoryLabel}</div>
              <div><strong>Date Reported:</strong> {selectedComplaint.date}</div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-600 text-white text-xs rounded px-3 py-1 hover:bg-blue-700 focus:outline-none"
                type="button"
                onClick={() => alert("Update status clicked!")}
              >
                Update Status
              </button>
              <button
                className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100 focus:outline-none"
                type="button"
                onClick={handleBack}
              >
                Close
              </button>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-80 flex-shrink-0">
            <img
              alt={`Photo related to complaint: ${selectedComplaint.title}`}
              className="rounded border border-gray-300 w-full h-auto object-cover"
              src={
                selectedComplaint.image
                  ? `data:image/jpeg;base64,${selectedComplaint.image}`
                  : "https://placehold.co/300x200?text=No+Image"
              }
            />
          </div>
        </section>
      </main>
    );
  }

  // Default dashboard view
  return (
    <main className="dashboard">
      {/* Cards */}
      {/* your stats grid code here */}
      

      {/* Cards */}
      {/* your stats grid code here */}

      {/* Complaint Reports */}
      <div class="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total report</p>
              <p className="stat-number">100</p>
            </div>
            <svg
              className="stat-icon"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
            </svg>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-content">
            <div>
              <p class="stat-label">Open</p>
              <p class="stat-number open">200</p>
            </div>
            <svg class="stat-icon open" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-content">
            <div>
              <p class="stat-label">In Progress</p>
              <p class="stat-number progress">100</p>
            </div>
            <svg class="stat-icon progress" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-content">
            <div>
              <p class="stat-label">Resolved</p>
              <p class="stat-number resolved">300</p>
            </div>
            <svg class="stat-icon resolved" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>
          </div>
        </div>
      </div>
      

      {/* Complaint Reports */}
      <section className="reports">
        <h3>Complaint Reports ({complaints.length})</h3>
        {complaints.map((c) => (
          <article key={c.id} className="report-item">
            <div className="report-tags">
              <span className="tag-id">{c.id}</span>
              <span className={`tag-status ${c.status}`}>{c.statusLabel}</span>
              <span className="tag-priority">{c.priority}</span>
            </div>
            <h4 className="report-title">{c.title}</h4>
            <p className="report-desc">{c.description}</p>
            <div className="report-meta">
              <div><i className="fas fa-user"></i> {c.email}</div>
              <div><i className="fas fa-tools"></i> {c.categoryLabel}</div>
              <div><i className="fas fa-calendar-alt"></i> {c.date}</div>
            </div>
            <div className="report-actions">
              <button
                className="btn-view"
                onClick={() => setSelectedComplaint(c)}
              >
                View Details
              </button>
              <button className="btn-update">Update Status</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
