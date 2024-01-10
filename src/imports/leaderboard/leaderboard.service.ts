import { URL_SERVER } from "../services/env";
import { UserData } from "../user/user.data";
import { getLeaderboardConfig, getLeaderboardData } from "./leaderboard.data";
import { http } from "../services/http.service";
import { ScoreResonse, SendScoreBody } from "./leaderboard.schema";
import { loginWithDcl } from "../user/login.service";
import { CaptchaService } from "../captcha/captcha.service";

const LEADERBOARD_URL: string = URL_SERVER + "/leaderboard"
const pendingRequest: Record<string, boolean> = {}

export function isPendingRequest(name: string){
    return pendingRequest[name]
}

function setPendingRequest(name: string, value: boolean){
    pendingRequest[name] = value
}

export async function requestScoreList(name: string, newpage: number, callback = function(){}, fail = function(){}){

    //Leaderboard not configured
    const config = getLeaderboardConfig(name)
    if (!config) throw new Error("Leaderboard "+name+" not configured");

    //Request allready in progress
    if (isPendingRequest(name)) return;

    const scoreData = getLeaderboardData(name)
    //Page out of bounds
    if (newpage<0 || newpage>=scoreData.nPages) return;

    //Block new request as long as this request is in progress
    setPendingRequest(name, true)
    scoreData.page = newpage

    try {

        let query = "name="+config.NAME+"&skip="+(scoreData.page*config.LIMIT)+"&limit="+config.LIMIT

        if (config.REQUEST_MY_SCORE) {
            if (!UserData.instance().getWallet()) {
                await UserData.instance().loadUserData()
            }

            if (UserData.instance().getWallet()) query = query + "&wallet=" + UserData.instance().getWallet()
        }

        const response = await http.signedGet(LEADERBOARD_URL+"/getScores?"+query)
        if(!response.ok) throw new Error(response.statusText)

        const data: ScoreResonse = JSON.parse(response.body)
        if(!data.scores) throw new Error("Invalid response")

        scoreData.scores = data.scores
        scoreData.totalScores = data.totalScores
        scoreData.scoreSort = data.scoreSort
        scoreData.nPages = Math.ceil(scoreData.totalScores/config.LIMIT)

        if(data.myScore) {
            scoreData.myScore = data.myScore.score
            scoreData.myPos = data.myScore.position
        }

        setPendingRequest(name, false)
        callback()
        console.log("Recived leaderboard "+name+" data")
        console.log(getLeaderboardData(name));

    }
    catch (error) {
        setPendingRequest(name, false)
        console.log("failed to reach URL")
        console.log(error);
        if(fail) fail()
    }
}


export async function sendScoreRequest(name: string, newScore: {score?: number, time?: number, isWin?: boolean}, callback = function(){}){
    //Leaderboard not configured
    const config = getLeaderboardConfig(name)
    if (!config) {
        throw new Error("Leaderboard "+name+" not configured")
    }

    try {

        if (!UserData.instance().userIsAuth()) {
            await loginWithDcl()
            if (!UserData.instance().userIsAuth()) {
                throw new Error("Fail login")
            }
        }

        const body: SendScoreBody = {
            leaderboard: config.NAME,
            wallet: UserData.instance().getWallet(),
            username: UserData.instance().getDclName()
        }

        if (newScore.hasOwnProperty("score")) {
            body.score = newScore.score
        }
        if (newScore.hasOwnProperty("time")) {
            body.time = newScore.time
        }
        if (newScore.hasOwnProperty("isWin")) {
            body.isWin = newScore.isWin
        }

        const response = await http.signedPost(
            LEADERBOARD_URL+"/addScore",
            body,
            UserData.instance().getAccessToken()
        )

        const data = JSON.parse(response.body)

        if (response.ok) {
            callback()
            return;
        }

        if (data.captcha) {
            
            CaptchaService.onSuccessSolveCB = async () => {
                sendScoreRequest(name, newScore, callback)
            }
            CaptchaService.setCurrentCaptcha(data.captcha)
               
        }
        
        throw new Error(data.message)  
    } 
    catch (error) {
        console.log("failed to reach URL")
        console.error(error?.message || error);
    }


}