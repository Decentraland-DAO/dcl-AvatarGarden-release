import { engine } from "@dcl/sdk/ecs";
import { MoveComponent } from "./movement.component";
import { getClass } from "./movement";


export function movementUpdateSystem(dt: number) {
    for (const [entity] of engine.getEntitiesWith(MoveComponent)) {
        const moveComponent: any = MoveComponent.getMutable(entity)
        if (!moveComponent.bActive) continue
        
        getClass(moveComponent).update(moveComponent, dt)
    }
}