import { useState } from "react";

const QuestionForm = ({formData, onsubmit}) => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');


}