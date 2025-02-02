import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const QuizScreen = ({ quizData }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(quizData.duration * 60);
    const navigate = useNavigate();
  
    const handleQuizEnd = useCallback(() => {
      const existingScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      const newScore = {
        date: new Date().toISOString(),
        score,
        totalQuestions: quizData.questions_count,
      };
      localStorage.setItem('quizScores', JSON.stringify([...existingScores, newScore]));
      navigate('/results', { state: { score, totalQuestions: quizData.questions_count } });
    }, [score, quizData.questions_count, navigate]);
  
    useEffect(() => {
      if (timeLeft <= 0) {
        handleQuizEnd();
        return;
      }
  
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft, handleQuizEnd]);
  
    const handleAnswerSelect = (optionId) => {
      setSelectedAnswer(optionId);
      const question = quizData.questions[currentQuestion];
      const isCorrect = question.options.find(
        (opt) => opt.id === optionId
      ).is_correct;
  
      if (isCorrect) {
        setScore((prev) => prev + Number(quizData.correct_answer_marks));
      } else {
        setScore((prev) => prev - Number(quizData.negative_marks));
      }
  
      if (currentQuestion < quizData.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
        }, 1000);
      } else {
        handleQuizEnd();
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6 text-gray-800"
      >
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-semibold">
            Question {currentQuestion + 1}/{quizData.questions_count}
          </span>
          <span className="text-lg">
            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-xl">{quizData.questions[currentQuestion].description}</p>
            <div className="space-y-2">
              {quizData.questions[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedAnswer === option.id
                      ? option.is_correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option.description}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
};

QuizScreen.propTypes = {
    quizData: PropTypes.shape({
      title: PropTypes.string,
      duration: PropTypes.number.isRequired,
      correct_answer_marks: PropTypes.string.isRequired,
      negative_marks: PropTypes.string.isRequired,
      questions_count: PropTypes.number.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          description: PropTypes.string.isRequired,
          options: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              description: PropTypes.string.isRequired,
              is_correct: PropTypes.bool.isRequired
            })
          ).isRequired
        })
      ).isRequired
    }).isRequired
};

export default QuizScreen;