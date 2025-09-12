// // import React, { useState, useEffect } from "react";
import "./Dashboard.css";

// // export default function Dashboard() {
// //   const [complaints, setComplaints] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedComplaint, setSelectedComplaint] = useState(null);

// //   // ✅ Extra states for Accept/Decline
// //   const [showReasonBox, setShowReasonBox] = useState(false);
// //   const [actionType, setActionType] = useState("");
// //   const [reason, setReason] = useState("");
// //   const updateStatus = async (complaintId, newStatus) => {
// //   try {
// //     const res = await fetch(`http://localhost:5000/${complaintId}/status`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ status: newStatus }),
// //     });

// //     const data = await res.json();
// //     if (!res.ok) {
// //       alert(data.error || "Failed to update status");
// //       return;
// //     }

// //     // ✅ Update UI immediately
// //     setComplaints((prev) =>
// //       prev.map((c) =>
// //         c.complaint_id === complaintId ? { ...c, status: newStatus } : c
// //       )
// //     );

// //     // ✅ Also update selectedComplaint if open
// //     if (selectedComplaint?.complaint_id === complaintId) {
// //       setSelectedComplaint((prev) => ({ ...prev, status: newStatus }));
// //     }

// //     alert(`Complaint ${complaintId} updated to ${newStatus}`);
// //   } catch (error) {
// //     console.error("❌ Error updating complaint:", error);
// //     alert("Error updating complaint");
// //   }
// // };

// //   // ✅ Fetch complaints from backend
// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/complaints")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         console.log("Fetched complaints:", data);
// //         setComplaints(data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching complaints:", error);
// //       });
// //   }, []);

// //   const handleBack = () => {
// //     setSelectedComplaint(null);
// //     setShowReasonBox(false);
// //     setReason("");
// //   };

// //   const handleAction = (type) => {
// //     setActionType(type);
// //     setShowReasonBox(true);
// //   };

// //   const submitReason = () => {
// //     if (!reason.trim()) {
// //       alert("Please provide a reason.");
// //       return;
// //     }
// //     alert(
// //       `${actionType.toUpperCase()} Complaint ${selectedComplaint.complaint_id} with reason: ${reason}`
// //     );
// //     // 👉 TODO: send to backend via fetch/axios
// //     setShowReasonBox(false);
// //     setReason("");
// //   };

// //   if (selectedComplaint) {
// //     // ✅ Detailed report view
// //     return (
// //       <main className="p-4 max-w-7xl mx-auto space-y-4" id="mainContent">
// //         <button
// //           className="mb-4 text-blue-600 hover:underline focus:outline-none"
// //           type="button"
// //           onClick={handleBack}
// //         >
// //           ← Back to Dashboard
// //         </button>

// //         <section className="bg-white border border-gray-200 rounded-md p-6 max-w-full overflow-x-auto flex flex-col md:flex-row md:space-x-6">
// //           <div className="flex-1">
// //             <h2 className="text-xl font-semibold mb-4 text-gray-900">
// //               {selectedComplaint.title}
// //             </h2>
// //             <p className="mb-4 text-gray-700">
// //               {selectedComplaint.description}
// //             </p>
// //             <div className="mb-4 space-y-2 text-sm text-gray-600">
// //               <div>
// //                 <strong>Complaint ID:</strong> {selectedComplaint.complaint_id}
// //               </div>
// //               <div>
// //                 <strong>Status:</strong> {selectedComplaint.status}
// //               </div>
// //               <div>
// //                 <strong>Priority:</strong> {selectedComplaint.priority}
// //               </div>
// //               <div>
// //                 <strong>Reported by:</strong> {selectedComplaint.email}
// //               </div>
// //               <div>
// //                 <strong>Category:</strong> {selectedComplaint.title}
// //               </div>
// //               <div>
// //                 <strong>Date Reported:</strong> {selectedComplaint.date}
// //               </div>
// //             </div>

// //             {/* Buttons */}
// //             <div className="flex justify-end space-x-2">
// //               <button
// //                 className="bg-green-600 text-white text-xs rounded px-3 py-1 hover:bg-green-700 focus:outline-none"
// //                 type="button"
// //                 onClick={() => updateStatus(selectedComplaint.complaint_id, "In Progress")}
// // >

// //                 Accept
// //               </button>
// //               <button
// //                 className="bg-red-600 text-white text-xs rounded px-3 py-1 hover:bg-red-700 focus:outline-none"
// //                 type="button"
// //                 onClick={() => handleAction("decline")}
// //               >
// //                 Decline
// //               </button>
// //               <button
// //                 className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100 focus:outline-none"
// //                 type="button"
// //                 onClick={handleBack}
// //               >
// //                 Close
// //               </button>
// //             </div>

// //             {/* Reason Box */}
// //             {showReasonBox && (
// //               <div className="mt-4">
// //                 <label className="block text-sm text-gray-700 mb-2">
// //                   Reason for {actionType}:
// //                 </label>
// //                 <textarea
// //                   value={reason}
// //                   onChange={(e) => setReason(e.target.value)}
// //                   className="w-full border border-gray-300 rounded p-2 text-sm"
// //                   rows="3"
// //                 />
// //                 <div className="flex justify-end space-x-2 mt-2">
// //                   <button
// //                     className="bg-blue-600 text-white text-xs rounded px-3 py-1 hover:bg-blue-700 focus:outline-none"
// //                     onClick={submitReason}
// //                   >
// //                     Submit
// //                   </button>
// //                   <button
// //                     className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100 focus:outline-none"
// //                     onClick={() => setShowReasonBox(false)}
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="mt-6 md:mt-0 md:w-80 flex-shrink-0">
// //             <img
// //               alt={`Photo related to complaint: ${selectedComplaint.title}`}
// //               className="rounded border border-gray-300 w-full h-auto object-cover"
// //               src={
// //                 selectedComplaint.image
// //                   ? `data:image/jpeg;base64,${selectedComplaint.image}`
// //                   : "https://placehold.co/300x200?text=No+Image"
// //               }
// //             />
// //           </div>
// //         </section>
// //       </main>
// //     );
// //   }

// //   // Default dashboard view
// //   return (
// //     <main className="dashboard">
// //       {/* Stats cards */}
// //         <div class="stats-grid">
// //         {" "}
// //         <div className="stat-card">
// //           {" "}
// //           <div className="stat-content">
// //             {" "}
// //             <div>
// //               {" "}
// //               <p className="stat-label">Total report</p>{" "}
// //               <p className="stat-number">100</p>{" "}
// //             </div>{" "}
// //             <svg
// //               className="stat-icon"
// //               width="32"
// //               height="32"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //             >
// //               {" "}
// //               <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>{" "}
// //             </svg>{" "}
// //           </div>{" "}
// //         </div>{" "}
// //         <div class="stat-card">
// //           {" "}
// //           <div class="stat-content">
// //             {" "}
// //             <div>
// //               {" "}
// //               <p class="stat-label">Open</p> <p class="stat-number open">200</p>{" "}
// //             </div>{" "}
// //             <svg
// //               class="stat-icon open"
// //               width="32"
// //               height="32"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               stroke-width="2"
// //             >
// //               {" "}
// //               <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>{" "}
// //               <line x1="12" y1="9" x2="12" y2="13"></line>{" "}
// //               <line x1="12" y1="17" x2="12.01" y2="17"></line>{" "}
// //             </svg>{" "}
// //           </div>{" "}
// //         </div>{" "}
// //         <div class="stat-card">
// //           {" "}
// //           <div class="stat-content">
// //             {" "}
// //             <div>
// //               {" "}
// //               <p class="stat-label">In Progress</p>{" "}
// //               <p class="stat-number progress">100</p>{" "}
// //             </div>{" "}
// //             <svg
// //               class="stat-icon progress"
// //               width="32"
// //               height="32"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               stroke-width="2"
// //             >
// //               {" "}
// //               <circle cx="12" cy="12" r="10"></circle>{" "}
// //               <polyline points="12,6 12,12 16,14"></polyline>{" "}
// //             </svg>{" "}
// //           </div>{" "}
// //         </div>{" "}
// //         <div class="stat-card">
// //           {" "}
// //           <div class="stat-content">
// //             {" "}
// //             <div>
// //               {" "}
// //               <p class="stat-label">Resolved</p>{" "}
// //               <p class="stat-number resolved">300</p>{" "}
// //             </div>{" "}
// //             <svg
// //               class="stat-icon resolved"
// //               width="32"
// //               height="32"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               stroke-width="2"
// //             >
// //               {" "}
// //               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>{" "}
// //               <polyline points="22,4 12,14.01 9,11.01"></polyline>{" "}
// //             </svg>{" "}
// //           </div>{" "}
// //         </div>{" "}
// //       </div>

// //       {/* Complaint Reports */}
// //       <section className="reports">
// //         <h3>Complaint Reports ({complaints.length})</h3>
// //         {complaints.map((c) => (
// //           <article key={c.id} className="report-item">
// //             <div className="report-tags">
// //               <span className="tag-id">{c.complaint_id}</span>
// //               <span style={{ color: "red" }}>{c.status}</span>
// //             </div>
// //             <h4 className="report-title">{c.title}</h4>
// //             <p className="report-desc">{c.description}</p>
// //             <div className="report-meta">
// //               <div>
// //                 <i className="fas fa-user"></i> {c.email}
// //               </div>
// //               <div>
// //                 <i className="fas fa-tools"></i> {c.categoryLabel}
// //               </div>
// //               <div>
// //                 <i className="fas fa-calendar-alt"></i> {c.date}
// //               </div>
// //             </div>
// //             <div className="report-actions">
// //               <button
// //                 className="btn-view"
// //                 onClick={() => setSelectedComplaint(c)}
// //               >
// //                 View Details
// //               </button>
// //               <button className="btn-update">Update Status</button>
// //             </div>
// //           </article>
// //         ))}
// //       </section>
// //     </main>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const [complaints, setComplaints] = useState([]);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);

//   // Accept/Decline reason popup
//   const [showReasonBox, setShowReasonBox] = useState(false);
//   const [actionType, setActionType] = useState("");
//   const [reason, setReason] = useState("");

//   // Update status form
//   const [status, setStatus] = useState("Open");
//   const [notes, setNotes] = useState("");

//   // Fetch complaints from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/complaints")
//       .then((res) => res.json())
//       .then((data) => setComplaints(data))
//       .catch((err) => console.error("Error fetching complaints:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   // Accept/Decline reason handler
//   const handleAction = (type) => {
//     setActionType(type);
//     setShowReasonBox(true);
//   };

//   const submitReason = () => {
//     if (!reason.trim()) {
//       alert("Please provide a reason.");
//       return;
//     }
//     alert(
//       `${actionType.toUpperCase()} complaint ${
//         selectedComplaint.complaint_id
//       } with reason: ${reason}`
//     );
//     // TODO: send to backend
//     setShowReasonBox(false);
//     setReason("");
//   };

//   // Update complaint status
//   const updateStatus = async (complaintId, newStatus) => {
//     try {
//       const res = await fetch(`http://localhost:5000/${complaintId}/status`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus, notes }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.error || "Failed to update status");
//         return;
//       }
//       // Update UI
//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.complaint_id === complaintId ? { ...c, status: newStatus } : c
//         )
//       );
//       setSelectedComplaint((prev) => ({ ...prev, status: newStatus }));
//       alert("Status updated successfully!");
//       setNotes("");
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert("Error updating status");
//     }
//   };

//   const handleBack = () => {
//     setSelectedComplaint(null);
//     setShowReasonBox(false);
//     setReason("");
//     setStatus("Open");
//     setNotes("");
//   };
//   if (selectedComplaint) {
//     return (
//       <main className="p-4 max-w-7xl mx-auto space-y-4" id="mainContent">
//         <button
//           className="mb-4 text-blue-600 hover:underline focus:outline-none"
//           type="button"
//           onClick={handleBack}
//         >
//           ← Back to Dashboard
//         </button>

//         <section className="bg-white border border-gray-200 rounded-md p-6 max-w-full overflow-x-auto flex flex-col md:flex-row md:space-x-6">
//           <div className="flex-1">
//             <h2 className="text-xl font-semibold mb-4 text-gray-900">
//               {selectedComplaint.title}
//             </h2>
//             <p className="mb-4 text-gray-700">
//               {selectedComplaint.description}
//             </p>
//             <div className="mb-4 space-y-2 text-sm text-gray-600">
//               <div>
//                 <strong>Complaint ID:</strong> {selectedComplaint.complaint_id}
//               </div>
//               <div>
//                 <strong>Status:</strong> {selectedComplaint.status}
//               </div>
//               <div>
//                 <strong>Priority:</strong> {selectedComplaint.priority}
//               </div>
//               <div>
//                 <strong>Reported by:</strong> {selectedComplaint.email}
//               </div>
//               <div>
//                 <strong>Category:</strong> {selectedComplaint.title}
//               </div>
//               <div>
//                 <strong>Date Reported:</strong> {selectedComplaint.date}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="bg-green-600 text-white text-xs rounded px-3 py-1 hover:bg-green-700 focus:outline-none"
//                 type="button"
//                 onClick={() =>
//                   updateStatus(selectedComplaint.complaint_id, "In Progress")
//                 }
//               >
//                 Accept
//               </button>
//               <button
//                 className="bg-red-600 text-white text-xs rounded px-3 py-1 hover:bg-red-700 focus:outline-none"
//                 type="button"
//                 onClick={() => handleAction("decline")}
//               >
//                 Decline
//               </button>
//               <button
//                 className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100 focus:outline-none"
//                 type="button"
//                 onClick={handleBack}
//               >
//                 Close
//               </button>
//             </div>

//             {/* Reason Box */}
//             {showReasonBox && (
//               <div className="mt-4">
//                 <label className="block text-sm text-gray-700 mb-2">
//                   Reason for {actionType}:
//                 </label>
//                 <textarea
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   className="w-full border border-gray-300 rounded p-2 text-sm"
//                   rows="3"
//                 />
//                 <div className="flex justify-end space-x-2 mt-2">
//                   <button
//                     className="bg-blue-600 text-white text-xs rounded px-3 py-1 hover:bg-blue-700 focus:outline-none"
//                     onClick={submitReason}
//                   >
//                     Submit
//                   </button>
//                   <button
//                     className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100 focus:outline-none"
//                     onClick={() => setShowReasonBox(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="mt-6 md:mt-0 md:w-80 flex-shrink-0">
//             <img
//               alt={`Photo related to complaint: ${selectedComplaint.title}`}
//               className="rounded border border-gray-300 w-full h-auto object-cover"
//               src={
//                 selectedComplaint.image
//                   ? `data:image/jpeg;base64,${selectedComplaint.image}`
//                   : "https://placehold.co/300x200?text=No+Image"
//               }
//             />
//           </div>
//         </section>
//       </main>
//     );
//   } else {
//     return (
//       <main className="p-4 max-w-7xl mx-auto space-y-4">
//         <button
//           className="mb-4 text-blue-600 hover:underline"
//           onClick={handleBack}
//         >
//           ← Back to Dashboard
//         </button>

//         <section className="bg-white border border-gray-200 rounded-md p-6 flex flex-col md:flex-row md:space-x-6">
//           <div className="flex-1">
//             <h2 className="text-xl font-semibold mb-4">
//               {selectedComplaint.title}
//             </h2>
//             <p className="mb-4">{selectedComplaint.description}</p>

//             <div className="mb-4 space-y-2 text-sm text-gray-600">
//               <div>
//                 <strong>Complaint ID:</strong> {selectedComplaint.complaint_id}
//               </div>
//               <div>
//                 <strong>Status:</strong> {selectedComplaint.status}
//               </div>
//               <div>
//                 <strong>Priority:</strong> {selectedComplaint.priority}
//               </div>
//               <div>
//                 <strong>Reported by:</strong> {selectedComplaint.email}
//               </div>
//               <div>
//                 <strong>Category:</strong>{" "}
//                 {selectedComplaint.categoryLabel || "Uncategorized"}
//               </div>
//               <div>
//                 <strong>Date Reported:</strong> {selectedComplaint.date}
//               </div>
//             </div>

//             {/* Status Update Form */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="block w-full rounded-md border border-gray-300 py-1.5 px-2 text-sm"
//               >
//                 <option>Open</option>
//                 <option>In Progress</option>
//                 <option>Resolved</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Notes
//               </label>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 className="w-full border border-gray-300 rounded p-2 text-sm"
//                 rows="3"
//                 placeholder="Add any notes..."
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex space-x-2 mb-2">
//               <button
//                 className="bg-green-600 text-white text-xs rounded px-3 py-1 hover:bg-green-700"
//                 onClick={() =>
//                   updateStatus(selectedComplaint.complaint_id, "In Progress")
//                 }
//               >
//                 Accept
//               </button>
//               <button
//                 className="bg-red-600 text-white text-xs rounded px-3 py-1 hover:bg-red-700"
//                 onClick={() => handleAction("decline")}
//               >
//                 Decline
//               </button>
//               <button
//                 className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100"
//                 onClick={handleBack}
//               >
//                 Close
//               </button>
//             </div>

//             {/* Reason Popup */}
//             {showReasonBox && (
//               <div className="mt-2">
//                 <label className="block text-sm text-gray-700 mb-1">
//                   Reason for {actionType}:
//                 </label>
//                 <textarea
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   className="w-full border border-gray-300 rounded p-2 text-sm"
//                   rows="3"
//                 />
//                 <div className="flex justify-end space-x-2 mt-2">
//                   <button
//                     className="bg-blue-600 text-white text-xs rounded px-3 py-1 hover:bg-blue-700"
//                     onClick={submitReason}
//                   >
//                     Submit
//                   </button>
//                   <button
//                     className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100"
//                     onClick={() => setShowReasonBox(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="mt-6 md:mt-0 md:w-80 flex-shrink-0">
//             <img
//               alt={`Photo for complaint: ${selectedComplaint.title}`}
//               className="rounded border border-gray-300 w-full h-auto object-cover"
//               src={
//                 selectedComplaint.image
//                   ? `data:image/jpeg;base64,${selectedComplaint.image}`
//                   : "https://placehold.co/300x200?text=No+Image"
//               }
//             />
//           </div>
//         </section>
//       </main>
//     );
//   }

 
//   return (
//     <main className="dashboard p-4 max-w-7xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

//       <div class="stats-grid">
//         {" "}
//         <div className="stat-card">
//           {" "}
//           <div className="stat-content">
//             {" "}
//             <div>
//               {" "}
//               <p className="stat-label">Total report</p>{" "}
//               <p className="stat-number">100</p>{" "}
//             </div>{" "}
//             <svg
//               className="stat-icon"
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               {" "}
//               <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>{" "}
//             </svg>{" "}
//           </div>{" "}
//         </div>{" "}
//         <div class="stat-card">
//           {" "}
//           <div class="stat-content">
//             {" "}
//             <div>
//               {" "}
//               <p class="stat-label">Open</p> <p class="stat-number open">200</p>{" "}
//             </div>{" "}
//             <svg
//               class="stat-icon open"
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//             >
//               {" "}
//               <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>{" "}
//               <line x1="12" y1="9" x2="12" y2="13"></line>{" "}
//               <line x1="12" y1="17" x2="12.01" y2="17"></line>{" "}
//             </svg>{" "}
//           </div>{" "}
//         </div>{" "}
//         <div class="stat-card">
//           {" "}
//           <div class="stat-content">
//             {" "}
//             <div>
//               {" "}
//               <p class="stat-label">In Progress</p>{" "}
//               <p class="stat-number progress">100</p>{" "}
//             </div>{" "}
//             <svg
//               class="stat-icon progress"
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//             >
//               {" "}
//               <circle cx="12" cy="12" r="10"></circle>{" "}
//               <polyline points="12,6 12,12 16,14"></polyline>{" "}
//             </svg>{" "}
//           </div>{" "}
//         </div>{" "}
//         <div class="stat-card">
//           {" "}
//           <div class="stat-content">
//             {" "}
//             <div>
//               {" "}
//               <p class="stat-label">Resolved</p>{" "}
//               <p class="stat-number resolved">300</p>{" "}
//             </div>{" "}
//             <svg
//               class="stat-icon resolved"
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//             >
//               {" "}
//               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>{" "}
//               <polyline points="22,4 12,14.01 9,11.01"></polyline>{" "}
//             </svg>{" "}
//           </div>{" "}
//         </div>{" "}
//       </div>

//       {/* Complaint Reports */}
//       {loading ? (
//         <p>Loading complaints...</p>
//       ) : (
//         <section className="reports space-y-4">
//           {complaints.map((c) => (
//             <article
//               key={c.complaint_id}
//               className="report-item border border-gray-200 rounded p-4"
//             >
//               <div className="report-tags mb-2">
//                 <span className="tag-id">{c.complaint_id}</span>
//                 <span className="ml-2 text-red-600">{c.status}</span>
//               </div>
//               <h4 className="report-title font-semibold">{c.title}</h4>
//               <p className="report-desc text-sm text-gray-600">
//                 {c.description}
//               </p>
//               <div className="report-meta text-xs text-gray-400 mt-2 flex flex-wrap gap-4">
//                 <div>
//                   <i className="fas fa-user"></i> {c.email}
//                 </div>
//                 <div>
//                   <i className="fas fa-tools"></i>{" "}
//                   {c.categoryLabel || "Uncategorized"}
//                 </div>
//                 <div>
//                   <i className="fas fa-calendar-alt"></i> {c.date}
//                 </div>
//               </div>
//               <div className="report-actions mt-2 flex gap-2">
//                 <button
//                   className="btn-view"
//                   onClick={() => {
//                     setSelectedComplaint(c);
//                     setIsUpdating(false); // just viewing
//                   }}
//                 >
//                   View Details
//                 </button>

//                 <button
//                   className="btn-view bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
//                   onClick={() => {
//                     setSelectedComplaint(c);
//                     setIsUpdating(true); // entering update mode
//                     setStatus(c.status);
//                     setNotes("");
//                   }}
//                 >
//                   Update Status
//                 </button>
//               </div>
//             </article>
//           ))}
//         </section>
//       )}
//     </main>
//   );
// }
import React, { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Accept/Decline reason popup
  const [showReasonBox, setShowReasonBox] = useState(false);
  const [actionType, setActionType] = useState("");
  const [reason, setReason] = useState("");

  // Update status form
  const [status, setStatus] = useState("Open");
  const [notes, setNotes] = useState("");

  // Fetch complaints from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error("Error fetching complaints:", err))
      .finally(() => setLoading(false));
  }, []);

  // Accept/Decline reason handler
  const handleAction = (type) => {
    setActionType(type);
    setShowReasonBox(true);
  };

  const submitReason = () => {
    if (!reason.trim()) {
      alert("Please provide a reason.");
      return;
    }
    alert(
      `${actionType.toUpperCase()} complaint ${
        selectedComplaint.complaint_id
      } with reason: ${reason}`
    );
    // TODO: send to backend
    setShowReasonBox(false);
    setReason("");
  };

  // Update complaint status
  const updateStatus = async (complaintId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/${complaintId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to update status");
        return;
      }
      // Update UI
      setComplaints((prev) =>
        prev.map((c) =>
          c.complaint_id === complaintId ? { ...c, status: newStatus } : c
        )
      );
      setSelectedComplaint((prev) => ({ ...prev, status: newStatus }));
      alert("Status updated successfully!");
      setNotes("");
      setIsUpdating(false);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating status");
    }
  };

  const handleBack = () => {
    setSelectedComplaint(null);
    setShowReasonBox(false);
    setReason("");
    setStatus("Open");
    setNotes("");
    setIsUpdating(false);
  };

  // Detailed view / update form
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

        <section className="bg-white border border-gray-200 rounded-md p-6 flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {selectedComplaint.title}
            </h2>
            <p className="mb-4 text-gray-700">{selectedComplaint.description}</p>
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <div>
                <strong>Complaint ID:</strong> {selectedComplaint.complaint_id}
              </div>
              <div>
                <strong>Status:</strong> {selectedComplaint.status}
              </div>
              <div>
                <strong>Priority:</strong> {selectedComplaint.priority}
              </div>
              <div>
                <strong>Reported by:</strong> {selectedComplaint.email}
              </div>
              <div>
                <strong>Category:</strong>{" "}
                {selectedComplaint.categoryLabel || "Uncategorized"}
              </div>
              <div>
                <strong>Date Reported:</strong> {selectedComplaint.date}
              </div>
            </div>

            {isUpdating ? (
              // Update Status Form
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-2 text-sm"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    rows="3"
                    placeholder="Add any notes..."
                  />
                </div>

                <div className="flex space-x-2 mb-2">
                  <button
                    className="bg-green-600 text-white text-xs rounded px-3 py-1 hover:bg-green-700"
                    onClick={() => updateStatus(selectedComplaint.complaint_id, status)}
                  >
                    Update Status
                  </button>
                  <button
                    className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100"
                    onClick={() => setIsUpdating(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              // View Details Buttons
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-green-600 text-white text-xs rounded px-3 py-1 hover:bg-green-700"
                  onClick={() => {
                    setIsUpdating(true);
                    setStatus(selectedComplaint.status);
                    setNotes("");
                  }}
                >
                  Update Status
                </button>
                <button
                  className="bg-red-600 text-white text-xs rounded px-3 py-1 hover:bg-red-700"
                  onClick={() => handleAction("decline")}
                >
                  Decline
                </button>
                <button
                  className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100"
                  onClick={handleBack}
                >
                  Close
                </button>
              </div>
            )}

            {/* Reason Box */}
            {showReasonBox && (
              <div className="mt-4">
                <label className="block text-sm text-gray-700 mb-2">
                  Reason for {actionType}:
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  rows="3"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    className="bg-blue-600 text-white text-xs rounded px-3 py-1 hover:bg-blue-700"
                    onClick={submitReason}
                  >
                    Submit
                  </button>
                  <button
                    className="border border-gray-300 text-gray-700 text-xs rounded px-3 py-1 hover:bg-gray-100"
                    onClick={() => setShowReasonBox(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 md:mt-0 md:w-80 flex-shrink-0">
            <img
              alt={`Photo for complaint: ${selectedComplaint.title}`}
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

  // Default Dashboard view
  return (
    <main className="dashboard p-4 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      {/* Stats cards */}
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total reports</p>
              <p className="stat-number">{complaints.length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Open</p>
              <p className="stat-number open">
                {complaints.filter((c) => c.status === "Open").length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">In Progress</p>
              <p className="stat-number progress">
                {complaints.filter((c) => c.status === "In Progress").length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Resolved</p>
              <p className="stat-number resolved">
                {complaints.filter((c) => c.status === "Resolved").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Reports */}
      {loading ? (
        <p>Loading complaints...</p>
      ) : (
        <section className="reports space-y-4">
          {complaints.map((c) => (
            <article
              key={c.complaint_id}
              className="report-item border border-gray-200 rounded p-4"
            >
              <div className="report-tags mb-2">
                <span className="tag-id">{c.complaint_id}</span>
                <span className="ml-2 text-red-600">{c.status}</span>
              </div>
              <h4 className="report-title font-semibold">{c.title}</h4>
              <p className="report-desc text-sm text-gray-600">{c.description}</p>
              <div className="report-meta text-xs text-gray-400 mt-2 flex flex-wrap gap-4">
                <div>
                  <i className="fas fa-user"></i> {c.email}
                </div>
                <div>
                  <i className="fas fa-tools"></i>{" "}
                  {c.categoryLabel || "Uncategorized"}
                </div>
                <div>
                  <i className="fas fa-calendar-alt"></i> {c.date}
                </div>
              </div>
              <div className="report-actions mt-2 flex gap-2">
                <button
                  className="btn-view"
                  onClick={() => {
                    setSelectedComplaint(c);
                    setIsUpdating(false);
                  }}
                >
                  View Details
                </button>

                <button
                  className="btn-view bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                  onClick={() => {
                    setSelectedComplaint(c);
                    setIsUpdating(true);
                    setStatus(c.status);
                    setNotes("");
                  }}
                >
                  Update Status
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

