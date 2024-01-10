export type Score = {
    bestScore: number
    bestTime: number
    wins?: number
    tries?: number
    loses?: number
    exp?: number
    lastTimeUpdated: Date
}

export type PlayerScore = {
    wallet: string
    username: string
    score: Score
}

export type ScoreTableData = {
    name: string
    totalScores: number,
    page: number,
    nPages: number,
    scoreSort: string,
    scores: PlayerScore[],
    myScore?: PlayerScore
    myPos?: number
}

export type LeaderboardConfig = {
    readonly NAME: string
    readonly LIMIT: number
    readonly REQUEST_MY_SCORE: boolean
    readonly LOAD_ON_START: boolean
}

export type SendScoreBody = {
    leaderboard: string,
    wallet: string,
    username: string,
    score?: number,
    time?: number,
    isWin?: boolean
}

export type ScoreResonse = {
    scores: PlayerScore[],
    totalScores: number,
    scoreSort: string,
    myScore?: {
        score?: PlayerScore,
        position?: number,
        lastTimeUpdated?: Date
    },
}