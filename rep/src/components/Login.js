import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(); // move to dashboard
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient">
      <div className="max-w-4xl w-full bg-white rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center p-10 md:p-16 gap-12 shadow-lg border border-gray-300 mx-4">
        {/* Left Section */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="flex items-center gap-4 text-gray-900 font-semibold text-xl">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shadow-md">
              <i className="fas fa-check text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold select-none text-gray-900">
              CivicFix Admin
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Welcome, Admin
          </h1>
          <p className="text-gray-700 text-lg max-w-md">
            Please login to your account
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-3xl p-10 w-full md:w-96 shadow-md border border-gray-300"
        >
          <h2 className="font-semibold text-gray-900 mb-6 text-2xl">Login</h2>

          <label
            htmlFor="email"
            className="block text-sm text-gray-700 mb-2 font-medium"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 rounded-xl px-4 py-3 mb-6 text-base focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
          />

          <label
            htmlFor="password"
            className="block text-sm text-gray-700 mb-2 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 rounded-xl px-4 py-3 mb-8 text-base focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
          />

          <button
            type="submit"
            className="login-btn w-full bg-gray-900 text-white font-semibold py-3 rounded-xl text-lg hover:bg-gray-800 transition shadow"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-900 mt-5 cursor-pointer select-none hover:underline">
            Forgot password?
          </p>
        </form>
      </div>
    </div>
  );
}
