import { useEffect, useState } from "react";

const QuestionForm = ({ number, category, difficulty, onSubmitAnswer }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        fetch(
            `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.results.length > 0) {
                const formattedQuestions = data.results.map(question => ({
                    question: question.question,
                    answers: [...question.incorrect_answers, question.correct_answer].sort(
                        () => Math.random() - 0.5
                    ),
                    correctAnswer: question.correct_answer,
                }));
                setQuestions(formattedQuestions);
                setDataIsLoaded(true);
            } else {
                alert("No questions available");
                setDataIsLoaded(true);
            }
        });
    }, [number, category, difficulty]);

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if all questions are answered
        const unansweredQuestions = questions.filter((_, index) => !answers[index]);
        if (unansweredQuestions.length > 0) {
            setError(`Please answer all questions! (${unansweredQuestions.length} remaining)`);
            return;
        }

        setError('');

        // Calculate results
        const correctAnswers = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
        const results = {
            totalQuestions: questions.length,
            correctAnswers: correctAnswers,
            percentage: Math.round((correctAnswers / questions.length) * 100)
        };

        // Call onSubmitAnswer with results
        onSubmitAnswer(results);
    };

    if (!dataIsLoaded) {
        return (
            <div>
                <h1>Please wait we're still loading the data</h1>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div>
                <h1>No questions available</h1>
            </div>
        );
    }

    return (
        <div>
            <h2>Trivia Quiz</h2>
            <form onSubmit={handleSubmit}>
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} style={{ marginBottom: '2rem' }}>
                        <h3>Question {questionIndex + 1}</h3>
                        <p>{question.question}</p>
                        {question.answers.map((answer, answerIndex) => (
                            <label key={answerIndex} style={{ display: 'block', margin: '0.5rem 0' }}>
                                <input
                                    type="radio"
                                    name={`question-${questionIndex}`}
                                    value={answer}
                                    onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                                    checked={answers[questionIndex] === answer}
                                />
                                {answer}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit All Answers</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
        </div>
    );
};

export default QuestionForm;
