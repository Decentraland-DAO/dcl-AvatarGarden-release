import { Entity, engine } from "@dcl/sdk/ecs"
import { MoveComponentType, MoveSchema, MovementType } from "./movement.schema"
import { SimpleMove } from "./simpleMove"
import { LerpMove } from "./lerpMove"
import { AcelerateMove } from "./acelerateMove"
import { Vector3 } from "@dcl/sdk/math"
import { MoveComponent } from "./movement.component"

const classMap = {
    [MovementType.Simple]: SimpleMove,
    [MovementType.Lerp]: LerpMove,
    [MovementType.Aceleration]: AcelerateMove,
    [MovementType.Projectile]: SimpleMove
}

export function activate(entity: Entity, speed: number = -1) {
    const comp: any = MoveComponent.getMutable(entity)
    classMap[comp.type].activate(comp, speed)
}

export function deactivate(entity: Entity) {
    const comp: any = MoveComponent.getMutable(entity)
    classMap[comp.type].deactivate(comp)
}

export function setSpeed(entity: Entity, speed: number) {
    const comp: any = MoveComponent.getMutable(entity)
    classMap[comp.type].setSpeed(comp, speed)
}

export function setTarget(entity: Entity, target: Vector3) {
    const comp: any = MoveComponent.getMutable(entity)
    classMap[comp.type].setTarget(comp, target)
}

export function getClass(component: MoveComponentType) {
    return classMap[component.type]
}

export { setMovementCallback, removeMovementCallback, getMovementCallback } from "./movement.component"