import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import StudentLogin from './pages/studentLogin.jsx';
import TrainerLogin from './pages/trainerLogin.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import SignUp from './pages/SignUp.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/trainer-login" element={<TrainerLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} /> 
      <Route path="/signup" element={<SignUp />} /> 
    </Routes>
  );
}
