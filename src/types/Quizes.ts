export type GetQuizesData = {
    description: string,
    data: quizData[]
}

export type quizData = {
    id: number,
    name: string
}