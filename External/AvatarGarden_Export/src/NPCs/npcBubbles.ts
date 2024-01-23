import { Entity, MeshRenderer, Transform } from "@dcl/sdk/ecs";
import { thoughtBubbles } from "../games/tags";
import { Vector3 } from "@dcl/sdk/math";



export function activateBubble(npc: Entity) {
    const randomBubble = thoughtBubbles[Math.floor(Math.random() * thoughtBubbles.length)]
    if (randomBubble) {
        Transform.getMutable(randomBubble).scale = Vector3.One()
        Transform.getMutable(randomBubble).parent = npc
    }
}

export function deactivateBubbles() {
    thoughtBubbles.forEach(thoughtBubble => {
        if (thoughtBubble) {
            Transform.getMutable(thoughtBubble).scale = Vector3.Zero()
        }
    })
}


