import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./TrainerDashboard.css"; 
import AuthContext from "../contexts/AuthContext";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const {token, isLoadingInfo, onLogout,userInfo} = useContext(AuthContext);

  useEffect(() => {
    if(!token && !isLoadingInfo) {
      navigate("/");
    }
    if(userInfo?.role !== "student" && !isLoadingInfo) {
      navigate("/");
    }
  }, [token, isLoadingInfo]);

  const closeModal = () => setModal(null);



  if(!token){
    return null;
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
            <li onClick={() => setModal("/activities")}><a href="/activities">📋 Activities</a></li>
            <li onClick={() => setModal("participation")}><a href="#">👥 Participation</a></li>
            <li onClick={() => setModal("messages")}><a href="#">💬 Messages</a></li>
            <li onClick={() => setModal("settings")}><a href="#">⚙️ Settings</a></li>
            <li><a href="#logout" className="logout" onClick={onLogout}>🚪 Logout</a></li>
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
            <ul>
              {settings.map((s, i) => (
                <li key={i}>
                  <strong>{s.label}:</strong> {s.value}
                </li>
              ))}
            </ul>
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
