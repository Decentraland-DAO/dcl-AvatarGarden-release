import * as http from "../services/http.service";
import * as pmUtils from "../../utils"
import { StatData } from "./stats.data";
import { RecordStatus } from "./stats.schema";
import { URL_STATS_SERVER } from "../services/env";
import { UserData } from "../user/user.data";


type ServerStatRecordDto = {
    boothId: string,
    statName: string,
    userId: string,
    username: string,
    wallet?: string,
}

const SIGN_URL: string = URL_STATS_SERVER + "/stats/recordBoothStat"

export async function recordStat(boothId: string, statName: string){

    if (StatData.instance().getStatRecord(boothId, statName).recordStatus == RecordStatus.WAIT_RES) {
        return;
    }

    StatData.instance().getStatRecord(boothId, statName).setRecordStatus(RecordStatus.WAIT_RES)

    if (!UserData.instance().getDclUserId()) {
        await UserData.instance().loadUserData()
    }

    const payload: ServerStatRecordDto = {
        boothId: boothId,
        statName: statName,
        userId: UserData.instance().getDclUserId(),
        username: UserData.instance().getDclName(),
    }

    if (UserData.instance().getWallet()) {
        payload.wallet = UserData.instance().getWallet()
    }

    const statRecord = StatData.instance().getStatRecord(boothId, statName)
    statRecord.lastRequestDate = Date.now()
    statRecord.setRemainingTimeFromServer(0)
    
    const response = await http.signedPost(SIGN_URL, payload)

    statRecord.setRecordStatus(RecordStatus.RECIVED_RES)
    statRecord.lastRequestDate = Date.now()

    const data = JSON.parse(response.body)    
    
    if (data.updateInterval){
        statRecord.updateInterval = data.updateInterval
        if(data.remainingTime){
            statRecord.setRemainingTimeFromServer(data.remainingTime)
            console.log("Stat sent before time, wait for next update: ", pmUtils.millisToMinutesAndSecondsAndMilis(data.remainingTime));
        }

        if (statRecord.onResponseCallback){
            statRecord.onResponseCallback(boothId, statName)
        }
    }
    
}