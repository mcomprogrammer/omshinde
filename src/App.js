import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Learn from './components/Learn';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Videos from './components/Videos';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const username = JSON.parse(localStorage.getItem('loggedInUser'))?.name;
  return username ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/learn" />} /> {/* Default route */}
        
        {/* Protected routes */}
        <Route path="/learn" element={<ProtectedRoute element={<Learn />} />} />
        <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/videos" element={<ProtectedRoute element={<Videos />} />} /> {/* Videos route */}
        
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
