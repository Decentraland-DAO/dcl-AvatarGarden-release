import {
    Animator, AudioSource, AvatarAnchorPointType, AvatarAttach,
    Billboard,
    BillboardMode,
    Entity, GltfContainer, InputAction, MeshCollider,
    PointerEventType, Transform, engine, inputSystem
} from "@dcl/sdk/ecs"
import { addPmPointerDown, hasPmPointerDown, removePmPointerDown } from "../imports/components/pointer"
import { Dialog } from "../jsonData/dialogues";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import * as talkData from "../ui-entities/uiNPCTalk.data"
import * as dialoguesJson from '../jsonData/dialogues'
import * as utils from "@dcl-sdk/utils"
import { delay } from "../imports/delay";
import { npcs } from "../games/tags";
import { randomIntFromInterval } from "../utils";
import { getUnlockIndex, isAllUnlocked, isLoaded } from "../games/seasonpass/seasonpass";
import { despawnAnim, spawnAnim } from "./npcAnimations";
import { activateBubble, deactivateBubbles } from "./npcBubbles";
import { disableDisclaimerUI } from "../ui";

const dialogues: Dialog[] = dialoguesJson.textDialogs;
var talkSfxPlayed = false;
export const npcTalkSound = engine.addEntity()

AudioSource.create(npcTalkSound, {
    audioClipUrl: 'assets/audio/npc_talking.mp3',
    loop: false,
    playing: false,
    volume: 0.7,
})

AvatarAttach.create(npcTalkSound, {
    anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG,
})

function playSound(entity: Entity, bPlaying: boolean) {
    // fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(entity)

    // modify its playing value
    audioSource.playing = bPlaying
}

const NPCModel = engine.addEntity()
const NPCCollision = engine.addEntity()
const npcPosition = { x: 0, y: -0.5, z: 0 }
const npcScale = Vector3.scale(Vector3.One(), 1.2)
function createNPC() {
    GltfContainer.create(NPCModel, {
        src: 'assets/models/npc_banana.glb',
    })
    Animator.create(NPCModel, {
        states: [
            {
                clip: 'Idle',
                playing: true,
                loop: true,
            },
            {
                clip: 'Talk',
                playing: false,
                loop: true,
            }
        ],
    })
    Animator.playSingleAnimation(NPCModel, 'Idle')
    Transform.create(NPCModel, {
        position: npcPosition,
        rotation: { x: 0, y: 0, z: 0, w: 0 },
        scale: npcScale,
    })

    //MeshRenderer.setBox(NPC) 
    MeshCollider.setBox(NPCCollision)

    Transform.create(NPCCollision, {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 0 },
        scale: { x: 1, y: 4, z: 1 },
        parent: NPCModel
    })
    Billboard.create(NPCModel, {
        billboardMode: BillboardMode.BM_Y,
    })
}


export function loadNpcInZone1() {
    setNPCTalk(npcs[0], 0, 0, "Hi there!", () => {
        Animator.playSingleAnimation(NPCModel, 'Idle')
    })
    Transform.getMutable(NPCModel).parent = npcs[0]
    Transform.getMutable(NPCModel).position = npcPosition
    spawnAnim(NPCModel, npcScale)
    delay(() => {
        activateBubble(npcs[0])
    }, 1000)
}

export function loadNpcInZone2() {
    setNPCTalk(npcs[1], 1, 0, "Hi there!", () => {
        Animator.playSingleAnimation(NPCModel, 'Idle')
    })
    Transform.getMutable(NPCModel).parent = npcs[1]
    Transform.getMutable(NPCModel).position = npcPosition
    spawnAnim(NPCModel, npcScale)
    delay(() => {
        activateBubble(npcs[1])
    }, 1000)
    disableDisclaimerUI()
}

export function loadNpcInZone3() {
    setNPCTalk(npcs[2], 2, 0, "Hi there!", () => {
        Animator.playSingleAnimation(NPCModel, 'Idle')
    })
    Transform.getMutable(NPCModel).parent = npcs[2]
    Transform.getMutable(NPCModel).position = npcPosition
    spawnAnim(NPCModel, npcScale)
    delay(() => {
        activateBubble(npcs[2])
    }, 1000)
    disableDisclaimerUI()
}

export function loadNpcInZone4() {
    setNPCTalk(npcs[3], 5, 0, "Hi there!", () => {
        Animator.playSingleAnimation(NPCModel, 'Idle')
    })
    Transform.getMutable(NPCModel).parent = npcs[3]
    Transform.getMutable(NPCModel).position = Vector3.create(npcPosition.x, npcPosition.y + 0.5, npcPosition.z)
    spawnAnim(NPCModel, npcScale)
    delay(() => {
        activateBubble(npcs[3])
    }, 1000)
    disableDisclaimerUI()
}

export function loadNpcInZone5() {
    setNPCTalk(npcs[4], 6, 0, "Hi there!", () => {
        Animator.playSingleAnimation(NPCModel, 'Idle')
    })
    Transform.getMutable(NPCModel).parent = npcs[4]
    Transform.getMutable(NPCModel).position = Vector3.create(npcPosition.x, npcPosition.y + 0.5, npcPosition.z)
    spawnAnim(NPCModel, npcScale)
    delay(() => {
        activateBubble(npcs[4])
    }, 1000)
}

//NOT USED
export function loadNpcRandomTalk() {
    if (isAllUnlocked()) {
        setNPCTalk(npcs[2], 4, 0, "Welcome back!", () => { })
        return
    }
    var randomTalkIndex = (getUnlockIndex() - 1) % 9
    setNPCTalk(npcs[2], 3, randomTalkIndex, "Welcome back!", () => {
        //randomTalkIndex = randomIntFromInterval(0, 9)
    })
}

function setNPCTalk(entity: Entity, dialogueIndex: number, lineIndex: number, hoverText: string, cb?: () => void) {

    if (!Transform.has(NPCModel)) {
        createNPC()
    }

    Transform.getMutable(NPCModel).parent = entity

    if (hasPmPointerDown(NPCCollision)) removePmPointerDown(NPCCollision);

    addPmPointerDown(NPCCollision, {
        button: InputAction.IA_POINTER,
        maxDistance: 8,
        hoverText: hoverText,
        cb: () => {
            if (!talkSfxPlayed) {
                talkSfxPlayed = true
                playSound(npcTalkSound, true)
            }
            if (!talkData.playerTalking) {
                Animator.playSingleAnimation(NPCModel, 'Talk')
                talkData.activateTalk();
                talkData.setCurrentDialogueIndex(lineIndex);
                getNextDialogue(dialogueIndex, cb);
                engine.removeSystem(enableOptions);
                delay(() => {
                    engine.addSystem(changeText);
                }, 500)
            } else if (!talkData.playerChosingOption) {
                //getNextDialogue(dialogueIndex, cb);
            }
        }
    })

    talkData.setCallbackClickNext(() => {
        getNextDialogue(dialogueIndex, cb);
    });

    const changeText = () => {

        if (inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN) && talkData.isMenuVisible) {
            getNextDialogue(dialogueIndex, cb);
        }
    };

    const enableOptions = () => {
        const cmd = inputSystem.getInputCommand(
            InputAction.IA_PRIMARY,
            PointerEventType.PET_DOWN,
        );
        const cmd2 = inputSystem.getInputCommand(
            InputAction.IA_SECONDARY,
            PointerEventType.PET_DOWN,
        );
        if (cmd && talkData.isMenuVisible) {
            talkData.callbackClickYes();
            engine.removeSystem(enableOptions);
        }
        if (cmd2 && talkData.isMenuVisible) {
            talkData.callbackClickNo();
            engine.removeSystem(enableOptions);
        }
    }

    function getNextDialogue(npcDialogIndex: number, callback?: () => void) {
        if (talkData.currentDialogueIndex == -1 || !dialogues[npcDialogIndex]?.texts[talkData.currentDialogueIndex]) {
            talkData.resetTalk();
            talkSfxPlayed = false

            if (callback) {
                callback();
            }
            engine.removeSystem(changeText);
            return;
        }

        const currentText = dialogues[npcDialogIndex].texts[talkData.currentDialogueIndex];


        if (currentText.bIsComfirmText) {
            talkData.setPlayerChosingOption(true);
            talkData.setIsButtonNoVisible(true);
            talkData.setIsButtonYesVisible(true);
            talkData.setIsButtonClickVisible(false);
            engine.removeSystem(changeText);
            //set callbacks
            engine.addSystem(enableOptions);
            talkData.setCallbackClickNo(() => {
                talkData.resetTalk();
                talkData.setPlayerChosingOption(false);
                engine.removeSystem(enableOptions);
            });
            talkData.setCallbackClickYes(() => {
                talkData.setPlayerChosingOption(false);
                getNextDialogue(npcDialogIndex, callback);
                engine.removeSystem(enableOptions);
            });
        }

        talkData.setNpcDialog(currentText.text.en);
        if (currentText.bEndDialog) {
            talkData.setCurrentDialogueIndex(-1);
        }
        else {
            talkData.setCurrentDialogueIndex(talkData.currentDialogueIndex + 1);
        }

    }

}



export class NpcBehaviour {
    private static instance: NpcBehaviour;

    private readonly TRIGGER_SIZE = Vector3.create(10, 6, 10);

    private trigger1: Entity;
    private trigger2: Entity;
    private trigger3: Entity;
    private trigger4: Entity;
    private trigger5: Entity;


    private constructor() {
        this.initTriggers();
        deactivateBubbles()
    }

    public static Instance(): NpcBehaviour {
        if (!NpcBehaviour.instance) {
            NpcBehaviour.instance = new NpcBehaviour();
        }
        return NpcBehaviour.instance;
    }

    initTriggers() {
        this.initTrigger1()
        this.initTrigger2()
        this.initTrigger3()
        this.initTrigger4()
        this.initTrigger5()

        //utils.triggers.enableDebugDraw(true)
    }

    private initTrigger1() {
        this.trigger1 = engine.addEntity()
        Transform.create(this.trigger1, {
            position: Transform.get(npcs[0]).position,
            scale: Vector3.One(),
        })
        utils.triggers.addTrigger(this.trigger1,
            utils.NO_LAYERS,
            utils.LAYER_1,
            [{
                type: 'box',
                scale: { x: this.TRIGGER_SIZE.x + 2, y: this.TRIGGER_SIZE.y, z: this.TRIGGER_SIZE.z + 2 },
            }],
            function () {    //Enter
                //console.log("enter trigger 1")
                loadNpcInZone1()
            },
            function () {    //Exit
                //console.log("exit trigger 1")
                despawnAnim(NPCModel)
                deactivateBubbles()
                //CLOSE NPC DIALOG!!
            }
        )
    }

    private initTrigger2() {
        this.trigger2 = engine.addEntity()
        Transform.create(this.trigger2, {
            position: Transform.get(npcs[1]).position,
            scale: Vector3.One(),
        })
        utils.triggers.addTrigger(this.trigger2,
            utils.NO_LAYERS,
            utils.LAYER_1,
            [{
                type: 'box',
                scale: this.TRIGGER_SIZE,
            }],
            function () {    //Enter
                //console.log("enter trigger 2")
                loadNpcInZone2()
            },
            function () {    //Exit
                //console.log("exit trigger 2")
                despawnAnim(NPCModel)
                deactivateBubbles()
            }
        )
    }

    private initTrigger3() {
        this.trigger3 = engine.addEntity()
        Transform.create(this.trigger3, {
            position: Transform.get(npcs[2]).position,
            scale: Vector3.One(),
        })
        utils.triggers.addTrigger(this.trigger3,
            utils.NO_LAYERS,
            utils.LAYER_1,
            [{
                type: 'box',
                scale: this.TRIGGER_SIZE,
            }],
            function () {    //Enter
                //console.log("enter trigger 3")
                loadNpcInZone3()
            },
            function () {    //Exit
                //console.log("exit trigger 3")
                despawnAnim(NPCModel)
                deactivateBubbles()
            }
        )
    }

    private initTrigger4() {
        this.trigger4 = engine.addEntity()
        Transform.create(this.trigger4, {
            position: Transform.get(npcs[3]).position,
            scale: Vector3.One(),
        })
        utils.triggers.addTrigger(this.trigger4,
            utils.NO_LAYERS,
            utils.LAYER_1,
            [{
                type: 'box',
                scale: this.TRIGGER_SIZE,
            }],
            function () {    //Enter
                //console.log("enter trigger 4")
                loadNpcInZone4()
            },
            function () {    //Exit
                //console.log("exit trigger 4")
                despawnAnim(NPCModel)
                deactivateBubbles()
            }
        )
    }

    private initTrigger5() {
        this.trigger5 = engine.addEntity()
        Transform.create(this.trigger5, {
            position: Transform.get(npcs[4]).position,
            scale: Vector3.One(),
        })
        utils.triggers.addTrigger(this.trigger5,
            utils.NO_LAYERS,
            utils.LAYER_1,
            [{
                type: 'box',
                scale: this.TRIGGER_SIZE,
            }],
            function () {    //Enter
                //console.log("enter trigger 5")
                loadNpcInZone5()
            },
            function () {    //Exit
                //console.log("exit trigger 5")
                despawnAnim(NPCModel)
                deactivateBubbles()
            }
        )
    }



}
