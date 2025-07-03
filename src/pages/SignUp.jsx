import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';
import {API_URL} from "../utils"

export default function SignUp () {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    role: 'student' // default role,
  });

  const handleChange = (e) => {
    // setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Updating state value with dynamic key
    const updatedValues = {
      ...formData,
      [e.target.name]: e.target.value
    } 
    console.log("Updated role:", updatedValues.role);
    setFormData(updatedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_URL}/auth/register`, {
        names: formData.name,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        role: formData.role
      });
      console.log(res.data); // response from backend
      alert("Signup successful!");
      navigate("/"); // redirect to landing page
    } catch (err) {
      console.error(err);
      alert("Signup failed!" + err?.response?.data?.error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="trainer">Trainer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>{isSubmitting ? "Signing Up..." : "Sign Up"}</button>
        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")} className="link-text">Go to Login</span>
        </p>
      </form>
    </div>
  );
}
