import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import agahozoImage from './agahozo.jpeg';
import samImage from './sam.jpg';
import fikiriImage from './fikiri.jpg';
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com'; 

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/loginpage"); 
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_2kasu6v", "template_22a5tvb", e.target)
      .then((response) => {
        console.log("SUCCESS!", response);
        alert("Message sent successfully!");
        e.target.reset();
      })
      .catch((error) => {
        console.log("FAILED...", error);
        alert("Failed to send message: " + error.text);
      });
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo-accent">Stu</span><span className="logo-main">ActPortal</span>
        </div>
        <ul className="nav-links">
          <li><button onClick={() => navigate("/login")} className="nav-btn">Login</button></li>
          <li><button className="nav-btn" onClick={() => navigate("/signup")}>Signup</button></li>
        </ul>
      </nav>

      {/* Hero */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Engage. Explore. Excel.</h1>
          <p>Manage and participate in extracurricular activities with ease. Whether you're a student, trainer, or admin — our portal has you covered.</p>
          <button className="btn-primary" onClick={() => navigate("/login")}>Get Started</button> {/* directly go to student login page */}

        </div>
        <div className="hero-image">
          <img src={agahozoImage} alt="Hero Illustration" />
        </div>
      </header>

    
     

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

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box"><h3>500+</h3><p>Active Students</p></div>
          <div className="stat-box"><h3>15+</h3><p>Activity Types</p></div>
          <div className="stat-box"><h3>10+</h3><p>Trainers</p></div>
          <div className="stat-box"><h3>1+</h3><p>Years of Impact</p></div>
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
        <form id="contactForm" className="contact-form" onSubmit={handleContactSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
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
