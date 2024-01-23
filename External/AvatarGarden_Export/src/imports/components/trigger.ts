import { Entity, ISchema, MapComponentDefinition, MapResult, Schemas, engine } from "@dcl/ecs";
import * as DclTriggers from '@dcl-sdk/utils/dist/trigger'
import { Color3 } from "@dcl/sdk/math";

// Component
const PmTriggerSchema = {
    index: Schemas.Int,
}

type PmTriggerComponentType = MapComponentDefinition<MapResult<{
    index: ISchema<number>;
}>>

const PmTriggerComponent: PmTriggerComponentType = engine.defineComponent('pmTriggerDown', PmTriggerSchema)

export type PmTriggerCallbacks = {
    onEnterCallback?: (entity: Entity) => void,
    onExitCallback?: (entity: Entity) => void,
}

export type PmTriggerOptions = {
    layerMask?: number,
    triggeredByMask?: number,
    area?: DclTriggers.TriggerAreaSpec,
    debugColor?: Color3.ReadonlyColor3,
}

export type PmTrigger = {
    index: number,
    onEnterCallbackArray: ((entity: Entity) => void)[],
    onExitCallbackArray: ((entity: Entity) => void)[],
    bEnabled: boolean,
    options: PmTriggerOptions,
    onEnterTriggered: number,
    onExitTriggered: number,
}

const pmTriggerList: PmTrigger[] = []

export function addPmTrigger(entity: Entity, options: PmTriggerOptions & PmTriggerCallbacks) : PmTrigger{

    if(!options.layerMask) options.layerMask = DclTriggers.NO_LAYERS
    if(!options.triggeredByMask) options.triggeredByMask = DclTriggers.LAYER_1
    if(!options.area) options.area = {type: 'box'}

    const trigger = getOrCreatePmTrigger(entity, options)
    
    if (options.onEnterCallback) {
        trigger.onEnterCallbackArray.push(options.onEnterCallback) 
    }
    if (options.onExitCallback) {
        trigger.onExitCallbackArray.push(options.onExitCallback) 
    }

    DclTriggers.triggers.addTrigger(
        entity,
        options.layerMask,
        options.triggeredByMask,
        [options.area],
        (entity: Entity) => {
            trigger.onEnterTriggered++;
            trigger.onEnterCallbackArray.forEach(cb => {
                cb(entity)
            });
        },
        (entity: Entity) => {
            trigger.onExitTriggered++;
            trigger.onExitCallbackArray.forEach(cb => {
                cb(entity)
            });
        },
        options.debugColor
    )
    
    return trigger
}

export function removePmTrigger(entity: Entity){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.onEnterCallbackArray = []
    pointer.onExitCallbackArray = []
    pointer.bEnabled = false
    DclTriggers.triggers.removeTrigger(entity)
}

export function enablePmTrigger(entity: Entity){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.bEnabled = true
    DclTriggers.triggers.enableTrigger(entity, true)
}

export function disablePmTrigger(entity: Entity){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.bEnabled = false
    DclTriggers.triggers.enableTrigger(entity, false)
}

export function setTriggerDebug(entity: Entity, bDebug: boolean){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    DclTriggers.triggers.enableDebugDraw(bDebug)
}

export function setTriggerLayerMask(entity: Entity, layerMask: number){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.options.layerMask = layerMask
    DclTriggers.triggers.setLayerMask(entity, layerMask)
}

export function setTriggerTriggeredByMask(entity: Entity, triggeredByMask: number){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.options.triggeredByMask = triggeredByMask
    DclTriggers.triggers.setTriggeredByMask(entity, triggeredByMask)
}

export function addTriggerOnEnterCallback(entity: Entity, cb: (entity: Entity) => void){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.onEnterCallbackArray.push(cb)
    DclTriggers.triggers.setOnEnterCallback(entity, (entity: Entity) => {
        pointer.onEnterTriggered++;
        pointer.onEnterCallbackArray.forEach(cb => {
            cb(entity)
        });
    })
}

export function addTriggerOnExitCallback(entity: Entity, cb: (entity: Entity) => void){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.onExitCallbackArray.push(cb)
    DclTriggers.triggers.setOnExitCallback(entity, (entity: Entity) => {
        pointer.onExitTriggered++;
        pointer.onExitCallbackArray.forEach(cb => {
            cb(entity)
        });
    })
}

export function clearTriggerOnEnterCallback(entity: Entity){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.onEnterCallbackArray = []
    DclTriggers.triggers.setOnEnterCallback(entity, ()=>{})
}

export function clearTriggerOnExitCallback(entity: Entity){
    const pointer = getPmTriggerOrNull(entity)
    if (!pointer) return;

    pointer.onExitCallbackArray = []
    DclTriggers.triggers.setOnExitCallback(entity, ()=>{})
}

export function hasPmTrigger(entity: Entity): boolean{
    return PmTriggerComponent.has(entity)
}

function getOrCreatePmTrigger(entity: Entity, options: PmTriggerOptions): PmTrigger{
    try {
        return pmTriggerList[PmTriggerComponent.get(entity).index]
    }
    catch (error) {}

    return createPmPointer(entity, options)
}

function getPmTriggerOrNull(entity: Entity): PmTrigger | null{
    try {
        return pmTriggerList[PmTriggerComponent.get(entity).index]
    }
    catch (error) {
        return null
    }
}

function createPmPointer(entity: Entity, options: PmTriggerOptions){

    const index = pmTriggerList.length

    pmTriggerList.push({
        index: index,
        bEnabled: true,
        onEnterCallbackArray: [],
        onExitCallbackArray: [],
        options: options,
        onEnterTriggered: 0,
        onExitTriggered: 0,
    })

    PmTriggerComponent.create(entity, {
        index: index
    })

    return pmTriggerList[index]
}