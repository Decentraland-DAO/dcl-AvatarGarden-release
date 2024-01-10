import { Entity, Schemas } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math";

export enum MovementType {
    Simple = "Simple",
    Lerp = "Lerp",
    Aceleration = "Aceleration",
    Projectile = "Projectile"
}

export type SimpleMoveComponentType = {
    type: MovementType,
    bInitialized: boolean,
    bActive: boolean,
    target: Vector3,
    origin: Vector3,
    entity: Entity,
    speed: number,
    bOrientAxisToDirection: boolean,
}

export type LerpMoveComponentType = SimpleMoveComponentType & {
    alpha: number,
}

export type AcelerationMoveComponentType = SimpleMoveComponentType & {
    maxSpeed: number,
    speedAlpha: number,
    acceleration: number,
    deceleration: number,
    brakingDistance: number,
}

export const MoveSchema = {
    type: Schemas.EnumString(MovementType, MovementType.Simple),
    bInicialized: Schemas.Boolean,
    bActive: Schemas.Boolean,
    target: Schemas.Vector3,
    origin: Schemas.Vector3,
    entity: Schemas.Entity,
    speed: Schemas.Number,
    bOrientAxisToDirection: Schemas.Boolean,
    alpha: Schemas.Optional(Schemas.Number),
    maxSpeed: Schemas.Optional(Schemas.Number),
    speedAlpha: Schemas.Optional(Schemas.Number),
    acceleration: Schemas.Optional(Schemas.Number),
    deceleration: Schemas.Optional(Schemas.Number),
    brakingDistance: Schemas.Optional(Schemas.Number)
}

export type MoveComponentType = SimpleMoveComponentType | LerpMoveComponentType | AcelerationMoveComponentType