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
  const [replyTo, setReplyTo] = useState(null);
  const [compose, setCompose] = useState(false);
  const [messageList, setMessageList] = useState([
    { from: "Admin", text: "Meeting at 3pm today.", date: "2025-07-01", unread: true },
    { from: "Student", text: "Can I join the next session?", date: "2025-07-02", unread: false },
  ]);

  const closeModal = () => {
    setModal(null);
    setShowEditProfile(false);
    setShowChangePassword(false);
    setReplyTo(null);
    setCompose(false);
  };

  // Sample data for demonstration
  const activities = [
    { name: "Football Training", date: "2025-07-10" },
    { name: "Math Club", date: "2025-07-12" },
  ];
  const participation = [
    { student: "Alice", activity: "Football Training", date: "2025-07-10", status: "Confirmed" },
    { student: "Bob", activity: "Math Club", date: "2025-07-12", status: "Pending" },
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

  function handleMarkAsRead(index) {
    const updated = [...messageList];
    updated[index].unread = false;
    setMessageList(updated);
  }

  function handleSendReply(e, index) {
    e.preventDefault();
    alert(`Reply sent to ${messageList[index].from}: ${e.target.reply.value}`);
    setReplyTo(null);
  }

  function handleSendNewMessage(e) {
    e.preventDefault();
    alert(`Message sent to ${e.target.to.value}: ${e.target.message.value}`);
    setCompose(false);
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
            <table className="participation-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {participation.map((p, i) => (
                  <tr key={i}>
                    <td>{p.student}</td>
                    <td>{p.activity}</td>
                    <td>{p.date || "2025-07-10"}</td>
                    <td>{p.status || "Pending"}</td>
                    <td>
                      {p.status !== "Confirmed" && (
                        <button
                          className="settings-btn"
                          style={{ marginRight: 8 }}
                          onClick={() => {
                            participation[i].status = "Confirmed";
                            participation[i].date = participation[i].date || "2025-07-10";
                            setModal("participation"); // force re-render
                          }}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className="settings-btn"
                        style={{ background: "#e74c3c" }}
                        onClick={() => {
                          participation.splice(i, 1);
                          setModal("participation"); // force re-render
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {modal === "messages" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>Messages</h2>
            <button
              className="settings-btn"
              style={{ marginBottom: "1rem" }}
              onClick={() => setCompose(true)}
            >
              Compose New Message
            </button>
            <ul className="messages-list">
              {messageList.map((msg, i) => (
                <li
                  key={i}
                  className={`message-item${msg.unread ? " unread" : ""}`}
                  style={{
                    fontWeight: msg.unread ? "bold" : "normal",
                    marginBottom: "1rem"
                  }}
                >
                  <div>
                    <span style={{ color: "#004aad" }}>{msg.from}</span>
                    <span style={{ marginLeft: 8, fontSize: "0.9em", color: "#888" }}>
                      {msg.date}
                    </span>
                  </div>
                  <div style={{ margin: "0.5rem 0" }}>{msg.text}</div>
                  <div>
                    {msg.unread && (
                      <button
                        className="settings-btn"
                        style={{ marginRight: 8 }}
                        onClick={() => handleMarkAsRead(i)}
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      className="settings-btn"
                      onClick={() => setReplyTo(i)}
                    >
                      Reply
                    </button>
                  </div>
                  {replyTo === i && (
                    <form
                      className="settings-form"
                      style={{ marginTop: "1rem" }}
                      onSubmit={e => handleSendReply(e, i)}
                    >
                      <label>
                        Reply:
                        <input name="reply" required />
                      </label>
                      <button className="settings-btn" type="submit">Send</button>
                      <button
                        className="settings-btn"
                        type="button"
                        style={{ marginLeft: 8, background: "#888" }}
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
            {compose && (
              <form
                className="settings-form"
                style={{ marginTop: "1rem" }}
                onSubmit={handleSendNewMessage}
              >
                <label>
                  To:
                  <input name="to" required />
                </label>
                <label>
                  Message:
                  <input name="message" required />
                </label>
                <button className="settings-btn" type="submit">Send</button>
                <button
                  className="settings-btn"
                  type="button"
                  style={{ marginLeft: 8, background: "#888" }}
                  onClick={() => setCompose(false)}
                >
                  Cancel
                </button>
              </form>
            )}
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
