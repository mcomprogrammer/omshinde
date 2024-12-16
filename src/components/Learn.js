import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './Learn.css';

// Letter and number sounds mapping
const letterSounds = {
  A: '/sounds/A.mp3',
  B: '/sounds/B.mp3',
  C: '/sounds/C.mp3',
  D: '/sounds/D.mp3',
  E: '/sounds/E.mp3',
  F: '/sounds/F.mp3',
  G: '/sounds/G.mp3',
  H: '/sounds/H.mp3',
  I: '/sounds/I.mp3',
  J: '/sounds/J.mp3',
  K: '/sounds/K.mp3',
  L: '/sounds/L.mp3',
  M: '/sounds/M.mp3',
  N: '/sounds/N.mp3',
  O: '/sounds/O.mp3',
  P: '/sounds/P.mp3',
  Q: '/sounds/Q.mp3',
  R: '/sounds/R.mp3',
  S: '/sounds/S.mp3',
  T: '/sounds/T.mp3',
  U: '/sounds/U.mp3',
  V: '/sounds/V.mp3',
  W: '/sounds/W.mp3',
  X: '/sounds/X.mp3',
  Y: '/sounds/Y.mp3',
  Z: '/sounds/Z.mp3',
};

const numberSounds = {
  1: '/sounds1/1.mp3',
  2: '/sounds1/2.mp3',
  3: '/sounds1/3.mp3',
  4: '/sounds1/4.mp3',
  5: '/sounds1/5.mp3',
  6: '/sounds1/6.mp3',
  7: '/sounds1/7.mp3',
  8: '/sounds1/8.mp3',
  9: '/sounds1/9.mp3',
};

const Learn = () => {
  const navigate = useNavigate();
  const [isLearningLetters, setIsLearningLetters] = useState(true);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('');
  const [sound, setSound] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const username = JSON.parse(localStorage.getItem('loggedInUser'))?.name;

  useEffect(() => {
    // If no user is logged in, redirect to login page
    if (!username) {
      alert('Please log in to access this page.');
      navigate('/login');
    }
  }, [navigate, username]);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const numbers = '123456789'.split('');

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const updateLeaderboard = (updatedScore) => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Update or add the user's score
    const updatedLeaderboard = leaderboard.filter((entry) => entry.username !== username);
    updatedLeaderboard.push({ username, score: updatedScore });

    // Sort leaderboard by score descending
    updatedLeaderboard.sort((a, b) => b.score - a.score);

    // Save updated leaderboard to localStorage
    saveToLocalStorage('leaderboard', updatedLeaderboard);

    // Dispatch event to notify other components
    const event = new Event('leaderboardUpdate');
    window.dispatchEvent(event);
  };

  const loadUserScore = () => {
    const userScores = JSON.parse(localStorage.getItem('userScores')) || {};
    return userScores[username] || 0;
  };

  const saveUserScore = (newScore) => {
    const userScores = JSON.parse(localStorage.getItem('userScores')) || {};
    userScores[username] = newScore;
    saveToLocalStorage('userScores', userScores);
    updateLeaderboard(newScore);
  };

  const resetState = () => {
    setUserInput('');
    setLastCorrectAnswer('');
    const initialScore = 0;
    setScore(initialScore);
    setQuestion('');
    setIsSubmitDisabled(false);
    saveUserScore(initialScore);
  };

  const switchToLetters = () => {
    setIsLearningLetters(true);
    saveToLocalStorage('isLearningLetters', true);
    resetState();
  };

  const switchToNumbers = () => {
    setIsLearningLetters(false);
    saveToLocalStorage('isLearningLetters', false);
    resetState();
  };

  const nextQuestion = () => {
    const next = isLearningLetters
      ? shuffleArray(letters)[0]
      : shuffleArray(numbers)[0];
    setQuestion(next);
    setSound(new Audio(isLearningLetters ? letterSounds[next] : numberSounds[next]));
    setUserInput('');
    setLastCorrectAnswer('');
    setIsSubmitDisabled(false);
  };

  const checkAnswer = () => {
    const correctAnswer = question.toUpperCase();
    setLastCorrectAnswer(correctAnswer);

    let newScore = score;
    if (userInput.toUpperCase() === correctAnswer) {
      newScore += 1;
    } else {
      newScore -= 1;
    }

    setScore(newScore);
    saveUserScore(newScore);
    setIsSubmitDisabled(true);
  };

  const playSound = () => {
    if (sound) sound.play();
  };

  useEffect(() => {
    const userScore = loadUserScore();
    setScore(userScore);
    nextQuestion();
  }, [isLearningLetters]);

  return (
    <div className="learn-container">
      <div className="learn-content">
        <h2>{isLearningLetters ? 'Learning Letters' : 'Learning Numbers'}</h2>

        <button className="play-sound-button" onClick={playSound}>
          Play Sound
        </button>

        <div className="switch-buttons">
          <button className="switch-btn" onClick={switchToLetters}>
            Switch to Letters
          </button>
          <button className="switch-btn" onClick={switchToNumbers}>
            Switch to Numbers
          </button>
        </div>

        <div className="input-section">
          <input
            type="text"
            value={userInput}
            placeholder="Enter the letter or number"
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isSubmitDisabled}
          />
          <button onClick={checkAnswer} disabled={isSubmitDisabled}>
            Submit
          </button>
        </div>

        {lastCorrectAnswer && isSubmitDisabled && (
          <p className="correct-answer">
            Correct Answer: <strong>{lastCorrectAnswer}</strong>
          </p>
        )}

        <h3>Score: {score}</h3>

        <button onClick={nextQuestion} className="next-question-button">
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Learn;
