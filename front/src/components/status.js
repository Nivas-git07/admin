// src/components/status.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const { complaint } = location.state || {}; // get complaint from navigation

  const [status, setStatus] = useState(complaint?.status || "Open");
  const [notes, setNotes] = useState("");

  if (!complaint) return <p>No complaint selected.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      complaint_id: complaint.complaint_id,
      status,
      notes,
    };

    fetch(`http://localhost:5000/api/complaints/${complaint.complaint_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update response:", data);
        navigate(-1); // back to dashboard after update
      })
      .catch((err) => console.error("Error updating complaint:", err));
  };

  return (
    <section className="bg-white border border-gray-200 rounded-md p-6 max-w-3xl mx-auto">
      <button
        className="mb-4 text-blue-600 hover:underline text-sm"
        type="button"
        onClick={() => navigate(-1)}
      >
        ← Back to Dashboard
      </button>

      <h2 className="font-semibold text-gray-900 text-lg mb-4">
        Update Status for {complaint.complaint_id}
      </h2>
      <p className="mb-2 font-semibold text-gray-900">{complaint.title}</p>
      <p className="mb-4 text-xs text-gray-500">{complaint.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full rounded-md border py-1.5 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block w-full rounded-md border py-1.5 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Add notes about this update..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Save Update
          </button>
        </div>
      </form>
    </section>
  );
}
