import React, { useState } from 'react';
import '../src/App.css';
import {QuestionCard } from './component/QuestionCard';
import { fetchQuestion, diffculty, QuestionState } from './API/API';


const TOTAL_RECORDS = 10;

type AnswerObject = {
  question: string,
  answer : string,
  correct: boolean,
  correctAnswer: string
}

function App() {

  const [Loading, setLoading] = useState<boolean>(false);
  const [number, setnumber] = useState<number>(0);
  const [Questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setuserAnswers] = useState<AnswerObject[]>([]);
  const [score, setscore] = useState<number>(0);
  const [isFinished, setisFinished] = useState<boolean>(true);

  const StartQuiz = async () => {
    setLoading(true);
    setisFinished(false);
    const NewQuestions = await fetchQuestion(TOTAL_RECORDS, diffculty.EASY);
    setQuestions(NewQuestions);
    setscore(0);
    setuserAnswers([]);
    setnumber(0);
    setLoading(false);
  };
  const nextQuestion = () => {
    const newQuestion = number +1;
    if(newQuestion === TOTAL_RECORDS)
      setisFinished(true);
    else
      setnumber(newQuestion);
  };

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
    if(!isFinished)
    {
      const answer = e.currentTarget.value;
      const correct = Questions[number].correct_answer === answer;
      if(correct) setscore(prev => prev +1)
      const AnswerObject = {
        question : Questions[number].question,
        answer,
        correct,
        correctAnswer : Questions[number].correct_answer
      }
      setuserAnswers(prev => [...prev , AnswerObject])
    }
  };
  
  return (
    <div className="quiz">
    <h1 className="react-h1">Quiz App</h1>
    {isFinished || userAnswers.length === TOTAL_RECORDS ? 
    (
      <button className="start" onClick={StartQuiz}>Start Quiz</button>
    ) : null }
    {!isFinished  ? ( <p className="score">Score : {score}</p> ) : null}

    {Loading ?  (<p className="loading">Loading...</p>) : null}

    { !Loading && !isFinished ?   (  
      <div className="card">
    <QuestionCard totalQuestion={TOTAL_RECORDS}
                  callback={checkAnswer}
                  questionNum={number + 1}
                  Question={Questions[number].question}
                  answer = {Questions[number].answers}
                  userAnswer ={userAnswers ? userAnswers[number] : undefined}
     />
     </div>
    ): null}
    { !isFinished && !Loading && userAnswers.length === number + 1 && number !== TOTAL_RECORDS - 1 ?
     (<button className="next" onClick={nextQuestion}>Next</button>) : null}
    
    </div>
      );
}

export default App;
