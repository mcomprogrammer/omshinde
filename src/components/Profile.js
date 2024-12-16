import React, { useState, useEffect } from 'react';

const Profile = () => {
  // Initialize user state from local storage
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('loggedInUser')));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Clear user data from local storage
    setUser(null); // Reset state
    alert('You have been logged out successfully.');
  };

  // Render UI based on user's logged-in state
  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
};

export default Profile;
