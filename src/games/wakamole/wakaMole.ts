import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math';
import { Mole, MoleName, MoleStatus } from './mole';
import { MolePool } from './molePool';
import { addPmPointerDown } from '../../imports/components/pointer';
import { Animator, ColliderLayer, Entity, GltfContainer, InputAction, Material, MeshCollider, MeshRenderer, TextShape, Transform, VisibilityComponent, engine } from '@dcl/sdk/ecs';
import { holes, mole_disable } from '../tags';
import { clamp, getWorldPositionByPolygonal, millisToMinutesAndSeconds, randomIntFromInterval } from '../../utils';
import { addDebugPivot } from '../../imports/components/debugPivot';
import { clearDelay, delay } from '../../imports/delay';
import { AudioManager } from '../audio';
import { MoveComponent, setMovementCallback } from '../../imports/tween/movement/movement.component';
import { MovementType } from '../../imports/tween/movement/movement.schema';
import { activate, setTarget } from '../../imports/tween/movement/movement';
import { sendScoreRequest } from '../../imports/leaderboard/leaderboard.service';
import { getLeaderboardConfig } from '../../imports/leaderboard/leaderboard.data';
import { Leaderboard } from '../../imports/leaderboard/leaderboard';
import { isLoaded, unlockNext } from '../seasonpass/seasonpass';
import { uiGuestCanvasData, uiGuestData } from '../../imports/guestUI/uiGuest.data';


//Map of Positions Vector3 type with a boolean to check if they are occupied
export type Position = {
    readonly index: number;
    position: Vector3;
    isOccupied: boolean;
}


export class WakaMole {
    private readonly START_TIME = 1000*60*2 // 2 minutes
    static readonly SCORE_TO_UNLOCK_SEASON = 20
    readonly SCORE_TO_ADD_DIFFICULTY: number = 1

    readonly HIT_DOWN_SPEED = 2
    private readonly MAX_UP_SPEED = [
        2
    ];
    private readonly MIN_UP_SPEED = [
        1
    ];
    private readonly MAX_DOWN_SPEED = [
        2
    ];
    private readonly MIN_DOWN_SPEED = [
        1
    ];

    private readonly STAY_UP_MAX_TIME = [
        2000, 2000,     // 1-2
        1500, 1500,     // 3-4
        1500, 1500,     // 5-6
        1000, 1000,     // 7-8
        1000, 1000,     // 9-10
        500, 500,       // 11-12
        500             // 12-13
    ];
    private readonly STAY_UP_MIN_TIME = [
        2000, 1500,     // 1-2
        1000, 1000,     // 3-4
        1000, 1000,     // 5-6
        500, 500,       // 7-8
        500, 500,       // 9-10
        200             // 11-12
    ];

    private readonly MAX_NUM_MOLES = [
        4, 6,       // 1-2
        8, 8,       // 3-4
        10, 10,     // 5-6
        10, 12,     // 7-8
    ]

    private readonly MIN_NUM_MOLES = [
        4, 4,       // 1-2
        4, 6,       // 3-4
        6, 8,       // 5-6
        8, 10,       // 7-8
        10, 10,     // 9-10
        12,         // 11-12
    ]


    private static instance: WakaMole;
    private positions: Position[] = [];
    private correctMoleType: MoleName;
    private readonly MOLE_TYPES = Object.keys(MoleName)
    private activeMoles: Mole[] = [];

    private _IsPlaying: boolean = false;
    private score: number = 0;
    private nRound: number = 0;

    private bLoaded: boolean = false;
    private parent: Entity;
    private wantedEntity: Entity;
    private scoreEntity: Entity;
    private addScoreEntity: Entity;
    private playAgainEntity: Entity;
    private hammerEntity: Entity;
    private hammerDelay: number = null

    private timeEntity: Entity;
    private time: number = 0;
    private activeCountdown: boolean = false;

    //Difficulty
    private difficulty: number = 0;
    maxUpSpeed: number = 2;
    minUpSpeed: number = 1;
    maxDownSpeed: number = 2;
    minDownSpeed: number = 1;
    stayUpMaxTime: number = 2000;
    stayUpMinTime: number = 500;
    minNumMoles: number = 2;
    maxNumMoles: number = 4;

    private constructor() {}

    public static Instance(): WakaMole {
        if (!WakaMole.instance) {
            WakaMole.instance = new WakaMole();
        }
        return WakaMole.instance;
    }

    loadGame(parent: Entity, timmerParent: Entity, scoreParent: Entity, wantedParent: Entity, tipParent: Entity) {
        if(this.bLoaded) return;
        this.bLoaded = true;

        holes.forEach((hole, index) => {
            const pos = getWorldPositionByPolygonal(hole)
            this.positions.push({ index: index, position: pos, isOccupied: false });
        });

        this.parent = engine.addEntity()
        Transform.create(this.parent, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.fromEulerDegrees(90,-90,0),
            scale: Vector3.create(5,5,1),
            parent: parent
        })

        this.wantedEntity = engine.addEntity()
        Transform.create(this.wantedEntity, {
            position: Vector3.create(0, 0.1, 0.05),
            rotation: Quaternion.fromEulerDegrees(0,180,0),
            scale: Vector3.scale(Vector3.One(), 1.7),
            parent: wantedParent
        })
        MeshRenderer.setPlane(this.wantedEntity)
        VisibilityComponent.create(this.wantedEntity, { visible: true })

        this.scoreEntity = engine.addEntity();
        Transform.create(this.scoreEntity, {
            position: Vector3.create(0, -0.03, 0.05),
            rotation: Quaternion.fromEulerDegrees(0,180,0),
            scale: Vector3.scale(Vector3.One(), 1),
            parent: scoreParent
        })

        TextShape.create(this.scoreEntity, {
            text: "<b>0</b>",
            fontSize: 8,
            textColor: Color4.Red(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })

        this.addScoreEntity = engine.addEntity()
        Transform.create(this.addScoreEntity, {
            position: MolePool.STORE_POSITION,
            scale: Vector3.create(-1,1,1),
        })
        TextShape.create(this.addScoreEntity, {
            text: "+1",
            fontSize: 8,
            textColor: Color4.Green(),
            outlineWidth: 0.15,
            outlineColor: Color4.Black()
        })
        VisibilityComponent.create(this.addScoreEntity, { visible: false })

        MoveComponent.create(this.addScoreEntity, {
            type: MovementType.Simple,
            bInicialized: false,
            bActive: false,
            entity: this.addScoreEntity,
        })

        this.timeEntity = engine.addEntity()
        Transform.create(this.timeEntity, {
            position: Vector3.create(0, 0, 0.05),
            rotation: Quaternion.fromEulerDegrees(0,180,0),
            scale: Vector3.scale(Vector3.One(), 0.4),
            parent: timmerParent
        })
        TextShape.create(this.timeEntity, {
            text: "<b>00:00</b>",
            fontSize: 10,
            textColor: Color4.Red(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })

        //PLAY AGAIN
        this.playAgainEntity = engine.addEntity()
        Transform.create(this.playAgainEntity, {
            position: Vector3.create(0,0,-0.1),
            scale: Vector3.scale(Vector3.One(), 0.6),
            parent: this.parent
        })
        MeshCollider.setBox(this.playAgainEntity, ColliderLayer.CL_POINTER)
        TextShape.create(this.playAgainEntity, {
            text: "<b>PLAY</b>",
            fontSize: 2,
            textColor: Color4.White(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })
        VisibilityComponent.create(this.playAgainEntity, { visible: true })
        addPmPointerDown(this.playAgainEntity, {
            button: InputAction.IA_POINTER,
            hoverText: "Click to play",
            maxDistance: 14,
            cb: () => {
                this.startGame()
            }
        })

        this.hammerEntity = engine.addEntity()
        Transform.create(this.hammerEntity, {
            position: MolePool.STORE_POSITION,
            rotation: Quaternion.fromEulerDegrees(0, 90, 0),
            scale: Vector3.scale(Vector3.One(), 1)
        })
        GltfContainer.create(this.hammerEntity, {
            src: 'assets/models/hammer.glb',
        });
        VisibilityComponent.create(this.hammerEntity, { visible: false })

        Animator.create(this.hammerEntity, {
            states: [
                {
                    clip: 'Hammer',
                    playing: false,
                    loop: false,
                }
            ],
        }
        );

        VisibilityComponent.getMutable(mole_disable).visible = true

        const tipEntity = engine.addEntity()
        Transform.create(tipEntity, {
            position: Vector3.create(-0.0,0.05,0),
            scale: Vector3.scale(Vector3.One(), 0.9),
            rotation: Quaternion.fromEulerDegrees(90,-90,0),
            parent: tipParent
        })
        TextShape.create(tipEntity, {
            text: "<b>CLICK THE CORRECT AVATAR</b>",
            fontSize: 4,
            textColor: Color4.White(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })

        this.enableTimerSystem()
        this.startGame();
    }

    startGame() {
        
        VisibilityComponent.getMutable(this.playAgainEntity).visible = false
        MeshCollider.getMutable(this.playAgainEntity).collisionMask = ColliderLayer.CL_NONE

        this.setScore(0)
        this.nRound = 0;
        this.setTime(this.START_TIME)
        this.setDifficulty(0)
        
        this.firstRound();

        AudioManager.instance().playGameMusic({
            parent: this.parent,
            pitch: 1
        })
    }

    gameOver() {
        this.stopClock()
        this.goDownAllMoles()
        this.activeMoles = [];
        this._IsPlaying = false;

        delay(()=>{
            TextShape.getMutable(this.playAgainEntity).text = "<b>PLAY AGAIN?</b>"
            VisibilityComponent.getMutable(this.playAgainEntity).visible = true
            MeshCollider.getMutable(this.playAgainEntity).collisionMask = ColliderLayer.CL_POINTER
            AudioManager.instance().stopGameMusic()
            
        }, 2000)

        sendScoreRequest("avatar_garden_mole", {
            score: this.score,
        }, ()=>{
            if(getLeaderboardConfig("avatar_garden_mole")?.REQUEST_MY_SCORE) {
                Leaderboard.instance().requestDataAndUpdatePanels("avatar_garden_mole", 0)
            }
        })
        if(!isLoaded()) {
            uiGuestData.mode = 3
            uiGuestCanvasData.visible = true
            return;
        }
        if(this.score >= WakaMole.SCORE_TO_UNLOCK_SEASON) {
            unlockNext()
        }

    }

    private firstRound() {
        this.activateMoles();
    }

    private nextRound() {
        
        this._IsPlaying = true;
        this.nRound++;
        this.resumeClock()
        this.activateMoles();
    }

    setDifficulty(difficulty: number) {

        this.difficulty = difficulty
        this.minUpSpeed = this.getDifficultyValue(this.MIN_UP_SPEED)
        this.maxUpSpeed = this.getDifficultyValue(this.MAX_UP_SPEED)
        this.minDownSpeed = this.getDifficultyValue(this.MIN_DOWN_SPEED)
        this.maxDownSpeed = this.getDifficultyValue(this.MAX_DOWN_SPEED)
        this.stayUpMinTime = this.getDifficultyValue(this.STAY_UP_MIN_TIME)
        this.stayUpMaxTime = this.getDifficultyValue(this.STAY_UP_MAX_TIME)
        this.minNumMoles = this.getDifficultyValue(this.MIN_NUM_MOLES)
        this.maxNumMoles = this.getDifficultyValue(this.MAX_NUM_MOLES)

    }

    private getDifficultyValue<T>(array: T[]): T {
        return array[clamp(this.difficulty, 0, array.length-1)]
    }

    private activateMoles() {
        this.activeMoles = [];
        const numMoles = Math.min(randomIntFromInterval(this.minNumMoles, this.maxNumMoles), this.numFreePositions());
        const currentRound = this.nRound
        this.resetCorrectMoleType();
        delay(()=>{
            this.activateMole(this.correctMoleType);
        }, randomIntFromInterval(200, 800))

        for (let i = 0; i < numMoles-1; i++) {
            // Get a random moletype from the pool and assing it to a random  free position
            delay(()=>{
                if(this.nRound != currentRound) return;
                this.activateMole(this.getRandomNoCorrectMoleType())
            }, randomIntFromInterval(0, 1000))
        }
    }

    private activateMole(type: string) {
        const rndPos = this.getRandomFreePosition();
        const mole = MolePool.Instance().getMole(MoleName[type]);
        
        if (mole && rndPos) {
            mole.enable(rndPos);
            this.activeMoles.push(mole);
        }
        
    }

    hitMole(mole: Mole) {
        if(!this.checkMole(mole)) {
            this.hitWrongMole(mole);
        }
        else this.hitCorrectMole(mole);

        Transform.getMutable(this.hammerEntity).position = Vector3.add(Transform.get(mole.entity).position, {x: 0, y: -0.5, z: 0})
        Animator.playSingleAnimation(this.hammerEntity, "Hammer", true)
        VisibilityComponent.getMutable(this.hammerEntity).visible = true

        if(this.hammerDelay != null) {
            clearDelay(this.hammerDelay)
            this.hammerDelay = null
        }

        this.hammerDelay = delay(()=>{
            VisibilityComponent.getMutable(this.hammerEntity).visible = false
        }, 1000)
        
        AudioManager.instance().playRandomBonk({
            parent: mole.entity,
        });
        
        if(this.nRound == 0) {
            this.goDownAllMoles()
        }
    }

    private hitWrongMole(mole: Mole) {
        
        if(this.score > 0) this.setScore(this.score - 1);
        delay(()=>{
            AudioManager.instance().playFail({
                parent: mole.entity,
            });
            this.addScoreAnimation(mole, -1);
        }, 200)
    }

    private hitCorrectMole(mole: Mole) {
        
        this.setScore(this.score + 1);
        this.setDifficulty(Math.floor(this.score / this.SCORE_TO_ADD_DIFFICULTY))
        
        delay(()=>{
            AudioManager.instance().playSuccess({
                parent: mole.entity,
            });
            this.addScoreAnimation(mole, 1);
            this.goDownAllMoles()
        }, 200)
    }

    private goDownAllMoles() {
        this.activeMoles.forEach(mole => {
            if(mole.status == MoleStatus.Hitted) return;
            mole.goDown();
        });
    }

    private addScoreAnimation(mole: Mole, add: number) {
        const pos = Vector3.add(Transform.get(mole.entity).position, {x: -0.5, y: 0.5, z: 0.3});
        Transform.getMutable(this.addScoreEntity).position = pos
        Transform.getMutable(this.addScoreEntity).rotation = Quaternion.fromLookAt(
            Vector3.multiply(pos, { x: 1, y: 0, z: 1}), 
            Vector3.multiply(Transform.get(engine.CameraEntity).position, { x: 1, y: 0, z: 1}), 
            Vector3.Up()
        );
        TextShape.getMutable(this.addScoreEntity).text = "<b>"+((add>0)?"+":"")+add+"</b>";
        TextShape.getMutable(this.addScoreEntity).textColor = (add>=0)? Color4.Green() : Color4.Red()
        VisibilityComponent.getMutable(this.addScoreEntity).visible = true;
        setTarget(this.addScoreEntity, Vector3.add(pos, {x: 0, y: 1.0, z: 0}))
        setMovementCallback(this.addScoreEntity, () => {
            VisibilityComponent.getMutable(this.addScoreEntity).visible = false;
        })
        activate(this.addScoreEntity, 1);
    }

    private numFreePositions(): number {
        return this.positions.filter(position => !position.isOccupied).length;
    }

    // Get a random free position from the positions array
    private getRandomFreePosition(): Position {
        const freePositions = this.positions.filter(position => !position.isOccupied);

        if (freePositions.length === 0) {
            return undefined; // No hay posiciones libres
        }

        const selectedPosition = freePositions[randomIntFromInterval(0, freePositions.length - 1)];

        // Marcar la posición como ocupada
        this.positions[selectedPosition.index].isOccupied = true;

        return selectedPosition;
    }

    freePosition(index: number, mole: Mole): void {
        if(!this.positions[index]) return;
        this.positions[index].isOccupied = false;

        //next round
        this.checkNextRound();
    }

    private checkNextRound(): void {
        if(this.numFreePositions() != this.positions.length) return;
        if(this.nRound == 0) {
            this.nextRound()
            return;
        }
        if(!this._IsPlaying) return;
        this.nextRound()
    }

    // Get a random mole type
    private getRandomNoCorrectMoleType() {
        
        let randomIndex = randomIntFromInterval(0, this.MOLE_TYPES.length - 1);

        if (this.MOLE_TYPES[randomIndex] == this.correctMoleType) {
            randomIndex = (randomIndex + 1) % this.MOLE_TYPES.length;
        }

        return this.MOLE_TYPES[randomIndex];
    }

    // Reset the correct mole type 
    private resetCorrectMoleType(): void {
        this.correctMoleType = MoleName[this.MOLE_TYPES[randomIntFromInterval(0, this.MOLE_TYPES.length - 1)]]

        Material.setBasicMaterial(this.wantedEntity, {
            texture: Material.Texture.Common({
                src: "assets/images/mole/"+this.correctMoleType+".png"
            }),
        })
    }

    private setScore(score: number): void {
        this.score = score;

        TextShape.getMutable(this.scoreEntity).text = "<b>"+this.score+"</b>";
    }

    private setTime(time: number) {
        this.time = time
        TextShape.getMutable(this.timeEntity).text = "<b>" + millisToMinutesAndSeconds(this.time) + "</b>"
    }

    // Check if the mole is the correct one
    checkMole(mole: Mole): boolean {
        return mole.moleType === this.correctMoleType;
    }

    private stopClock() {
        this.activeCountdown = false
        AudioManager.instance().stopClock()
    }

    private resumeClock() {
        if(this.activeCountdown) return;
        this.activeCountdown = true
        AudioManager.instance().playClock({
            parent: this.timeEntity,
            pitch: 0.45
        })
    }

    private enableTimerSystem() {
        engine.addSystem((dt: number)=>{
            this.timmerSystem(dt)
        })
    }
    private timmerSystem(dt: number) {
        if(!this.activeCountdown) return;
        if((this.time - dt*1000) <= 0) {
            this.setTime(0)
            this.gameOver()
            return;
        }
        this.setTime(this.time - dt*1000)
    }

    getScore(): number {
        return this.score;
    }
    isPlaying(): boolean {
        return this._IsPlaying;
    }
    getRound(): number {
        return this.nRound;
    }

    destroyGame() {
        engine.removeEntity(this.parent)
        engine.removeEntity(this.wantedEntity)
        engine.removeEntity(this.scoreEntity)
        engine.removeEntity(this.addScoreEntity)
        engine.removeEntity(this.timeEntity)
        engine.removeEntity(this.playAgainEntity)
        engine.removeEntity(this.hammerEntity)
        MolePool.Instance().destroyAll()
        VisibilityComponent.getMutable(mole_disable).visible = false
        this.bLoaded = false;
        
    }
}

