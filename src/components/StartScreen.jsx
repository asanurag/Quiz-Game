import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StartScreen = ({ quizData }) => {
  const navigate = useNavigate();

  if (!quizData) {
    return <div>Loading quiz data...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 text-gray-800"
    >
      <h1 className="text-2xl font-bold mb-4">{quizData.title}</h1>
      <div className="space-y-4">
        <p className="text-gray-600">{quizData.description || 'No description available'}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span>Questions:</span>
            <span>{quizData.questions_count}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{quizData.duration} minutes</span>
          </div>
          <div className="flex justify-between">
            <span>Points per correct answer:</span>
            <span>{quizData.correct_answer_marks}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/quiz')}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
};

StartScreen.propTypes = {
  quizData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    questions_count: PropTypes.number,
    duration: PropTypes.number,
    correct_answer_marks: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
            is_correct: PropTypes.bool
          })
        )
      })
    )
  })
};

export default StartScreen;