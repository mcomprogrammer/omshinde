import React, { useState } from 'react';
import './Register.css';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();

    // Fetch existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      alert('This email is already registered.');
    } else {
      // Create a new user object
      const newUser = { name, email, password };

      // Add the new user to the list of users
      users.push(newUser);

      // Save the updated users array to local storage
      localStorage.setItem('users', JSON.stringify(users));

      alert('Registration successful!');
    }
  };

  return (
    <div className="registration">
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
