// displaying the added activities
import React, { useState, useEffect, useContext } from "react";
import "./ActivitiesPage.css";
import AuthContext from "../contexts/AuthContext";
import { API_URL } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ActivitiesPage() {
  const navigate = useNavigate();
  const { token , isLoadingInfo,userInfo } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(`${API_URL}/activities/${userInfo.role == "trainer" ? "/mine" : ""}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
        });
        console.log("Fetched activities:", res.data);
        // Ensure activities is always an array
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setActivities(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivities();
  }, [token]);

  const toggleMobileMenu = () => setMenuOpen(open => !open);


  //displaying all of the added activities
  if (!Array.isArray(activities)) {
    console.error("Activities data is not an array:", activities);
    return <p>Error loading activities.</p>;
  } 


  // Stub functions for logout and mobile menu (implement as needed)
  const logout = () => {
    // TODO: Implement logout logic
    alert("Logged out!");
  };


  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="nav-brand">
            <span className="logo-accent">Stu</span><span>ActPortal</span>
          </a>
          <ul className={`nav-menu${menuOpen ? " active" : ""}`} id="navMenu">
            <li><a href="#" className="active"> Dashboard</a></li>
            <li><a href="/add-activity"> Add Activity</a></li>
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

      <div className="activities-page">
        <h1>Activities</h1>
        {isLoadingInfo ? (
          <p>Loading activities...</p>
        ) : (
          <div className="activities-list">
            {activities.length > 0 ? (
              activities.map(activity => (
                <div key={activity._id} className="activity-item">
                  <h2>{activity.name}</h2>
                  <p>Leader: {activity.activityLeader?.names}</p>
                  <p>Description: {activity.description}</p>
                  <button
                    onClick={() => {
                      setSelectedActivity(activity);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p>No activities found.</p>
            )}
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showModal && selectedActivity && (

        console.log("Selected activity:", selectedActivity),
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            
           <p><strong>Name:</strong> {selectedActivity.name}</p>
            <p><strong>Leader:</strong> {selectedActivity.activityLeader?.names}</p>
            <p><strong>Description:</strong> {selectedActivity.description}</p>
            {selectedActivity.days && selectedActivity.days.length > 0 && (
              <div>
                <h4>Sessions:</h4>
                <ul>
                  {selectedActivity.days.map((day, id) => (
                    <li key={id}>
                      <strong>{day.day}:</strong> {day.startTime} - {day.endTime}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="join-btn"
              onClick={() => {
                // TODO: Implement join logic here
                alert("Joined activity!");
                setShowModal(false);
              }}
            >
              Join Activity
            </button>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// a pop up for the view details of the activity and joinActivity button

