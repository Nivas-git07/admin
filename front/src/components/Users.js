import React, { useState } from "react";

export default function Users() {
  const initialUsers = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", role: "User", status: "Active" },
    { id: 4, name: "Diana Prince", email: "diana.prince@example.com", role: "Moderator", status: "Active" },
    { id: 5, name: "Ethan Hunt", email: "ethan.hunt@example.com", role: "User", status: "Active" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id: users.length + 1, ...formData };
    setUsers((prev) => [...prev, newUser]);
    setFormData({ name: "", email: "", role: "", status: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <section className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900 select-none">Users</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-gray-700 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["ID", "Name", "Email", "Role", "Status", "Actions"].map((col) => (
                  <th key={col} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={idx % 2 === 0 ? "even:bg-white" : "odd:bg-gray-50"}>
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      className="bg-red-600 text-white text-xs px-3 py-1 rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              autoFocus
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoFocus

              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              id="role"
              required
              
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>Select role</option>
              <option>Admin</option>
              <option>Moderator</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              id="status"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled>Select status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
