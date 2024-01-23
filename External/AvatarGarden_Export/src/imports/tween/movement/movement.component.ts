import { Entity, engine } from "@dcl/sdk/ecs";
import { MoveSchema } from "./movement.schema";


export const MoveComponent = engine.defineComponent('moveComponent', MoveSchema)

const callbackMap = new Map<Entity, () => void>()

export function setMovementCallback(entity: Entity, callback: () => void) {
    callbackMap.set(entity, callback)
}

export function removeMovementCallback(entity: Entity) {
    callbackMap.delete(entity)
}

export function getMovementCallback(entity: Entity) {
    return callbackMap.get(entity)
}
