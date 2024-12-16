const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL username
  password: 'pranav', // Update with your MySQL password
  database: 'education_app', // Update with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Routes
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password, score) VALUES (?, ?, ?, 0)';
  db.query(query, [name, email, password], (err) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ success: false, message: 'Registration failed.' });
    }
    res.status(201).json({ success: true, message: 'User registered successfully.' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ success: false, message: 'Login failed.' });
    }
    if (results.length > 0) {
      res.status(200).json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  });
});

app.get('/leaderboard', (req, res) => {
  const query = 'SELECT name, score FROM users ORDER BY score DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching leaderboard:', err);
      return res.status(500).json({ success: false, message: 'Database query failed.' });
    }
    res.status(200).json(results);
  });
});

// Serve React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
