import { Transform } from "@dcl/sdk/ecs";
import { directionVectorBetweenTwoPoints, lerp } from "../../../utils";
import { AcelerationMoveComponentType } from "./movement.schema";
import { SimpleMove } from "./simpleMove";
import { Vector3 } from "@dcl/sdk/math";


export class AcelerateMove extends SimpleMove {
    protected constructor() {
        super()
    }
    static init(component: AcelerationMoveComponentType) {
        component.bInitialized = true
        component.speedAlpha = 0
        component.speed = 0
        component.acceleration = component.acceleration || 0.1
        component.deceleration = component.deceleration || 1
        this.setSpeed(component, component.maxSpeed || 1)
        this.setTarget(component, component.target)
    }
    static setSpeed(component: AcelerationMoveComponentType, speed: number): void {
        component.maxSpeed = speed
        component.brakingDistance = (0 - (component.maxSpeed ^ 2)) / (component.deceleration * -4)
    }
    static activate(component: AcelerationMoveComponentType, speed: number = -1): void {
        if(speed >= 0) {
            AcelerateMove.setSpeed(component, speed)
        }
        else {
            AcelerateMove.setSpeed(component, component.maxSpeed)
        }
        component.bActive = true
        component.speedAlpha = 0
        component.speed = 0
    }
    static deactivate(component: AcelerationMoveComponentType): void {
        SimpleMove.deactivate(component)
        component.speedAlpha = 0
        component.speed = 0
    }

    static update(component: AcelerationMoveComponentType, dt: number): void {
        if(!component.bInitialized) this.init(component)
        const transform = Transform.getMutable(component.entity)
        component.speed = lerp(0, component.maxSpeed, component.speedAlpha)
        
        if (component.speedAlpha <= 0) {
            component.speed = 1
        }
        const moveVector = Vector3.scale(directionVectorBetweenTwoPoints(transform.position, component.target), dt * component.speed)
        if (component.bOrientAxisToDirection) {
            this.orientAxisToDirection(component, transform)
        }
        transform.position = Vector3.add(transform.position, moveVector)

        const distance = Vector3.distance(transform.position, component.target)
        if (distance <= Vector3.length(moveVector)) {
            transform.position = component.target
            this.reachedTarget(component)
            return;
        }

        if (distance <= component.brakingDistance) {
            
            if (component.speedAlpha <= 0.01) {
                component.speedAlpha = 0.01
                return;
            }
        
            component.speedAlpha = distance / component.brakingDistance
            return;

        }

        if (component.speedAlpha < 1) {
            component.speedAlpha = component.speedAlpha + component.acceleration
            if (component.speedAlpha > 1) {
                component.speedAlpha = 1
            }
        }

    }
}