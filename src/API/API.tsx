export enum diffculty  {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category : string,
    correct_answer : string,
    difficulty: string,
    incorrect_answers : string[],
    question: string,
    type: string
}

export type QuestionState = Question & {answers : string[]}

export const fetchQuestion = async(number : number , diffcultyLevel : diffculty ) => {
    const url = `https://opentdb.com/api.php?amount=${number}&difficulty=${diffcultyLevel}&type=multiple`;
    const data = await ( await fetch(url)).json();
    return data.results.map((ques : Question) => (
        {
            ...ques,
            answers : shufflee([...ques.incorrect_answers , ques.correct_answer])
        }
    ))
        
}

export const shufflee = (arr : any[]) =>  [...arr].sort(() => Math.random() - 0.5)