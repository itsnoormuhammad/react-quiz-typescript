import React from 'react'

type Props = {
    Question : string,
    answer : string [],
    callback : any,
    questionNum : number,
    userAnswer : any,
    totalQuestion : number,
}

export const QuestionCard : React.FC<Props> = ( {Question, answer, callback, questionNum, userAnswer, totalQuestion}) => {

    return (
        <div>
            <p>Question : {questionNum} / {totalQuestion}</p>
            <p dangerouslySetInnerHTML={{__html:Question}}/>
            <div>
                {answer.map((answer, i) => (
                    <div 
                    className={"options " + 
                     ( userAnswer && userAnswer.correctAnswer === answer ? 'correct' 
                     : (userAnswer && userAnswer.answer === answer ? 'danger' : 'opt'))}>
                    <button disabled={userAnswer} key={i} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}}/>
                    </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
