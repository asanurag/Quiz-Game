import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import Leaderboard from './components/Leaderboard';
import { LoadingSpinner } from './components/LoadingSpinner';

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('/api/Uw5CrX');
        setQuizData(response.data);
      } catch {
        setError('Failed to fetch quiz data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/start" />} />
        <Route path="/start" element={<StartScreen quizData={quizData} />} />
        <Route path="/quiz" element={<QuizScreen quizData={quizData} />} />
        <Route path="/results" element={<ResultScreen />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
};

export default App;