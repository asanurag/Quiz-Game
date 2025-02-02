import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const navigate = useNavigate();
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 text-gray-800"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <button
          onClick={() => navigate('/start')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          New Quiz
        </button>
      </div>

      {sortedScores.length === 0 ? (
        <p className="text-center text-gray-600">No scores yet. Be the first to play!</p>
      ) : (
        <div className="space-y-4">
          {sortedScores.map((score, index) => {
            const date = new Date(score.date);
            const percentage = ((score.score / (score.totalQuestions * 4)) * 100).toFixed(1);
            
            return (
              <motion.div
                key={score.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{score.score} points</p>
                    <p className="text-sm text-gray-600">
                      {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600 font-medium">{percentage}%</p>
                    <p className="text-sm text-gray-500">
                      {score.totalQuestions} questions
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Leaderboard;