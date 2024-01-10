import { PmPointer, addPmPointerDown } from "../components/pointer";
import { StatData } from "./stats.data";
import { RecordStatus, StatEventType } from "./stats.schema";
import { recordStat } from "./stats.service";
import { Entity, InputAction } from "@dcl/ecs";
import * as utils from '@dcl-sdk/utils'
import { addPmTrigger, addTriggerOnEnterCallback, addTriggerOnExitCallback, hasPmTrigger } from "../components/trigger";
import { Transform } from "@dcl/sdk/ecs";

export interface IStatEvent {
    entity: Entity
    boothId: string;
    statName: string;
    type: StatEventType;
    bActiveExec: boolean;
    eventTrigger?: StatEventTrigger;
    exec(): void
    stop(): void
    pause(): void
}

export class StatEventInteraction implements IStatEvent {
    entity: Entity
    boothId: string;
    statName: string;
    readonly type: StatEventType = StatEventType.INTERACT;
    bActiveExec: boolean = false;
    pmPointer: PmPointer;

    constructor(entity: Entity, boothId: string, statName: string){
        this.entity = entity;
        this.boothId = boothId;
        this.statName = statName;
        this.bActiveExec = true;

        this.pmPointer = addPmPointerDown(this.entity, {
            cb: ()=>{this.exec()}
        })
    }
    exec(){
        if (!this.bActiveExec) return;

        StatManager.instance().initStatRecordCooldown(this.boothId, this.statName);
    }
    stop(){}
    pause(){}

}

export class StatEventTrigger implements IStatEvent {
    entity: Entity
    boothId: string;
    statName: string;
    readonly type: StatEventType = StatEventType.TRIGGER;
    eventTrigger: StatEventTrigger;
    bActiveExec: boolean = false;
    bPlayerOnTrigger: boolean = false;
    readonly bDebugTrigger: boolean = false;
    constructor(entity: Entity, boothId: string, statName: string){
        this.entity = entity;
        this.boothId = boothId;
        this.statName = statName;
        this.eventTrigger = this;

        this.createTrigger();
    }
    exec(){
        if (!this.bActiveExec) return;

        StatManager.instance().initIntervalStatRecord(this.boothId, this.statName);
    }
    stop(){
        StatManager.instance().stopIntervalStatRecord(this.boothId, this.statName);
    }
    pause(){
        StatManager.instance().pauseIntervalStatRecord(this.boothId, this.statName);
    }
    createTrigger(){
        //Already exist trigger component
        if (this.entity && hasPmTrigger(this.entity)) {
            
            addTriggerOnEnterCallback(this.entity, () => {
                this.bActiveExec = true;
                this.bPlayerOnTrigger = true;
                this.exec();
            })
            addTriggerOnExitCallback(this.entity, () => {
                this.bActiveExec = false;
                this.bPlayerOnTrigger = false;
                this.pause();
            })
            return
        }

        addPmTrigger(this.entity, {
            layerMask: utils.NO_LAYERS,
            triggeredByMask: utils.LAYER_1,
            area: {type: 'box', scale: Transform.get(this.entity).scale},
            onEnterCallback: () => {
                this.bActiveExec = true;
                this.bPlayerOnTrigger = true;
                this.exec();
            },
            onExitCallback: () => {
                this.bActiveExec = false;
                this.bPlayerOnTrigger = false;
                this.pause();
            },
        })
        
    }
}

export class StatManager {

    private static instanceRef: StatManager;
    private constructor() { }
    // Singleton Instance of the Object
    static instance(): StatManager { return this.instanceRef || (this.instanceRef = new this()); }

    async initIntervalStatRecord(boothId: string, statName: string) {
        
        if (StatData.instance().getStatRecord(boothId, statName).hasPausedInterval()) {
            console.log("Resume interval stat record: ", boothId, statName);
            
            StatData.instance().getStatRecord(boothId, statName).continueInterval()
            return;
        }
        console.log("Init interval stat record: ", boothId, statName)
        this.recursiveIntervalRecord(boothId, statName)
    }

    async stopIntervalStatRecord(boothId: string, statName: string) {
        const record = StatData.instance().getStatRecord(boothId, statName)
        if (record.recordStatus == RecordStatus.INTERVAL) {
            console.log("Stop interval stat record: ", boothId, statName)
            record.stopInterval()
        }
    }

    async pauseIntervalStatRecord(boothId: string, statName: string) {
        const record = StatData.instance().getStatRecord(boothId, statName)
        if (record.recordStatus == RecordStatus.INTERVAL) {
            console.log("Pause interval stat record: ", boothId, statName)
            record.pauseInterval()
        }
    }

    private async recursiveIntervalRecord(boothId: string, statName: string) {
        if (StatData.instance().getStatRecord(boothId, statName).recordStatus != RecordStatus.IDLE) {
            return
        }

        console.log("Record Stat")
        
        await recordStat(boothId, statName)
        const record = StatData.instance().getStatRecord(boothId, statName)
        console.log("recordStat response: ", record)
        if (record.updateInterval) {
            record.startInterval(function(boothId: string, statName: string) {
                console.log("Recursive Record Stat")
                StatManager.instance().recursiveIntervalRecord(boothId, statName)
            })
        }
    }

    async initStatRecordCooldown(boothId: string, statName: string) {
        if (StatData.instance().getStatRecord(boothId, statName).recordStatus != RecordStatus.IDLE) {
            this.addStatRecordWhenCooldownEnds(boothId, statName)
            return
        }
        console.log("Init stat record cooldown: ", boothId, statName);
        
        this.sendStatRecordCooldown(boothId, statName)
    }

    private async sendStatRecordCooldown(boothId: string, statName: string) {

        if (StatData.instance().getStatRecord(boothId, statName).recordStatus != RecordStatus.IDLE) {
            return
        }
        console.log("Record Stat")
        await recordStat(boothId, statName)
        const record = StatData.instance().getStatRecord(boothId, statName)
        console.log("recordStat response: ", record)
        if (record.updateInterval) {

            record.startInterval((boothId: string, statName: string) => {})

            if (record.getRemainingTimeFromServer()) {
                this.addStatRecordWhenCooldownEnds(boothId, statName)
            }
        }
    }

    private addStatRecordWhenCooldownEnds(boothId: string, statName: string){
        console.log("Record in cooldown, saved for sending when cooldown ends", boothId, statName)
        StatData.instance().getStatRecord(boothId, statName).ovewriteCurrentIntervalCallback((boothId: string, statName: string) => {
            StatManager.instance().sendStatRecordCooldown(boothId, statName)
        })
    }
        
}