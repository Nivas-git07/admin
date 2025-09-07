import React from "react";
import complaints from "../data/complaints";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard">
      {/* Cards */}
      <section className="dashboard-cards">
        <div className="card total">
          <p>Total Complaints</p>
          <p>{complaints.length}</p>
          <p>All time reports</p>
        </div>
        <div className="card open">
          <p>Open</p>
          <p>{complaints.filter((c) => c.status === "open").length}</p>
          <p>Needs attention</p>
        </div>
        <div className="card progress">
          <p>In Progress</p>
          <p>{complaints.filter((c) => c.status === "inprogress").length}</p>
          <p>Being processed</p>
        </div>
        <div className="card resolved">
          <p>Resolved</p>
          <p>{complaints.filter((c) => c.status === "resolved").length}</p>
          <p>Successfully closed</p>
        </div>
      </section>

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
              <div><i className="fas fa-user"></i>{c.email}</div>
              <div><i className="fas fa-tools"></i>{c.categoryLabel}</div>
              <div><i className="fas fa-calendar-alt"></i>{c.date}</div>
            </div>
            <div className="report-actions">
              <button className="btn-view">View Details</button>
              <button className="btn-update">Update Status</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
