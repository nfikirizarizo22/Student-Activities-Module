import React, { useState } from "react";
import "./addActivity.css"; 

export default function AddActivity() {
  const [activity, setActivity] = useState({
    name: "",
    activityLeader: "",
    sessions: [{ day: "", startTime: "", endTime: "" }],
    description: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setActivity((prev) => ({
      ...prev,
      [name]: value,
    })); 
  }

  function handleSessionChange(index, field, value) {
    const updatedSessions = [...activity.sessions];
    updatedSessions[index][field] = value;
    setActivity((prev) => ({
      ...prev,
      sessions: updatedSessions,
    }));
  }

  function addSession() {
    setActivity((prev) => ({
      ...prev,
      sessions: [...prev.sessions, { day: "", startTime: "", endTime: "" }],
    }));
  }

  function removeSession(index) {
    setActivity((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Simple validation example
    if (!activity.name || !activity.activityLeader || !activity.description) {
      setError("Please fill all required fields.");
      return;
    }

    console.log("Submitted activity:", activity);

    // Reset the form
    setActivity({
      name: "",
      activityLeader: "",
      sessions: [{ day: "", startTime: "", endTime: "" }],
      description: "",
    });
    setError("");
  }

  return (
    <form className="add-activity-form" onSubmit={handleSubmit}>
      <h2>Add Activity</h2>

      {error && <p className="error-message">{error}</p>}

      <label>Activity Name:</label>
      <input
        type="text"
        name="name"
        value={activity.name}
        onChange={handleChange}
        required
      />

      <label>Activity Leader:</label>
      <input
        type="text"
        name="activityLeader"
        value={activity.activityLeader}
        onChange={handleChange}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        rows="4"
        value={activity.description}
        onChange={handleChange}
        required
      ></textarea>

      <h3>Sessions (Day, Start, End)</h3>
      {activity.sessions.map((session, index) => (
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

          {activity.sessions.length > 1 && (
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

      <button type="submit" className="submit-btn">
        Submit Activity
      </button>
    </form>
  );
}
