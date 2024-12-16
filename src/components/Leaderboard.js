import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const username = JSON.parse(localStorage.getItem('loggedInUser'))?.name;

  useEffect(() => {
    // If no user is logged in, redirect to login page
    if (!username) {
      alert('Please log in to access this page.');
      navigate('/login');
    } else {
      // Load leaderboard from local storage
      const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
      setLeaderboard(leaderboardData);
    }
  }, [navigate, username]);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <h2>Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p>No scores available.</p>
        ) : (
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={index}>
                {index + 1}. {entry.username}: {entry.score}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
