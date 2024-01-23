import { Vector3 } from "@dcl/sdk/math";
import { LerpMoveComponentType } from "./movement.schema";
import { SimpleMove } from "./simpleMove";
import { Transform } from "@dcl/sdk/ecs";


export class LerpMove extends SimpleMove {
    protected constructor() {
        super()
    }
    static setTarget(component: LerpMoveComponentType, target: Vector3) {
        SimpleMove.setTarget(component, target)
        component.alpha = 0
    }

    static update(component: LerpMoveComponentType, dt: number) {
        if(!component.bInitialized) this.init(component)
        const transform = Transform.getMutable(component.entity)
        
        if (component.bOrientAxisToDirection) {
            this.orientAxisToDirection(component, transform);
        }

        if (component.alpha>=1) {
            transform.position = component.target
            this.reachedTarget(component)
            return;
        }

        transform.position = Vector3.lerp(component.origin, component.target, component.alpha)
        component.alpha += dt * component.speed
    }
}