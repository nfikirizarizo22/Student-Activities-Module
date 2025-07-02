// src/pages/TrainerLogin.jsx
import React, { useEffect, useRef } from 'react';
import './TrainerLogin.css';
import { useNavigate } from 'react-router-dom';

export default function TrainerLogin() {
  const navigate = useNavigate();
  const googleButton = useRef(null);

  function handleGoogleResponse(response) {
    alert("Google login successful!\nJWT: " + response.credential);
    navigate("/trainer-dashboard");
  }

  useEffect(() => {
    function renderGoogleButton() {
      if (window.google && googleButton.current) {
        window.google.accounts.id.initialize({
          client_id: "356979158608-c0en9lpluehrgo53673cqjig2fktn2ab.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
        });
      } else {
        setTimeout(renderGoogleButton, 100);
      }
    }
    renderGoogleButton();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Logged in!");
    navigate("/trainer-dashboard"); // Redirect to trainer dashboard
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Trainer Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button> {/* No onClick here */}
        </form>
        <div ref={googleButton} style={{ marginTop: "10px" }}></div>
        <p className="note">Don't have an account? Contact admin.</p>
      </div>
    </div>
  );
}
