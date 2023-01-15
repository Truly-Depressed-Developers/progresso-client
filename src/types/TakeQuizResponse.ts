export type TakeQuizResponse = {
    questions: { id: number, question: string }[],
    answers: {
        [x: number]: { id: number, answer: string }[]
    }
}