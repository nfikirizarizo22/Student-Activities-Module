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
    alert("Google login successful!\nJWT: " + response.credential);
    navigate("/");
  }

  useEffect(() => {
    function renderGoogleButton() {
      if (window.google && googleButton.current) {
        window.google.accounts.id.initialize({
          client_id: "356979158608-c0en9lpluehrgo53673cqjig2fktn2ab.apps.googleusercontent.com", // Replace with your actual client ID
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

// Note: Ensure you have the Google API script loaded in your index.html
// {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}

