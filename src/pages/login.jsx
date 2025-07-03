// <!-- src/pages/LoginPage.jsx -->

// useful shortcuts

  // press r + enter to restart the server
  // press u + enter to show server url
  // press o + enter to open in browser
  // press c + enter to clear console
  // press q + enter to quit

import React, { useContext, useEffect, useRef, useState } from 'react'
import './login.jsx';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URL } from '../utils';
import AuthContext from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const googleButton = useRef(null);
  const { onLoginSuccess } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      // setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      // Updating state value with dynamic key
      const updatedValues = {
        ...formData,
        [e.target.name]: e.target.value
      }
      setFormData(updatedValues);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setIsSubmitting(true);
        const res = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        console.log(res.data); // response from backend
        const user = res.data?.data
        const token = res.data?.token;
        alert("Login successful!");
        onLoginSuccess(token, user); // Call context method to set token and user info
        if(user.role === "student") {
          navigate("/student-dashboard"); // redirect to student dashboard
        } else if(user.role === "trainer") {
          navigate("/trainer-dashboard"); // redirect to trainer dashboard
        } else if(user.role === "admin") {
          navigate("/admin-dashboard"); // redirect to admin dashboard
        }
      } catch (err) {
        console.error(err);
        alert("Login failed!" + err?.response?.data?.error
        );
      } finally {
        setIsSubmitting(false);
      }
    };

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
        <h2> Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" required name='email' onChange={handleChange} />
          <input type="password" placeholder="Password" required name='password' onChange={handleChange} />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</button>
        </form>
        <div ref={googleButton} style={{ marginTop: "10px" }}></div>
        <p className="note">Don't have an account? Contact admin.</p>
      </div>
    </div>
  );
}

// Note: Ensure you have the Google API script loaded in your index.html
// {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}

