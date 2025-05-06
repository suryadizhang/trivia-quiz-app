const Results = ({ name, percentage, correctAnswers, totalQuestions, onRestart }) => {
    
    return (
        <div>
            <h2>Quiz Results</h2>
            <p>{name}, you got {correctAnswers} out of {totalQuestions} questions correct!</p>
            <p>Your score: {percentage}%</p>
            <div style={{ marginTop: '1rem' }}>
                <button onClick={onRestart}>
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default Results;