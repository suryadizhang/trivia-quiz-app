const Results = ({ name, isCorrect, correctAnswer, onRestart}) => {
    return (
        <div>
            <h2>Quiz Results</h2>
            <p>{name}, you {isCorrect ? "Answer is correct!" : "Wrong answer"}</p>
            {!isCorrect && (
                <p>The correct Answer: {correctAnswer}</p>
            )}
            <button onClick={onRestart}>Restart</button>
        </div>
    );
};

export default Results;