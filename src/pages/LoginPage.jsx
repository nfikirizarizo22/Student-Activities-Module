// src/pages/LoginPage.jsx
import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your logic here (like calling an API)
    alert("Logged in!");
    navigate("/"); // Redirect to home or dashboard
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className="note">Don't have an account? Contact admin.</p>
      </div>
    </div>
  );
}
