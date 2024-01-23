import { 
    ColliderLayer, Entity, InputAction, Material, MaterialTransparencyMode, 
    MeshCollider, MeshRenderer, PointerEventType, PointerEvents, TextureUnion, 
    Transform, VisibilityComponent, engine, inputSystem 
} from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { addPmPointerDown } from "../../imports/components/pointer";
import { PBMaterialPbr } from "../../utils";

export type ActivateOptions = {
    position: Vector3.MutableVector3,
    scale: Vector3,
    parent: Entity,
    imgIndex: number,
    clickCallback: (face: Entity, index: number) => void
}

const faces: Entity[] = []
const colliders: Entity[] = []
var highlightGreen: Entity = null
var highlightRed: Entity = null
var currentGreen: number = -1
var currentRed: number = -1
var selected: boolean = false
const imgIndexes: number[] = []
const active: boolean[] = []
const clickCallbacks: ((face: Entity, index: number) => void)[] = []
const textures: TextureUnion[] = []

export function createFace() {
    const face = engine.addEntity()
    Transform.create(face, {
        position: Vector3.Zero(),
        scale: Vector3.One(),
    })
    VisibilityComponent.create(face, { visible: false })
    MeshRenderer.setPlane(face)

    const collider = engine.addEntity()
    Transform.create(collider, {
        position: Vector3.Zero(),
        scale: Vector3.create(0.6, 0.6, 0.1),
        parent: face
    })
    //MeshRenderer.setSphere(collider)
    MeshCollider.setSphere(collider, ColliderLayer.CL_POINTER)

    const index = faces.length
    faces.push(face)
    colliders.push(collider)
    imgIndexes.push(-1)
    active.push(false)

    addPmPointerDown(collider, {
        button: InputAction.IA_POINTER,
        hoverText: " ",
        maxDistance: 14,
        cb: () => {
            if(!active[index]) return;

            if(clickCallbacks[index]) clickCallbacks[index](face, index)
        }
    })
    
    PointerEvents.createOrReplace(collider, {
        pointerEvents: [
            ...PointerEvents.get(collider).pointerEvents,
            {
                eventType: PointerEventType.PET_HOVER_ENTER,
                eventInfo: {
                    button: InputAction.IA_POINTER,
                    maxDistance: 14
                }
            }
        ]
    })

    //Debug
    //Material.setPbrMaterial(face, {  albedoColor: randomColor4() })
    /*const colliderDebug = engine.addEntity()
    Transform.create(colliderDebug, {
        position: Vector3.create(0,0,0),
        scale: Vector3.create(1, 1, 1),
        parent: collider
    })
    MeshRenderer.setSphere(colliderDebug)
    Material.setPbrMaterial(colliderDebug, {
        albedoColor: Color4.create(0,0,0,0.5),
    })*/

    return index
}

export function activateFace(index: number, options: ActivateOptions) {
    
    Transform.getMutable(faces[index]).parent = options.parent
    Transform.getMutable(faces[index]).scale = options.scale
    options.position.z = options.position.z - Math.random() * 0.001 + Math.random() * 0.001 - Math.random() * 0.001 + Math.random() * 0.001
    Transform.getMutable(faces[index]).position = options.position

    VisibilityComponent.getMutable(faces[index]).visible = true
    MeshCollider.getMutable(colliders[index]).collisionMask = ColliderLayer.CL_POINTER
    
    imgIndexes[index] = options.imgIndex
    Material.setBasicMaterial(faces[index], {
        texture: getOrCreateTexture(options.imgIndex),
    })
    
    clickCallbacks[index] = options.clickCallback
    active[index] = true
}

export function deactivateFace(index: number) {
    VisibilityComponent.getMutable(faces[index]).visible = false
    MeshCollider.getMutable(colliders[index]).collisionMask = ColliderLayer.CL_NONE
    active[index] = false
}

export function destroyAll() {
    for(let i = 0; i < faces.length; i++) {
        deactivateFace(i)
        engine.removeEntity(faces[i])
        engine.removeEntity(colliders[i])
    }
    if(highlightGreen) engine.removeEntity(highlightGreen)
    if(highlightRed) engine.removeEntity(highlightRed)
    faces.length = 0
    colliders.length = 0
    imgIndexes.length = 0
    active.length = 0
    clickCallbacks.length = 0

}

function getImageSrc(imgIndex: number) {
    return "https://storage.lowpoly3d.com/avatargarden/wanted/LINEStickers_100Avatars_"+((imgIndex < 10)? "0"+imgIndex : imgIndex)+".png"
}

export function getOrCreateTexture(imgIndex: number) {
    if(textures[imgIndex]) return textures[imgIndex]

    textures[imgIndex] = Material.Texture.Common({
        src: getImageSrc(imgIndex)
    })
    return textures[imgIndex]
}

export function setHighlightRed(index: number, bHighlight: boolean) {

    if(!highlightRed) {
        highlightRed = engine.addEntity()
        Transform.create(highlightRed, {
            position: Vector3.create(0,0,0.0001),
            scale: Vector3.create(1.2, 1.2, 1),
        })
        MeshRenderer.setPlane(highlightRed)
        VisibilityComponent.create(highlightRed, { visible: bHighlight })

        Material.setPbrMaterial(highlightRed, {
            texture: getOrCreateTexture(imgIndexes[index]),
            transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
            albedoColor: Color4.Red(),
            emissiveColor: Color4.Red(),
            emissiveIntensity: 0.5,
        })
    }

    if(VisibilityComponent.get(highlightRed).visible != bHighlight) VisibilityComponent.getMutable(highlightRed).visible = bHighlight

    if(!bHighlight) {
        currentRed = -1
        return;
    }

    currentRed = index
    Transform.getMutable(highlightRed).parent = faces[index]
    Transform.getMutable(highlightRed).position = Vector3.create(0,0,0.0001);
    
    (Material.getMutable(highlightRed).material as PBMaterialPbr).pbr.texture = getOrCreateTexture(imgIndexes[index])
}

export function setHighlightGreen(index: number, bHighlight: boolean) {
    if(!highlightGreen) {
        highlightGreen = engine.addEntity()
        Transform.create(highlightGreen, {
            position: Vector3.create(0,0,0.0001),
            scale: Vector3.create(1.2, 1.2, 1),
        })
        MeshRenderer.setPlane(highlightGreen)
        VisibilityComponent.create(highlightGreen, { visible: bHighlight })

        Material.setPbrMaterial(highlightGreen, {
            texture: getOrCreateTexture(imgIndexes[index]),
            transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
            albedoColor: Color4.Green(),
            emissiveColor: Color4.Green(),
            emissiveIntensity: 0.5,
        })
    }

    if(VisibilityComponent.get(highlightGreen).visible != bHighlight) VisibilityComponent.getMutable(highlightGreen).visible = bHighlight

    if(!bHighlight) {
        currentGreen = -1
        return;
    }

    currentGreen = index
    Transform.getMutable(highlightGreen).parent = faces[index]
    Transform.getMutable(highlightGreen).position = Vector3.create(0,0,0.0001);
    
    (Material.getMutable(highlightGreen).material as PBMaterialPbr).pbr.texture = getOrCreateTexture(imgIndexes[index])
}

export function getPosition(index: number) {
    return Transform.get(faces[index]).position
}

export function disableGreenHighlight() {
    if(currentGreen < 0) return;
    setHighlightGreen(currentGreen, false)
}

export function disableRedHighlight() {
    if(currentRed < 0) return;
    setHighlightRed(currentRed, false)
}

export function setSelected(bSelected: boolean) {
    selected = bSelected
}

var systemEnabled = false
export function enableHoverSystem() {
    if(systemEnabled) return;
    systemEnabled = true
    engine.addSystem(hoverSystem)
}

function hoverSystem() {
    if(selected) return;
    for(let i = 0; i < faces.length; i++) {
        if(!active[i]) continue;
        
        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, colliders[i])) {
            setHighlightGreen(i, true)
        }
    }
}