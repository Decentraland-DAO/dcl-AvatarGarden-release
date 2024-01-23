import { EasingFunction, Entity, Transform, Tween } from "@dcl/ecs";
import { Vector3 } from "@dcl/ecs-math";
import { delay } from "../imports/delay";

var animationActive: boolean = false
var retry: boolean = false

export function despawnAnim(entity: Entity) {
  if (animationActive && !retry) {
    delay(() => {
      retry = true
      despawnAnim(entity)
      return
    }, 1000)
  }
  animationActive = true
  const startScale = Transform.get(entity).scale
  Tween.createOrReplace(entity, {
    mode: Tween.Mode.Scale({
      start: startScale,
      end: Vector3.create(0, 0, 0),
    }),
    duration: 1000,
    easingFunction: EasingFunction.EF_EASEBOUNCE,
  })
}

export function spawnAnim(entity: Entity, scale: Vector3) {
  if (animationActive && !retry) {
    delay(() => {
      retry = true
      spawnAnim(entity, scale)
      return
    }, 1000)
  }
  animationActive = true
  Tween.createOrReplace(entity, {
    mode: Tween.Mode.Scale({
      start: Vector3.create(0, 0, 0),
      end: scale,
    }),
    duration: 1000,
    easingFunction: EasingFunction.EF_EASEBOUNCE,
  })
}