import { engine, Transform } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { getLeaderboardData } from "../../imports/leaderboard/leaderboard.data"
import { requestScoreList, sendScoreRequest } from "../../imports/leaderboard/leaderboard.service"
import { randomIntFromInterval } from "../../utils"
import { Wanted } from "../wanted/wanted"
import { movePlayerTo } from "~system/RestrictedActions"
import { minigames_floor, panel_objective, panel_score, panel_text, panel_timer } from "../tags"
import { UserData } from "../../imports/user/user.data"
import { CardPool } from "../cardsGame/cardPool"
import { getCardList } from "../cardsGame/randomCardGenerator"
import { WakaMole } from "../wakamole/wakaMole"
import { lockFrame, unlockFrame } from "./avatars"
import { CardManager } from "../cardsGame/cardGame.manager"
import { delay } from "../../imports/delay"
import { loadNpcRandomTalk } from "../../NPCs/npcBehaviour"
import { claimWearable } from "../../wearableDispenser/claimWearable"

const UNLOCK_COOLDOWN = 1000 * 60 * 60 * 23 * 1 // ~1 day
//const UNLOCK_COOLDOWN = 1000*60 // ~1 day
export const MAX_INDEX = 100

var lastUnlockTime = 0
var unlockIndex = 0
var wantedGame: Wanted
var seasonPassLoaded = false
var gameIndex = -1
var spawnedGame = -1
var inCooldown = false
export async function loadSeasonPass() {

    if (!UserData.instance().getWallet()) {
        await UserData.instance().loadUserData()
    }
    if (!UserData.instance().getWallet()) {
        seasonPassLoaded = false
        spawnGame()
        return;
    }

    requestScoreList("avatar_garden_season_1", 0, function () {

        unlockIndex = getLeaderboardData("avatar_garden_season_1").myScore?.score?.bestScore || 0
        lastUnlockTime = new Date((getLeaderboardData("avatar_garden_season_1").myScore?.score?.lastTimeUpdated) || 0).getTime()
        checkCooldown()
        startCheckCooldown()
        loaded()
    },
        function () {
            seasonPassLoaded = false
            spawnGame()
        })

}

function loaded() {
    seasonPassLoaded = true
    for (let i = 0; i < MAX_INDEX; i++) {
        if (unlockIndex > i) {
            unlockFrame(i)
        }
        else {
            lockFrame(i)
        }
    }
    spawnGame()

    if (unlockIndex >= 1) {
        //loadNpcRandomTalk()
    }
}

export function getUnlockIndex() {
    return unlockIndex
}

export function isAllUnlocked() {
    return unlockIndex >= MAX_INDEX
}

export function canUnlockNext() {
    return !inCooldown
}

export function isLoaded() {
    return seasonPassLoaded
}

export function getTimeRemaining() {
    if (unlockIndex >= MAX_INDEX) {
        return 0;
    }
    if (lastUnlockTime != 0 && !canUnlockNext()) {
        return Math.max(0, UNLOCK_COOLDOWN - (Date.now() - lastUnlockTime));
    }
    return 0;
}

export function unlockNext() {
    if (unlockIndex >= MAX_INDEX) {
        return;
    }
    if (lastUnlockTime != 0 && Date.now() - lastUnlockTime < UNLOCK_COOLDOWN) {
        console.log("Too soon to unlock next item");

        return;
    }

    sendScoreRequest("avatar_garden_season_1", {
        score: unlockIndex + 1,
    }, () => {
        claimAvatar(unlockIndex)
        loadSeasonPass()
    })
}

export function claimAvatar(index: number) {
    claimWearable("av_" + (index + 1))
}

export function setDailyGameIndex() {
    gameIndex = unlockIndex % 3
    if (canUnlockNext() == false) {
        gameIndex = (unlockIndex - 1) % 3
    }
    if (isAllUnlocked() || !seasonPassLoaded) {
        gameIndex = randomIntFromInterval(0, 2)
    }
}
export function getDailyGameScore() {
    switch (gameIndex) {
        case 0:
            return Wanted.SCORE_TO_UNLOCK_SEASON
        case 1:
            return WakaMole.SCORE_TO_UNLOCK_SEASON
        case 2:
            return CardManager.SCORE_TO_UNLOCK_SEASON
        default:
            return Wanted.SCORE_TO_UNLOCK_SEASON
    }
}
export function getDailyGameCurrentScore() {

    switch (gameIndex) {
        case 0:
            return wantedGame?.getScore()
        case 1:
            return WakaMole.Instance().getScore()
        case 2:
            return CardManager.Instance().getScore()
        default:
            return wantedGame?.getScore()
    }
}

export function isPlaying() {

    switch (gameIndex) {
        case 0:
            return wantedGame?.isPlaying()
        case 1:
            return WakaMole.Instance().isPlaying()
        case 2:
            return CardManager.Instance().isPlaying()
        default:
            return wantedGame?.isPlaying()
    }
}

export function spawnGame() {

    setDailyGameIndex()
    if (spawnedGame == gameIndex) return;
    if (spawnedGame != -1) {
        console.log("------- DESTROY GAME -------");

        destroyGame()
    }
    spawnedGame = gameIndex
    //gameIndex = 2
    switch (gameIndex) {
        case 0:
            wantedGame = new Wanted(minigames_floor, panel_timer, panel_score, panel_objective, panel_text)
            break;
        case 1:
            WakaMole.Instance().loadGame(minigames_floor, panel_timer, panel_score, panel_objective, panel_text)
            break;
        case 2:
            CardManager.Instance().createPanels(panel_timer, panel_score, panel_text)
            getCardList()
            CardPool.Instance().createCardPool()
            break;
        default:
            break;
    }
}

function destroyGame() {
    switch (spawnedGame) {
        case 0:
            wantedGame.destroyGame()
            break;
        case 1:
            WakaMole.Instance().destroyGame()
            break;
        case 2:
            CardManager.Instance().destroyGame()
            break;
        default:
            break;
    }
}

export function teleportToGame() {
    movePlayerTo({ newRelativePosition: Vector3.add(Transform.get(minigames_floor).position, Vector3.create(-4, 1, 4)), cameraTarget: Transform.get(minigames_floor).position })
}

var checkSystemStarted = false
export function startCheckCooldown() {
    if (checkSystemStarted) return;
    checkSystemStarted = true
    checkCooldownInterval()
}

function checkCooldownInterval() {

    checkCooldown()
    delay(() => {
        checkCooldownInterval()
    }, 4000);
}

function checkCooldown() {
    if (lastUnlockTime == 0) {
        inCooldown = false
        return;
    }
    if (Date.now() - lastUnlockTime > UNLOCK_COOLDOWN) {
        console.log("in cooldows false - " + inCooldown);
        if (inCooldown == true) {
            justFinisedCooldown()
        }
        inCooldown = false
        return;
    }
    console.log("in cooldows true " + inCooldown);
    inCooldown = true
}

function justFinisedCooldown() {
    console.log("Just finished cooldown");
    delay(() => {
        loaded()
    }, 1000);
}