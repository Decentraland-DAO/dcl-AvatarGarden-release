import { clamp } from "../../utils"
import { clearDelay, delay } from "../delay";
import { RecordStatus } from "./stats.schema";

export type BoothRecordInfo = {
    statsRecord: Record<string, StatRecord>
}

export class StatData {
    private static instanceRef: StatData;
    private constructor() { }
    // Singleton Instance of the Object
    static instance(): StatData { return this.instanceRef || (this.instanceRef = new this()); }

    private boothRecords: Record<string, BoothRecordInfo> = {}

    getStatRecord(boothId: string, statName: string): StatRecord{
        //If record doesn't exist, create idle status record
        if (!this.boothRecords[boothId]){
            this.boothRecords[boothId] = {statsRecord: {}}
        }
        if (!this.boothRecords[boothId].statsRecord[statName]) {
            return this.createStatRecord(boothId, statName)
        }
        return this.boothRecords[boothId].statsRecord[statName]
    }
    
    private createStatRecord( boothId: string, statName: string): StatRecord{
        if (!this.boothRecords[boothId]){
            this.boothRecords[boothId] = {statsRecord: {}}
        }
        
        if (!this.boothRecords[boothId].statsRecord[statName]) {
            this.boothRecords[boothId].statsRecord[statName] = new StatRecord(boothId, statName)
        }
        
        return this.boothRecords[boothId].statsRecord[statName]
        
    }
}

export class StatRecord {
    
    boothId: string
    statName: string
    recordStatus: RecordStatus

    updateInterval?: number
    private remainingTimeFromServer?: number
    private startedIntervalDate?: number
    private bPausedInterval: boolean = false
    private pausedIntervalDate?: number
    private currentIntervalTime?: number
    private currentIntervalCallback?: ((boothId: string, statName: string)=>void)
    private intevalTimeout?: any
    lastRequestDate?: number
    lastResponseDate?: number
    onResponseCallback?: (boothId: string, statName: string) => void
    onIntervalCallback?: (boothId: string, statName: string) => void

    constructor(boothId: string, statName: string) {
        this.boothId = boothId
        this.statName = statName
        this.recordStatus = RecordStatus.IDLE
    }

    setRecordStatus(recordStatus: RecordStatus){
        if (this.recordStatus == RecordStatus.INTERVAL) {
            this.clearRecordInterval()
        }   
        
        this.recordStatus = recordStatus
    }

    startInterval(callback = (boothId: string, statName: string)=>{}){
        this.setRecordStatus(RecordStatus.INTERVAL)
        let time = this.updateInterval || 5000
        if (this.remainingTimeFromServer && this.remainingTimeFromServer > 0) {
            time = this.remainingTimeFromServer
        }
        this.interval(time, callback)
    }

    continueInterval(){
        if(!this.hasPausedInterval()) return;
        if(this.startedIntervalDate === undefined || this.currentIntervalTime === undefined) return;

        this.bPausedInterval = false
        this.setRecordStatus(RecordStatus.INTERVAL)

        const timePassed = (Date.now() - this.startedIntervalDate)
        const timeLeft = this.currentIntervalTime - timePassed
        const time = clamp(timeLeft, 10, this.currentIntervalTime)
        
        this.interval(time, this.currentIntervalCallback)
    }

    stopInterval(){
        if (this.recordStatus != RecordStatus.INTERVAL) {
            return;
        }
        this.bPausedInterval = false
        this.pausedIntervalDate = undefined
        this.currentIntervalTime = undefined
        this.currentIntervalCallback = undefined
        this.setRecordStatus(RecordStatus.IDLE)
        
    }

    pauseInterval(){
        if (this.recordStatus != RecordStatus.INTERVAL) {
            return;
        }
        this.bPausedInterval = true
        this.pausedIntervalDate = Date.now()
        this.setRecordStatus(RecordStatus.IDLE)
        
    }

    private interval(time: number, callback = (boothId: string, statName: string)=>{}){
        this.startedIntervalDate = Date.now()
        this.bPausedInterval = false
        this.pausedIntervalDate = undefined
        this.currentIntervalTime = time
        this.currentIntervalCallback = callback
        console.log("stat delay", this.boothId, this.statName, time)
        this.intevalTimeout = delay(() => {
   
            this.setRecordStatus(RecordStatus.IDLE)

            if (this.onIntervalCallback) this.onIntervalCallback(this.boothId, this.statName)
            
            if(this.currentIntervalCallback) this.currentIntervalCallback(this.boothId, this.statName)
        }, time)
    }

    ovewriteCurrentIntervalCallback(callback: (boothId: string, statName: string)=>void){
        this.currentIntervalCallback = callback
    }

    hasPausedInterval(): boolean{
        return this.recordStatus != RecordStatus.INTERVAL && this.bPausedInterval
    }

    clearRecordInterval(){
        if (this.intevalTimeout) {
            clearDelay(this.intevalTimeout)
            this.intevalTimeout = null
        }
    }

    setRemainingTimeFromServer(time: number){
        this.remainingTimeFromServer = time
    }
    getRemainingTimeFromServer(): number | undefined{
        return this.remainingTimeFromServer
    }

}