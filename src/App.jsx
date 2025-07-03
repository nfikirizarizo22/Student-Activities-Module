import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SignUp from './pages/SignUp.jsx';
import TrainerDasboard from './pages/trainerDashboard.jsx';
import AddActivity from './pages/addActivity.jsx';
import LoginPage from './pages/LoginPage.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<TrainerDasboard />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
    </>
  );
}
