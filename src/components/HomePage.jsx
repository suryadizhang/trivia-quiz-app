import { useState } from "react";
//useState to state variable in array on requirement its only 2 option variable (category and difficulty) but 
// i added choice of number of question
//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
const HomePage = ({onSubmit}) => {
    const [formData, setFormData] = useState ({
        name: '',
        number: '',
        category: '', 
        difficulty:'', 
        type: 'multiple', // The question - the type will always be multiple choice
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData ({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (
            !formData.name || 
            !formData.number ||
            !formData.category || 
            !formData.difficulty
        ) {
            setError("All fields are required!");
            return;
        }
        if (!formData.type){
            setError('all field are required!');
        } else {
            setError('');
            onSubmit({ ...formData, number: Number(formData.number) });
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1>Welcome To Trivia Quiz</h1>
            <p>Fill out the form to start the quiz</p>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <label htmlFor="name">Name:</label>
            <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <label htmlFor="number">Number Of Questions:</label>
            <select
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
            >
                <option value="">-- Select Number Of Questions --</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>

            <label htmlFor="category">Category:</label>
            <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
            >
                <option value="">-- Select Category --</option>
                <option value="9">General Knowledge</option>
                <option value="20">Mythology</option>
                <option value="21">Sport</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="27">Animal</option>
            </select>

            <label htmlFor="difficulty">Choose Difficulty:</label>
            <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
            >
                <option value="">-- Select Difficulty --</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button type="submit">Start Quiz</button>
        </form>
    );
}
export default HomePage