import { ColliderLayer, Entity, GltfContainer, InputAction, Material, MaterialTransparencyMode, MeshCollider, MeshRenderer, Transform, engine } from "@dcl/sdk/ecs";
import { avatar_claim, avatar_frame, avatar_preview, showcase } from "../tags";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { addPmPointerDown, hasPmPointerDown, removePmPointerDown } from "../../imports/components/pointer";
import { claimWearable } from "../../wearableDispenser/claimWearable";
import { delay } from "../../imports/delay";
import { addDebugPivot } from "../../imports/components/debugPivot";
import { canUnlockNext, claimAvatar, getUnlockIndex, teleportToGame } from "./seasonpass";

const avatarShowcase: Entity = engine.addEntity();
const frames: Entity[] = []
const backgrouds: Entity[] = []

const BACKGROUND_COLOR = Color4.fromInts(99,151,242,255)
//const BACKGROUND_COLOR_LOCK = Color4.fromInts(61,133,230,255)

export function showPreviewAvatar(index: number) {
    if(!Transform.has(avatarShowcase)) {
        createAvatarShowcase()
    }

    GltfContainer.createOrReplace(avatarShowcase, {
        src: `assets/models/avatars/avatar_${(index+1)}.glb`
    })
}

function createAvatarShowcase(){
    Transform.create(avatarShowcase, {
        position: Vector3.Zero(),
        scale: Vector3.One(),
        parent: showcase
    })
    //addDebugPivot(avatarShowcase)
}

export function createFrames() {
    /*avatar_preview.forEach((entity, index) => {
        addPmPointerDown(entity, {
            button: InputAction.IA_POINTER,
            hoverText: "Preview avatar",
            cb: () => {
                showPreviewAvatar(index)
            }
        })

        MeshCollider.setBox(entity, ColliderLayer.CL_POINTER)
        //MeshRenderer.setBox(entity)
    });*/

    avatar_frame.forEach((entity, index) => {
        
        lockFrame(index)
        MeshCollider.setBox(entity, ColliderLayer.CL_POINTER)
        //MeshRenderer.setBox(entity)
    });

    avatar_frame.forEach((entity, index) => {
        const frame = engine.addEntity()
        Transform.create(frame, {
            rotation: Quaternion.fromEulerDegrees(0,180,0),
            parent: entity
        })
        GltfContainer.create(frame, {
            src: "assets/models/AG_Frame_Chains_Art.glb"
        })
        frames.push(frame)

        const backgroud = engine.addEntity()
        Transform.create(backgroud, {
            position: Vector3.create(0,0,-0.001),
            rotation: Quaternion.fromEulerDegrees(0,0,0),
            parent: entity
        })
        MeshRenderer.setPlane(backgroud)
        Material.setPbrMaterial(backgroud, {
            albedoColor: BACKGROUND_COLOR,
            emissiveColor: BACKGROUND_COLOR,
            emissiveTexture: Material.Texture.Common({
                src:"assets/images/frame_background.jpg",
            }),
            emissiveIntensity: 1,
        })
        //background-image: radial-gradient(rgb(99, 151, 242), rgb(61, 133, 230));
        backgrouds.push(backgroud)
        
        delay(()=> {
            MeshRenderer.setPlane(entity)
            const texture = Material.Texture.Common({
                src:"https://storage.lowpoly3d.com/avatargarden/RendersChar_"+index+".png",
            })
            Material.setPbrMaterial(entity,{
                texture: texture,
                transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
                emissiveTexture: texture,
                emissiveColor: Color4.White(),
                emissiveIntensity: 0.6,
            })
        }, 0*(index+1))

    });
}

export function lockFrame(index: number) {

    if(frames[index]) {
        GltfContainer.createOrReplace(frames[index], {
            src: (index==getUnlockIndex() && canUnlockNext())? "assets/models/AG_Frame_AlmostUnlocked_Art.glb" : "assets/models/AG_Frame_Chains_Art.glb"
        })
    }

    /*if(backgrouds[index]) {
        Material.setPbrMaterial(backgrouds[index], {
            albedoColor: BACKGROUND_COLOR_LOCK
        })
    }*/

    if(!avatar_frame[index]) {
        console.error("Missing TAG avatar_claim for index "+index); 
        return;
    }
    if(hasPmPointerDown(avatar_frame[index])) removePmPointerDown(avatar_frame[index]);

    /*addPmPointerDown(avatar_frame[index], {
        button: InputAction.IA_POINTER,
        hoverText: "Unlocked at level "+(index+1),
        cb: () => { }
    })*/
    if(index==getUnlockIndex() && canUnlockNext()) {
        addPmPointerDown(avatar_frame[index], {
            button: InputAction.IA_POINTER,
            hoverText: "Play the game to unlock",
            cb: () => {
                teleportToGame()
            }
        })
        return;
    }
    addPmPointerDown(avatar_frame[index], {
        button: InputAction.IA_POINTER,
        hoverText: "Preview avatar "+(index+1),
        cb: () => {
            showPreviewAvatar(index)
        }
    })
}

export function unlockFrame(index: number) {

    if(frames[index]) {
        GltfContainer.createOrReplace(frames[index], {
            src: "assets/models/AG_Frame_Unlocked_Art.glb"
        });
    }

    /*if(backgrouds[index]) {
        Material.setPbrMaterial(backgrouds[index], {
            albedoColor: BACKGROUND_COLOR
        })
    }*/

    if(!avatar_frame[index]) {
        console.error("Missing TAG avatar_claim for index "+index); 
        return;
    }
    if(hasPmPointerDown(avatar_frame[index])) removePmPointerDown(avatar_frame[index]);
    
    addPmPointerDown(avatar_frame[index], {
        button: InputAction.IA_POINTER,
        hoverText: "Claim avatar "+(index+1),
        cb: () => {
            claimAvatar(index)
        }
    })
}