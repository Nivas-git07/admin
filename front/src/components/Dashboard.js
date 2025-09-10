import React, { useState } from "react";
import complaints from "../data/complaints";
import "./Dashboard.css";

export default function Dashboard() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Handle going back
  const handleBack = () => setSelectedComplaint(null);

  if (selectedComplaint) {
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
            <p className="mb-4 text-gray-700">{selectedComplaint.description}</p>
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <div>
                <strong>Complaint ID:</strong> {selectedComplaint.id}
              </div>
              <div>
                <strong>Status:</strong> {selectedComplaint.statusLabel}
              </div>
              <div>
                <strong>Priority:</strong> {selectedComplaint.priority}
              </div>
              <div>
                <strong>Reported by:</strong> {selectedComplaint.email}
              </div>
              <div>
                <strong>Category:</strong> {selectedComplaint.categoryLabel}
              </div>
              <div>
                <strong>Date Reported:</strong> {selectedComplaint.date}
              </div>
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
              src="https://placehold.co/300x200?text=Complaint+Photo&bg=gray&fg=white"
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
              <div>
                <i className="fas fa-user"></i> {c.email}
              </div>
              <div>
                <i className="fas fa-tools"></i> {c.categoryLabel}
              </div>
              <div>
                <i className="fas fa-calendar-alt"></i> {c.date}
              </div>
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
