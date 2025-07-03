import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SignUp from './pages/SignUp.jsx';
import TrainerDasboard from './pages/trainerDashboard.jsx';
import StudentDashboard from './pages/studentDashboard.jsx';
import AddActivity from './pages/addActivity.jsx';
import ActivitiesPage from './pages/ActivitiesPage.jsx';
import LoginPage from './pages/login.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities" element={< ActivitiesPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trainer-dashboard" element={<TrainerDasboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
    </>
  );
}
