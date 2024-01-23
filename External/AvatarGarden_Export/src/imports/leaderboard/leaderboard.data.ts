import { LeaderboardConfig, ScoreTableData } from "./leaderboard.schema";

export const LEADERBOARD_CONFIG: Record<string, LeaderboardConfig> = {
    avatar_garden_wanted: {
        NAME: "avatar_garden_wanted",
        LIMIT: 13,
        REQUEST_MY_SCORE: true,
        LOAD_ON_START: true,
    },
    avatar_garden_mole: {
        NAME: "avatar_garden_mole",
        LIMIT: 13,
        REQUEST_MY_SCORE: true,
        LOAD_ON_START: true,
    },
    avatar_garden_cards: {
        NAME: "avatar_garden_cards",
        LIMIT: 13,
        REQUEST_MY_SCORE: true,
        LOAD_ON_START: true,
    },
    avatar_garden_season_1: {
        NAME: "avatar_garden_season_1",
        LIMIT: 1,
        REQUEST_MY_SCORE: true,
        LOAD_ON_START: true,
    }
}

const leaderboardData: Record<string, ScoreTableData> = {}

export function getLeaderboardConfig(name: string): LeaderboardConfig {
    return LEADERBOARD_CONFIG[name]
}

export function getLeaderboardNames(): string[] {
    const names: string[] = []
    for (const key in LEADERBOARD_CONFIG) {
        names.push(LEADERBOARD_CONFIG[key].NAME)
    }
    return names
}

export function getLeaderboardData(name: string): ScoreTableData {
    if (!leaderboardData[name]) {
        setDefaultLeaderboardData(name)
    }
    return leaderboardData[name]
}
function setLeaderboardData(name: string, data: ScoreTableData) {
    leaderboardData[name] = data
}

function setDefaultLeaderboardData(name: string) {
    setLeaderboardData(name, {
        name: name,
        totalScores: 0,
        page: 0,
        scoreSort: "",
        nPages: 1,
        scores: [],
    })
}