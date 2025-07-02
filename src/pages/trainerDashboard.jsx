// TrainerDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDashboard.css";

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState("Light");
  const [profileName, setProfileName] = useState("Trainer Name");
  const [email, setEmail] = useState("trainer@email.com");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const closeModal = () => {
    setModal(null);
    setShowEditProfile(false);
    setShowChangePassword(false);
  };

  // Sample data for demonstration
  const activities = [
    { name: "Football Training", date: "2025-07-10" },
    { name: "Math Club", date: "2025-07-12" },
  ];
  const participation = [
    { student: "Alice", activity: "Football Training" },
    { student: "Bob", activity: "Math Club" },
  ];
  const messages = [
    { from: "Admin", text: "Meeting at 3pm today." },
    { from: "Student", text: "Can I join the next session?" },
  ];
  const settings = [
    { label: "Notification Email", value: email },
    { label: "Theme", value: theme },
    { label: "Profile Name", value: profileName },
    { label: "Receive Email Notifications", value: "Yes" },
    { label: "Language", value: "English" }
  ];

  // Theme toggle
  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme.toLowerCase());
  }, [theme]);

  // Edit Profile Handler
  function handleProfileSave(e) {
    e.preventDefault();
    setProfileName(e.target.profileName.value);
    setEmail(e.target.email.value);
    setShowEditProfile(false);
  }

  // Change Password Handler (demo only)
  function handlePasswordSave(e) {
    e.preventDefault();
    setShowChangePassword(false);
    alert("Password changed!");
  }

  // Switch Theme Handler
  function handleSwitchTheme() {
    setTheme((prev) => (prev === "Light" ? "Dark" : "Light"));
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="brand-name">StuActPortal</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="#home">🏠 Dashboard</a></li>
            <li onClick={() => navigate("/add-activity")}><a href="#">➕ Add Activity</a></li>
            <li onClick={() => setModal("activities")}><a href="#">📋 My Activities</a></li>
            <li onClick={() => setModal("participation")}><a href="#">👥 Participation</a></li>
            <li onClick={() => setModal("messages")}><a href="#">💬 Messages</a></li>
            <li onClick={() => setModal("settings")}><a href="#">⚙️ Settings</a></li>
            <li><a href="#logout" className="logout">🚪 Logout</a></li>
          </ul>
        </nav>
      </aside>

      {/* Pop-up Modals */}
      {modal === "activities" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>My Activities</h2>
            <ul>
              {activities.map((act, i) => (
                <li key={i}>
                  <strong>{act.name}</strong> — {act.date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {modal === "participation" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>Participation</h2>
            <ul>
              {participation.map((p, i) => (
                <li key={i}>
                  {p.student} is participating in <strong>{p.activity}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {modal === "messages" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>Messages</h2>
            <ul>
              {messages.map((msg, i) => (
                <li key={i}>
                  <strong>{msg.from}:</strong> {msg.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {modal === "settings" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>Settings</h2>
            <ul className="settings-list">
              {settings.map((s, i) => (
                <li key={i} className="settings-item">
                  <span className="settings-label">{s.label}:</span>
                  <span className="settings-value">{s.value}</span>
                </li>
              ))}
            </ul>
            <div className="settings-actions">
              <button className="settings-btn" onClick={() => setShowEditProfile(true)}>Edit Profile</button>
              <button className="settings-btn" onClick={() => setShowChangePassword(true)}>Change Password</button>
              <button className="settings-btn" onClick={handleSwitchTheme}>Switch Theme</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>Edit Profile</h2>
            <form onSubmit={handleProfileSave} className="settings-form">
              <label>
                Profile Name:
                <input name="profileName" defaultValue={profileName} required />
              </label>
              <label>
                Notification Email:
                <input name="email" type="email" defaultValue={email} required />
              </label>
              <button className="settings-btn" type="submit">Save</button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordSave} className="settings-form">
              <label>
                New Password:
                <input name="password" type="password" required />
              </label>
              <label>
                Confirm Password:
                <input name="confirmPassword" type="password" required />
              </label>
              <button className="settings-btn" type="submit">Change</button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-dashboard">
        <header className="dashboard-header">
          <h1>Welcome, Trainer</h1>
          <p>Manage your activities and view student participation here.</p>
        </header>

        <section className="dashboard-widgets">
          <div className="widget-card">
            <h3>Activities Created</h3>
            <p>12</p>
          </div>
          <div className="widget-card">
            <h3>Students Participating</h3>
            <p>78</p>
          </div>
          <div className="widget-card">
            <h3>Messages</h3>
            <p>5 new</p>
          </div>
        </section>

        <section id="home" className="dashboard-overview">
          <h2>Overview</h2>
          <p>This is your control center for managing student activities.</p>
        </section>
      </main>
    </div>
  );
}
