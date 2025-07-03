import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import StudentLogin from './pages/login.jsx';
import SignUp from './pages/SignUp.jsx';
import TrainerDasboard from './pages/trainerDashboard.jsx';
import StudentDashboard from './pages/studentDashboard.jsx';
import AddActivity from './pages/addActivity.jsx';
import ActivitiesPage from './pages/ActivitiesPage.jsx';

export default function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities" element={< ActivitiesPage />} /> 
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trainer-dashboard" element={<TrainerDasboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/add-activity" element={<AddActivity />} />
      </Routes>
    </>
  );
}
