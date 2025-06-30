import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import agahozoImage from './agahozo.jpeg';
import samImage from './sam.jpg';
import fikiriImage from './fikiri.jpg';
import React, { useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo-accent">Stu</span><span className="logo-main">ActPortal</span>
        </div>

        <ul className="nav-links">
          <li><button onClick={handleLoginClick} className="nav-btn">Login</button></li>
          {/* <li><a href="#features" className="nav-link">Features</a></li> */}
          {/* <li><a href="#team" className="nav-link">Team</a></li> */}
          {/* <li><a href="#contact" className="nav-link">Contact</a></li> */}
        </ul>
      </nav>

      {/* Hero */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Engage. Explore. Excel.</h1>
          <p>Manage and participate in extracurricular activities with ease. Whether you're a student, trainer, or admin — our portal has you covered.</p>
           <button className="btn-primary" onClick={handleLoginClick}>Get Started</button>
        </div>
        <div className="hero-image">
          <img src={agahozoImage} alt="Hero Illustration" />
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal">
          <div className="login-options-box">
            <h3>Select Login Type</h3>
            <button className="btn-login-option" onClick={() => navigate("/trainer-login")}>Login as Trainer</button>
            <button className="btn-login-option" onClick={() => navigate("/student-login")}>Login as Student</button>
            <button className="btn-login-option" onClick={() => navigate("/admin-login")}>Login as Admin</button>
            <button className="close-modal-btn" onClick={closeLoginModal}>Close</button>
          </div>
        </div>
      )}

      {/* Features */}
      <section id="features" className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Student Access</h3>
            <p>Enroll in activities, track your participation, and request withdrawals with approval.</p>
          </div>
          <div className="feature-card">
            <h3>👨‍🏫 Trainer Tools</h3>
            <p>Create and manage student activities, monitor participation, and handle withdrawal requests.</p>
          </div>
          <div className="feature-card">
            <h3>🛠 Admin Control</h3>
            <p>View activity reports, monitor student engagement, and generate participation data.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box">
            <h3>500+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-box">
            <h3>15+</h3>
            <p>Activity Types</p>
          </div>
          <div className="stat-box">
            <h3>10+</h3>
            <p>Trainers</p>
          </div>
          <div className="stat-box">
            <h3>1+</h3>
            <p>Years of Impact</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Students Say</h2>
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <p>“This portal made it so easy to join debate club!”</p>
            <span>— Jerimiah, S6MPC</span>
          </div>
          <div className="testimonial-card">
            <p>“I could track my hours and submit reports so easily.”</p>
            <span>— Manase, S6PCB</span>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={samImage} alt="Mugisha Samuel" className="avatar" />
            <p className="member-name">Mugisha Samuel</p>
          </div>
          <div className="team-member">
            <img src={fikiriImage} alt="Zarizo Fikiri Nicolas" className="avatar" />
            <p className="member-name">Zarizo Fikiri Nicolas</p>
          </div>
        </div>

      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us!</p>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to make your mark?</h2>
        <button className="btn-primary" onClick={handleLoginClick}>Join Now</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Student Activities Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}