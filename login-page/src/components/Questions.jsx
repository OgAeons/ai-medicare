import React, { useState } from 'react'
import { account } from "../lib/appwriteConfig"
import { Link, useNavigate } from "react-router-dom"

const questions = [
    { id: 1, question: "Who are you?", options: ["Doctor", "Patient"] },
    { id: 2, question: "What is your age?", options: [] }
]

function Questions() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState({})

    const navigate = useNavigate()

    function handleAnswer(answer) {
        setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questions[currentQuestionIndex].question]: answer,
        }))

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }


    function handleSubmit(e) {
        e.preventDefault()
        console.log("Final Answers:", answers)

        account.updatePrefs(answers)
        .then(() => {
            console.log('Preferences updated successfully');
            navigate('/home');
        })
        .catch((error) => {
            console.error('Error updating preferences:', error);
        })
    }

    return (
        <div>
            { currentQuestionIndex < questions.length ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <h2 className='question'>{questions[currentQuestionIndex].question}</h2>
                        {questions[currentQuestionIndex].options.length > 0 ? (
                            questions[currentQuestionIndex].options.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAnswer(option)}
                                    style={{ margin: '5px' }}
                                >
                                    {option}
                                </button>
                            ))
                        ) : (
                            <input
                                type="number"
                                placeholder="Enter your age"
                                onBlur={(e) => handleAnswer(e.target.value)}
                                required
                            />
                        )}
                    </div>
                </form>
            ) : (
                <div>
                    <h2>Thank you for your responses!</h2>
                    <p>Responses:</p>
                    <ul>
                        {Object.entries(answers).map(([question, answer], index) => (
                            <li key={index}>{question}: {answer}</li>
                        ))}
                    </ul>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div>
    )
}

export default Questions