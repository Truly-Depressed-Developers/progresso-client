export type LeaderboardAllSumDataRes = {
    success: string,
    data: LeaderboardAllSumData[]
}

export type LeaderboardAllSumData = {
    username: string,
    points: number
}

export type LeaderboardOneCatDataRes = {
    success: string,
    data: LeaderboardOneCatData[]
}

export type LeaderboardOneCatData = {
    username: string,
    points: number,
    skill_id: number,
    skill_name: string
}

export type categoriesDataRes = {
    description: string,
    data: categoriesData[]
}

export type categoriesData = {
    id: number,
    name: string
}