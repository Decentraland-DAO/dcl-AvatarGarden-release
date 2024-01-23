import { Vector3 } from "@dcl/ecs-math";
import { AudioSource, AvatarAnchorPointType, AvatarAttach, ColliderLayer, EasingFunction, Entity, InputAction, Material, MaterialTransparencyMode, MeshCollider, MeshRenderer, Transform, Tween, TweenSequence, VisibilityComponent, engine } from "@dcl/sdk/ecs";
import { Color4, Quaternion } from "@dcl/sdk/math";
import { addPmPointerDown } from "../../imports/components/pointer";
import { CardManager } from "./cardGame.manager";
import { CardName, CardPool } from "./cardPool";
import { minigames_floor } from "../tags";

export enum CardStatus {
    Enabled = "enabled",
    Linked = "linked",
    Swapped = "swapped",
    Reserved = "reserved",
    Disabled = "disabled",
}
export const playerFlip = engine.addEntity()

AudioSource.create(playerFlip, {
    audioClipUrl: 'assets/audio/flip_Card.mp3',
    loop: false,
    playing: false,
    volume: 0.25,
})

AvatarAttach.create(playerFlip, {
    anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG,
})

function playSound(entity: Entity, bPlaying: boolean) {
    // fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(entity)

    // modify its playing value
    audioSource.playing = bPlaying
}
export class Card {
    public status: CardStatus = CardStatus.Reserved;
    public cardName: CardName;
    public entity: Entity;
    public id: number;
    public position: Vector3.Mutable;
    public frontCard: Entity;
    public backCard: Entity;

    constructor(cardName: CardName, id: number, position: Vector3) {
        this.status = CardStatus.Enabled;
        this.cardName = cardName;
        this.position = position;
        this.id = id;
        this.entity = engine.addEntity()
        this.frontCard = engine.addEntity()
        this.backCard = engine.addEntity()
        this.createCard(this.frontCard, this.backCard, this.position, cardName);
    }

    createCard(frontCard: Entity, backCard: Entity, position: Vector3, cardname: string): void {
        CardPool.Instance().cardPool.push(this);
        const frontCartTexture = Material.Texture.Common({
            src: 'https://storage.lowpoly3d.com/avatargarden/cards/' + cardname + '.png',
        })
        Material.setPbrMaterial(frontCard, {
            texture: frontCartTexture,
            transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
            emissiveTexture: frontCartTexture,
            emissiveColor: Color4.White(),
            emissiveIntensity: 0.6,
        })
        const backCartTexture = Material.Texture.Common({
            src: 'https://storage.lowpoly3d.com/avatargarden/cards/Card_Back.png',
        })
        Material.setPbrMaterial(backCard, {
            texture: backCartTexture,
            transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
            emissiveTexture: backCartTexture,
            emissiveColor: Color4.White(),
            emissiveIntensity: 0.6,
        })
        Transform.createOrReplace(this.entity, {
            position: { x: position.x, y: position.y + .2, z: position.z },
            rotation: Quaternion.fromEulerDegrees(0, 180, 180),
            scale: { x: 1, y: 1, z: 1 },
            parent: minigames_floor
        })
        Transform.createOrReplace(frontCard, {
            position: { x: 0, y: 0 + .01, z: 0 },
            rotation: Quaternion.fromEulerDegrees(90, 90, 180),
            scale: { x: .7, y: .7, z: 1 },
            parent: this.entity
        })

        Transform.createOrReplace(backCard, {
            position: { x: 0, y: 0, z: 0 },
            rotation: Quaternion.fromEulerDegrees(90, 90, 180),
            scale: { x: -.71, y: .7, z: 1 },
            parent: this.entity
        })

        VisibilityComponent.createOrReplace(this.frontCard, { visible: true })
        VisibilityComponent.createOrReplace(this.backCard, { visible: true })
        VisibilityComponent.createOrReplace(this.entity, { visible: true })

        MeshRenderer.setPlane(frontCard)
        MeshRenderer.setPlane(backCard)
        MeshCollider.setPlane(frontCard, ColliderLayer.CL_POINTER)
        //clickable card
        addPmPointerDown(frontCard, {
            button: InputAction.IA_POINTER,
            maxDistance: 15,
            hoverText: 'Flip card',
            cb: () => {
                this.click()
            }
        })
    }

    click(): void {
        if (this.status === CardStatus.Enabled) {
            if (!CardManager.Instance().playing) {
                CardManager.Instance().playing = true;
                CardManager.Instance().startGame();
            }
            playSound(playerFlip, true)
            this.playSwapAnimation();
            CardManager.Instance().cardsSelected.push(this.cardName);
            CardManager.Instance().checkValues(this.id);
        }
    }

    changePosition(newPosition: Vector3): void {
        Transform.createOrReplace(this.entity, {
            position: { x: newPosition.x, y: newPosition.y, z: newPosition.z },
            rotation: Quaternion.fromEulerDegrees(0, 180, 180),
            parent: minigames_floor
        })
    }

    disable(): void {
        //this.status = CardStatus.Disabled;
        VisibilityComponent.getMutable(this.frontCard).visible = false
        VisibilityComponent.getMutable(this.backCard).visible = false
        VisibilityComponent.getMutable(this.entity).visible = false
    }

    playSwapCard():void{
        if (this.status == CardStatus.Linked || this.status == CardStatus.Swapped) {
            console.log("swap card " + this.cardName);
            var rotate = Tween.createOrReplace(this.entity, {
                mode: Tween.Mode.Rotate({
                    start: Quaternion.fromEulerDegrees(0, 0, 0),
                    end: Quaternion.fromEulerDegrees(0, 180, 180),
                }),
                duration: 300,
                easingFunction: EasingFunction.EF_LINEAR,
            })
            TweenSequence.createOrReplace(this.entity, { sequence: [rotate] })
        }
    }

    playSwapAnimation(): void {
        if (this.status === CardStatus.Enabled) {
            this.status = CardStatus.Swapped;
            var rotate = Tween.createOrReplace(this.entity, {
                mode: Tween.Mode.Rotate({
                    start: Quaternion.fromEulerDegrees(0, 180, 180),
                    end: Quaternion.fromEulerDegrees(0, 0, 0),
                }),
                duration: 300,
                easingFunction: EasingFunction.EF_LINEAR,
            })
            TweenSequence.createOrReplace(this.backCard, { sequence: [rotate] })
        }
    }

    playUnswapAnimation(): void {
        if (this.status === CardStatus.Swapped || this.status === CardStatus.Linked) {
            this.status = CardStatus.Enabled;
        
            var rotate = Tween.createOrReplace(this.entity, {
                mode: Tween.Mode.Rotate({
                    start: Quaternion.fromEulerDegrees(0, 0, 0),
                    end: Quaternion.fromEulerDegrees(0, 180, 180),
                }),
                duration: 300,
                easingFunction: EasingFunction.EF_LINEAR,
            })
            TweenSequence.createOrReplace(this.backCard, { sequence: [rotate] })
        }
    }
}