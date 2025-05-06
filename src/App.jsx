import { useState } from 'react';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import Results from './components/ResultsSection';
import './App.css';

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [result, setResult] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleStartQuiz = (data) => {
    setQuizData(data);
    setResult(null); //reset when start new quiz
  };

  const handleSubmitAnswer = (results) => {
    setResult(results);
  };

  const handleRestart = () => {
    setQuizData(null);
    setResult(null);
  };

  if (result !== null) {
    return (
      <Results
        name={quizData.name}
        correctAnswers={result.correctAnswers}
        totalQuestions={result.totalQuestions}
        onRestart={handleRestart}
        percentage={result.percentage}
      />
    );
  }

  if (quizData) {
    return (
      <QuestionForm
        number={quizData.number}
        category={quizData.category}
        difficulty={quizData.difficulty}
        onSubmitAnswer={handleSubmitAnswer}
      />
    );
  }

  return <HomePage onSubmit={handleStartQuiz} />;
};

export default App;
