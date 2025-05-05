import { useEffect, useState } from "react";
// example from https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/
const QuestionForm = ({ number, category, difficulty, onSubmitAnswer }) => {
    const [questionData, setQuestionData] = useState(null);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(
            `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`
        )
        .then((res) => res.json())
        .then((data) => {
            if (data.results.length > 0) {
                const question = data.results[0];
                const answers = [...question.incorrect_answers, question.correct_answer].sort(
                    () => Math.random() - 0.5
                );
                setQuestionData({
                    question: question.question,
                    answers,
                    correctAnswer: question.correct_answer,
                });
                setDataIsLoaded(true);
            } else {
                alert("No question available");
                setDataIsLoaded(true);
                return; // Prevent rendering
            }
        });
    }, [number, category, difficulty]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAnswer) {
            setError("Please select an answer!");
            return;
        }
        setError('');
        onSubmitAnswer(selectedAnswer === questionData.correctAnswer, questionData.correctAnswer);
    };
    if (!dataIsLoaded) {
        return(
            <div>
                <h1>Please wait we're still loading the data</h1>
            </div>
        );
    }
    if (!questionData) {
        return (
            <div>
                <h1>No question available</h1>
            </div>
        );
    }
    return (
        <div>
            <h2>Trivia Question </h2>
            <form onSubmit={handleSubmit}>
                <p >{questionData.question}</p>
                {questionData.answers.map((answer, index) => (
                    <label key={index}>
                        <input
                        type="radio"
                        name="answer"
                        value={answer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}/>
                        {answer}
                    </label>
                ))}
                <button type="submit">Submit Answer</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form></div>);};

export default QuestionForm;
