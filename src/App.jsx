import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import StudentLogin from './pages/studentLogin.jsx';
import TrainerLogin from './pages/trainerLogin.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import SignUp from './pages/SignUp.jsx';
import TrainerDasboard from './pages/trainerDashboard.jsx';
import AddActivity from './pages/addActivity.jsx';

export default function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/trainer-login" element={<TrainerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trainer-dashboard" element={<TrainerDasboard />} />
        <Route path="/add-activity" element={<AddActivity />} />
      </Routes>
    </>
  );
}
