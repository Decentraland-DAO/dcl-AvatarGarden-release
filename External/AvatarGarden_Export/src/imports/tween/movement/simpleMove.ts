import { Transform, TransformType } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { SimpleMoveComponentType } from "./movement.schema";
import { directionVectorBetweenTwoPoints } from "../../../utils";
import { getMovementCallback } from "./movement.component";

export class SimpleMove {
    protected constructor() {}
    static init(component: SimpleMoveComponentType) {
        component.bInitialized = true
        this.setSpeed(component, component.speed || 1)
        this.setTarget(component, component.target)
    }
    static activate(component: SimpleMoveComponentType, speed: number = -1) {
        if(speed >= 0) {
            SimpleMove.setSpeed(component, speed)
        }
        component.bActive = true
    }
    static deactivate(component: SimpleMoveComponentType) {
        component.bActive = false
    }
    static setSpeed(component: SimpleMoveComponentType, speed: number) {
        component.speed = speed
    }
    static setTarget(component: SimpleMoveComponentType, target: Vector3) {
        component.target = target
        component.origin = Transform.get(component.entity).position
    }
    static getTarget(component: SimpleMoveComponentType) {
        return component.target
    }
    static update(component: SimpleMoveComponentType, dt: number) {
        if(!component.bInitialized) this.init(component)
        const transform = Transform.getMutable(component.entity)
        const distance = Vector3.scale(directionVectorBetweenTwoPoints(transform.position, component.target), dt * component.speed)
        if (component.bOrientAxisToDirection) {
            this.orientAxisToDirection(component, transform);
        }

        if (Vector3.distance(transform.position, component.target) <= Vector3.length(distance)) {
            transform.position = component.target
            this.reachedTarget(component)
            return;
        }

        transform.position = Vector3.add(transform.position, distance)
    }
    protected static orientAxisToDirection(component: SimpleMoveComponentType, transform: TransformType) {
        transform.rotation = Quaternion.fromLookAt(transform.position, component.target, Vector3.Up())
    }

    protected static reachedTarget(component: SimpleMoveComponentType){
        this.deactivate(component)
        const cb = getMovementCallback(component.entity)
        if(cb) cb();
    }
}