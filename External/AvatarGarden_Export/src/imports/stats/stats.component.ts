import { Entity, Schemas, engine } from "@dcl/sdk/ecs";
import { StatEventType } from "./stats.schema";
import { IStatEvent, StatEventInteraction, StatEventTrigger } from "./stats";


const StatEventSchema = {
    index: Schemas.Int,
}

const StatEventComponent = engine.defineComponent('statEvent', StatEventSchema)

const statEventList: IStatEvent[] = []


export function createStatEvent(entity: Entity, boothId: string, statName: string, type: StatEventType){

    const found = getPmTriggerOrNull(entity)
    if (found) {
        throw new Error(`Entity ${entity} already has a StatEventComponent`)
    }

    const index = statEventList.length

    switch (type) {
        case StatEventType.TRIGGER:
            statEventList.push(new StatEventTrigger(entity, boothId, statName));
            break;
    
        case StatEventType.INTERACT:
            statEventList.push(new StatEventInteraction(entity, boothId, statName));
            break;
    }

    StatEventComponent.create(entity, {
        index: index
    })

    return statEventList[index]
}

export function execStatEvent(entity: Entity){
    const statEvent = getPmTriggerOrNull(entity)
    if (statEvent) {
        statEvent.exec()
    }
}

export function stopStatEvent(entity: Entity){
    const statEvent = getPmTriggerOrNull(entity)
    if (statEvent) {
        statEvent.stop()
    }
}


function getPmTriggerOrNull(entity: Entity): IStatEvent | null{
    try {
        return statEventList[StatEventComponent.get(entity).index]
    }
    catch (error) {
        return null
    }
}
