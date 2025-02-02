import { useNavigate, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultScreen = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
  
    if (!state) {
      return <Navigate to="/start" />;
    }
  
    const { score, totalQuestions } = state;
    const percentage = (score / (totalQuestions * 4)) * 100;
  
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 text-gray-800"
      >
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600">{score} points</p>
            <p className="text-gray-600">{percentage.toFixed(1)}% correct</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/leaderboard')}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View Leaderboard
            </button>
            <button
              onClick={() => navigate('/start')}
              className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  };
  
export default ResultScreen;