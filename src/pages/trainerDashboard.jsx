// TrainerDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./TrainerDashboard.css"; 
import AuthContext from "../contexts/AuthContext";

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const {token, isLoadingInfo, onLogout,userInfo} = useContext(AuthContext);

  useEffect(() => {
    if(!token && !isLoadingInfo) {
      navigate("/");
    }
    if(userInfo?.role !== "trainer" && !isLoadingInfo) {
      navigate("/");
    }
  }, [token, isLoadingInfo]);

  const closeModal = () => setModal(null);

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
            <li onClick={() => setModal("/activities")}><Link to="/activities">📋 My Activities</Link></li>
            <li onClick={() => setModal("participation")}><Link to="#">👥 Participation</Link></li>
            <li onClick={() => setModal("messages")}><Link to="#">💬 Messages</Link></li>
            <li onClick={() => setModal("settings")}><Link to="#">⚙️ Settings</Link></li>
            <li><Link to="#logout" className="logout" onClick={onLogout}>🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      {modal === "activities" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>My Activities</h2>
            <table className="activities-table">
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Date/Time</th>
                  <th>Days</th> 
                  <th>Description</th>
                  <th>Participants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={i}>
                    <td>{a.name}</td>
                    <td>{a.date || "TBD"}</td>
                    <td>{a.days ? a.days.join(", ") : "N/A"}</td> {/* Add this */}
                    <td>{a.description || "No description"}</td>
                    <td>{a.participants || 0}</td>
                    <td>{a.status || "Upcoming"}</td>
                    <td>
                      <button className="settings-btn" style={{marginRight: 8}}>Edit</button>
                      <button className="settings-btn" style={{background: "#e74c3c"}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                          setModal("participation"); 
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
              <button
                className="settings-btn"
                style={{ background: "#e74c3c" }}
                onClick={() => {
                  closeModal();
                  navigate("/");
                }}
              >
                Logout
              </button>
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
          <h1>Welcome, {userInfo?.names}</h1>
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
