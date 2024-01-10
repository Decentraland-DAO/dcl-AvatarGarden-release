import { Transform, engine } from "@dcl/sdk/ecs";
import { Wanted } from "./wanted/wanted";
import { Vector3 } from "@dcl/sdk/math";


export function spawnTestWanted() {

    const testEntity = engine.addEntity()
    Transform.create(testEntity, {
        position: Vector3.create(4, 1.5, 62),
        scale: Vector3.One(),
    })

    //new Wanted(testEntity)
}
