import { useEffect, useState } from "react";
// example from https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/
const QuestionForm = ({ number, category, difficulty, onSubmitAnser }) => {
    const [questionData, setQuestionData] = useState(null);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        //fetch question from api
        //https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
        fetch(
            `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`
        )
        .then((res) => res.json())
        .then((data) => {
            if (data.results.length > 0) {
                const question = data.results[0]; 
                const answers = [...question.incorrect_answers, question.correct_answer].sort(
                    () => Math.random() - 0.5 // Randomize order of answers
                );
                setQuestionData({
                    question: question.question,
                    answers, 
                    correctAnswer: question.correct_answer, 
                });
                setDataIsLoaded(true); // Ensure data is marked as loaded
            } else {
                alert("No question available");
                setDataIsLoaded(true); 
            }
        });
    }, [number, category, difficulty]); // dependency array this runs when this props change

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAnswer){
            setError("Please select an answer!");
            return;
        }
        setError('');
        onSubmitAnser(selectedAnswer === questionData.correctAnswer, questionData.correctAnswer);
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
