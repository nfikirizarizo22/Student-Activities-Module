// src/pages/LoginPage.jsx
import React, { useEffect, useRef } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const googleButton= useRef(null);

  function handleGoogleResponse(response) {
    alert("Google login successful!\nJWT: " + response.credential);
    navigate("/");
  } 

  useEffect(() => {
    function renderButton() {
      if (window.google && googleButton.current) {
        window.google.accounts.id.initialize({
          client_id: "356979158608-c0en9lpluehrgo53673cqjig2fktn2ab.apps.googleusercontent.com",
          callback: handleGoogleResponse
        });
        window.google.accounts.id.renderButton(
          googleButton.current,
          { theme: "outline", size: "large" }
        );
      } else {
        setTimeout(renderButton, 100);
      }
    }
    renderButton();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Logged in!");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
         <div ref={googleButton} style={{ marginTop: "10px" }}></div>
        <p className="note">Isn't Login sucessfully? Reload page.</p>
      </div>
    </div>
  );
}
