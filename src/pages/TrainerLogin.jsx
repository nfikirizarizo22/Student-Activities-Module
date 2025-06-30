// src/pages/LoginPage.jsx
import React from 'react';
import './TrainerLogin.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Logged in!");
    navigate("/"); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Trainer Login</h2>
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
