import React, { useState, useContext } from "react";
import "./addActivity.css";
import AuthContext from "../contexts/AuthContext";
import { API_URL } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddActivity() {
  const [activityFormData, setActivity] = useState({
    name: "",
    activityLeader: "",
    sessions: [{ day: "", startTime: "", endTime: "" }],
    description: "",
  });

  const navigate = useNavigate();
  const { token, isLoadingInfo,userInfo } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const updatedValues = {
      ...activityFormData,
      [e.target.name]: e.target.value
    }
    setActivity(updatedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_URL}/activities`, {
        name: activityFormData.name,
        activityLeader: activityFormData.activityLeader,
        days: activityFormData.sessions,
        description: activityFormData.description
      },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      alert("Activity added successfully!");
      navigate(`/activities`);
    } catch (err) {
      console.error(err);
      alert("Activity addition failed!" + err?.response?.data?.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleSessionChange(index, field, value) {
    const updatedSessions = [...activityFormData.sessions];
    updatedSessions[index][field] = value;
    setActivity((prev) => ({
      ...prev,
      sessions: updatedSessions,
    }));
  };

  function addSession() {
    setActivity((prev) => ({
      ...prev,
      sessions: [...prev.sessions, { day: "", startTime: "", endTime: "" }],
    }));
  };

  function removeSession(index) {
    setActivity((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((_, i) => i !== index),
    }));
  };

  // Navigation handlers
  const logout = () => {
    alert("Logged out!");
  };
  const toggleMobileMenu = () => setMenuOpen(open => !open);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/trainer-dashboard" className="nav-brand">
            <span className="logo-accent"  style={{ marginRight: "30px" }}>StuActPortal</span>
          </a>
          <ul className={`nav-menu${menuOpen ? " active" : ""}`} id="navMenu">
            <li><a href="#" className="active"> Dashboard</a></li>
            <li><a href="/add-activity"> Participation</a></li>
            <li><a href="/activities"> My Activities</a></li>
            <li><a href="/profile"> Profile</a></li>
          </ul>
          <div className="nav-user">
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* <div className="activities-page">
        <div className="page-header">
          <h1 className="page-title">Add Activity</h1>
          <p className="page-subtitle">
            Fill in the details below to create a new extracurricular activity for students to join.
          </p>
        </div> */}

      <form className="add-activity-form" onSubmit={handleSubmit}>
        <h2>Add Activity</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Activity Name:</label>
        <input
          type="text"
          name="name"
          value={activityFormData.name}
          onChange={handleChange}
          required
        />

       
        <label>Description:</label>
        <textarea
          name="description"
          rows="4"
          value={activityFormData.description}
          onChange={handleChange}
          required
        ></textarea>

        <h3>Sessions (Day, Start, End)</h3>
        {activityFormData.sessions.map((session, index) => (
          <div key={index} className="session-group">
            <select
              value={session.day}
              onChange={(e) => handleSessionChange(index, "day", e.target.value)}
              required
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>

            <input
              type="time"
              value={session.startTime}
              onChange={(e) => handleSessionChange(index, "startTime", e.target.value)}
              required
            />

            <input
              type="time"
              value={session.endTime}
              onChange={(e) => handleSessionChange(index, "endTime", e.target.value)}
              required
            />

            {activityFormData.sessions.length > 1 && (
              <button
                type="button"
                onClick={() => removeSession(index)}
                className="remove-btn"
              >
                ✖
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addSession} className="add-session-btn">
          ➕ Add Another Session
        </button>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Activity"}
        </button>
      </form>
    </>
  );
}
