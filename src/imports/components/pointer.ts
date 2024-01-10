import { 
    Entity, EventSystemCallback, EventSystemOptions, ISchema, InputAction, MapComponentDefinition, 
    MapResult, PBPointerEventsResult, PointerEvents, Schemas, engine, pointerEventsSystem 
} from "@dcl/ecs";

// Component
const PmPointerSchema = {
    index: Schemas.Int,
}

type PmPointerComponent = MapComponentDefinition<MapResult<{
    index: ISchema<number>;
}>>

const PmPointerDownComponent: PmPointerComponent = engine.defineComponent('pmPointerDown', PmPointerSchema)
const PmPointerUpComponent: PmPointerComponent = engine.defineComponent('pmPointerUp', PmPointerSchema)

export type PmPointer = {
    index: number,
    callbacks: EventSystemCallback[],
    options: EventSystemOptions,
    eventsTriggered: number,
}

const pmPointerList: {
    onPointerDownList: PmPointer[],
    onPointerUpList: PmPointer[],
    onPointerHoverEnterList: PmPointer[],
    onPointerHoverExitList: PmPointer[],
} = {
    onPointerDownList: [],
    onPointerUpList: [],
    onPointerHoverEnterList: [],
    onPointerHoverExitList: [],
}

export type PmPointerOptions = Partial<EventSystemOptions> & {
    cb: EventSystemCallback,
}

export function addPmPointerDown(entity: Entity, options: PmPointerOptions) : PmPointer{

    const existingPointer = PointerEvents.getOrNull(entity)?.pointerEvents[0]?.eventInfo
    if (existingPointer) {
        if(!options.button) options.button = existingPointer.button
        if(!options.maxDistance) options.maxDistance = existingPointer.maxDistance
        if(!options.hoverText) options.hoverText = existingPointer.hoverText
    }

    const pointer = getOrCreatePmPointer(PmPointerDownComponent, pmPointerList.onPointerDownList, entity, {
        button: (options.button || InputAction.IA_ANY),
        ...options
    })
    
    pointer.callbacks.push(options.cb)

    pointerEventsSystem.onPointerDown(
        {
            entity: entity,
            opts: options
        }, 
        createPmPointerCallback(pointer)
    )
    return pointer
}

export function addPmPointerUp(entity: Entity, options: PmPointerOptions){

    const pointer = getOrCreatePmPointer(PmPointerUpComponent, pmPointerList.onPointerUpList, entity, {
        button: (options.button || InputAction.IA_ANY),
        ...options
    })

    pointer.callbacks.push(options.cb)
    pointerEventsSystem.onPointerUp(
        {
            entity: entity,
            opts: options
        }, 
        createPmPointerCallback(pointer)
    )
}

export function removePmPointerDown(entity: Entity){
    const pointer = getPmPointerOrNull(PmPointerDownComponent, pmPointerList.onPointerDownList, entity)
    if (!pointer) return;

    pointer.callbacks = []
    pointerEventsSystem.removeOnPointerDown(entity)
}

export function removePmPointerUp(entity: Entity){
    const pointer = getPmPointerOrNull(PmPointerUpComponent, pmPointerList.onPointerUpList, entity)
    if (!pointer) return;

    pointer.callbacks = []
    pointerEventsSystem.removeOnPointerUp(entity)
}

export function hasPmPointerDown(entity: Entity): boolean{
    const pointer = getPmPointerOrNull(PmPointerDownComponent, pmPointerList.onPointerDownList, entity)
    if(pointer && pointer.callbacks.length > 0) {
        return true
    }
    return false
}
export function hasPmPointerUp(entity: Entity): boolean{
    const pointer = getPmPointerOrNull(PmPointerUpComponent, pmPointerList.onPointerUpList, entity)
    if(pointer && pointer.callbacks.length > 0) {
        return true
    }
    return false
}

function getOrCreatePmPointer(component: PmPointerComponent, pointerList: PmPointer[], entity: Entity, options: EventSystemOptions): PmPointer{
    try {
        return pointerList[component.get(entity).index]
    }
    catch (error) {}

    return createPmPointer(component, pointerList, entity, options)
}

function getPmPointerOrNull(component: PmPointerComponent, pointerList: PmPointer[], entity: Entity): PmPointer | null{
    try {
        return pointerList[component.get(entity).index]
    }
    catch (error) {
        return null
    }
}

function createPmPointer(component: PmPointerComponent, pointerList: PmPointer[], entity: Entity, options: EventSystemOptions){

    pointerList.push({
        index: pointerList.length,
        callbacks: [],
        options: options,
        eventsTriggered: 0,
    })

    component.create(entity, {
        index: pointerList.length-1
    })

    return pointerList[pointerList.length-1]
}

function createPmPointerCallback(pointer: PmPointer) : (event: PBPointerEventsResult) => void {
    return (event: PBPointerEventsResult) => {
        pointer.eventsTriggered++;
        pointer.callbacks.forEach(cb => {
            cb(event)
        });
    }
}
