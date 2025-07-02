// TrainerDashboard.jsx
import React from "react";
import "./TrainerDashboard.css"; 

export default function TrainerDashboard() {
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
            <li><a href="#my-activities">📋 My Activities</a></li>
            <li><a href="#participation">👥 Participation</a></li>
            <li><a href="#messages">💬 Messages</a></li>
            <li><a href="#settings">⚙️ Settings</a></li>
            <li><a href="#logout" className="logout">🚪 Logout</a></li>
          </ul>
        </nav>
      </aside>

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
          {/* You can add graphs, charts, recent activity log, etc. */}
        </section>
      </main>
    </div>
  );
}
