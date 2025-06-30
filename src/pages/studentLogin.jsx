// <!-- src/pages/LoginPage.jsx -->

// useful shortcuts

  // press r + enter to restart the server
  // press u + enter to show server url
  // press o + enter to open in browser
  // press c + enter to clear console
  // press q + enter to quit

import React, { useEffect, useRef } from 'react';
import './studentLogin.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const googleButton = useRef(null);

  function handleGoogleResponse(response) {
    alert("Google login successful!");
    navigate("/");
  }

  useEffect(() => {
    /* global google */
    if (window.google && googleButton.current) {
      window.google.accounts.id.initialize({
        client_id: "356979158608-f48mg2hke22q2vg0p3go3kdpm4o267uk.apps.googleusercontent.com", // Replace with your client ID
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(googleButton.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Logged in!");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div ref={googleButton} style={{ marginTop: "10px" }}></div>
        <p className="note">Don't have an account? Contact admin.</p>
      </div>
    </div>
  );
}

{/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}
