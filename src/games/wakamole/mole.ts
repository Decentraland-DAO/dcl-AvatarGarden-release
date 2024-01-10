import { Animator, ColliderLayer, Entity, MeshCollider, Transform, VisibilityComponent, engine } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { activate, deactivate, setMovementCallback, setTarget } from "../../imports/tween/movement/movement";
import { clearDelay, delay } from "../../imports/delay";
import { randomFloatFromInterval, randomIntFromInterval } from "../../utils";
import { Position, WakaMole } from "./wakaMole";
import { MolePool } from "./molePool";


export enum MoleName {
    Monster = "Monster",
    Banana = "Banana",
    Alien = "Alien",
    Carrot = "Carrot",
    Radish = "Radish",
    Toad = "Toad",
}

export enum MoleStatus {
    Enabled = "enabled",
    Hitted = "hitted",
    Reserved = "reserved",
    Disabled = "disabled",
}
export enum MoveStatus {
    None = "none",
    Up = "up",
    Down = "down",
}

export class Mole {
    


    public status: MoleStatus = MoleStatus.Reserved;
    public moveStatus: MoveStatus = MoveStatus.None;
    public entity: Entity;
    public collider: Entity;
    public moleType: MoleName;
    public position: Position;

    private upPosition: Vector3
    private downPosition: Vector3

    private hitDelay: number = null

    constructor(moleType: MoleName) {
        this.status = MoleStatus.Disabled;
        this.moleType = moleType;
    }

    enable(position: Position): void {

        if (this.status == MoleStatus.Disabled || this.status == MoleStatus.Reserved) {
            this.status = MoleStatus.Enabled;
            this.position = position;
            this.upPosition = position.position;
            this.downPosition = Vector3.add(position.position, {x: 0, y: -1, z: 0})
            Transform.getMutable(this.entity).position = this.downPosition;
            this.goUp();
            //Spawn the mole
            this.playAliveAnimation();
            VisibilityComponent.getMutable(this.entity).visible = true
            MeshCollider.getMutable(this.collider).collisionMask = ColliderLayer.CL_POINTER;
        }
    }

    goUp(): void {
        if(!this.isEnabled() || this.moveStatus == MoveStatus.Up) return;
        this.moveStatus = MoveStatus.Up;

        setTarget(this.entity, this.upPosition)
        setMovementCallback(this.entity, () => {this.endGoUp()})
        activate(this.entity, randomFloatFromInterval(WakaMole.Instance().minUpSpeed, WakaMole.Instance().maxUpSpeed))
    }

    goDown(): void {
        if(!this.isEnabled() || this.moveStatus == MoveStatus.Down) return;
        this.moveStatus = MoveStatus.Down;
        
        setTarget(this.entity, this.downPosition)
        setMovementCallback(this.entity, () => {this.endGoDown()})
        activate(
            this.entity, 
            (this.status == MoleStatus.Hitted)? WakaMole.Instance().HIT_DOWN_SPEED : randomFloatFromInterval(WakaMole.Instance().minDownSpeed, WakaMole.Instance().maxDownSpeed)
        )
    }

    private endGoUp(): void {
        if(!this.isEnabled() || this.moveStatus != MoveStatus.Up) {
            return;
        }
        if(WakaMole.Instance().getRound() == 0) return;
        delay(()=>{
            if(this.status == MoleStatus.Hitted) return;
            this.goDown();
        }, randomIntFromInterval(WakaMole.Instance().stayUpMinTime, WakaMole.Instance().stayUpMaxTime))
    }

    private endGoDown(): void {
        this.moveStatus = MoveStatus.None;
        MeshCollider.getMutable(this.collider).collisionMask = ColliderLayer.CL_NONE;
        setMovementCallback(this.entity, () => {})
        this.disable();
    }

    disable(): void {
        if (this.isEnabled()) {
            this.status = MoleStatus.Disabled;
            //Store the mole
            MeshCollider.getMutable(this.collider).collisionMask = ColliderLayer.CL_NONE;
            VisibilityComponent.getMutable(this.entity).visible = false
            Transform.getMutable(this.entity).position = MolePool.STORE_POSITION;
            WakaMole.Instance().freePosition(this.position.index, this);
        }
    }

    hit(): void {
        if (this.canBeHit()) {
            this.status = MoleStatus.Hitted;
            MeshCollider.getMutable(this.collider).collisionMask = ColliderLayer.CL_NONE;
            //Hammer
            this.playHitAnimation();
            deactivate(this.entity);
            this.hitDelay = delay(() => {
                this.hitDelay = null
                if(this.moveStatus == MoveStatus.Up) {
                    this.goDown();
                }
                else if(this.moveStatus == MoveStatus.Down){
                    activate(this.entity)
                }
            }, 500)
        }
    }

    private playAliveAnimation(): void {
        // Code to play the alive animation based on moleType
        Animator.playSingleAnimation(this.entity, '1_Idle', true)
    }

    private playHitAnimation(): void {
        // Code to play the hit animation based on moleType
        //If model is already down, move it up to made a cleaner animation
        if(Transform.get(this.entity).position.y < this.downPosition.y + 1) {
            Transform.getMutable(this.entity).position = Vector3.add(this.downPosition, {x: 0, y: 1, z: 0})
        }
        Animator.playSingleAnimation(this.entity, '2_Bonk', true)
    }

    isEnabled(): boolean {
        return this.status == MoleStatus.Enabled || this.status == MoleStatus.Hitted;
    }
    canBeHit(): boolean {
        return this.status == MoleStatus.Enabled;
    }

    destroy(): void {
        if(this.hitDelay) {
            clearDelay(this.hitDelay)
            this.hitDelay = null
        }
        engine.removeEntity(this.entity);
        engine.removeEntity(this.collider);
    }
}




