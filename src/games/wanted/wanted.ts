import { ColliderLayer, Entity, InputAction, Material, MeshCollider, MeshRenderer, TextShape, Transform, VisibilityComponent, engine } from "@dcl/sdk/ecs";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { addDebugPivot } from "../../imports/components/debugPivot";
import { Vector2 } from "~system/EngineApi";
import { clamp, millisToMinutesAndSeconds, randomIntFromInterval } from "../../utils";
import { 
    activateFace, createFace, deactivateFace, destroyAll, disableGreenHighlight, disableRedHighlight, 
    enableHoverSystem, getOrCreateTexture, getPosition, setHighlightGreen, setHighlightRed, setSelected 
} from "./wantedFaces";
import { delay } from "../../imports/delay";
import { MoveComponent, setMovementCallback } from "../../imports/tween/movement/movement.component";
import { MovementType } from "../../imports/tween/movement/movement.schema";
import { activate, setTarget } from "../../imports/tween/movement/movement";
import { addPmPointerDown } from "../../imports/components/pointer";
import { sendScoreRequest } from "../../imports/leaderboard/leaderboard.service";
import { getLeaderboardConfig } from "../../imports/leaderboard/leaderboard.data";
import { Leaderboard } from "../../imports/leaderboard/leaderboard";
import { isLoaded, unlockNext } from "../seasonpass/seasonpass";
import { AudioManager } from "../audio";
import { uiGuestCanvasData, uiGuestData } from "../../imports/guestUI/uiGuest.data";



export class Wanted {
    readonly IMAGE_COUNT: number = 21
    readonly BOARD_SIZE: Vector2 = { x: 0.8, y: 0.8 }
    readonly FACE_SIZE: number = 0.15
    readonly GRID_SIZE: Vector2 = { x: 0.1, y: 0.1 }
    readonly ROW_SEPARATION: number = 1.6
    readonly LAYER_POS: number[] = [0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.010]
    readonly START_TIME: number = 30 * 1000
    static readonly SCORE_TO_UNLOCK_SEASON: number = 15
    
    //Difficulty scale
    readonly CORRECT_LAYER: number[] = [
        9,9,    //0-1
        9,9,    //2-3
        6,6,    //4-5
        6,9,    //6-7
        8,7,    //8-9
        6,5,    //10-11
        5,4,    //12-13
        3,2,    //14-15
        2,0,    //16-17
    ]
    readonly SPAWN_CHANCE: number[] = [
        .6, 1,  //0-1
        .5, .6, //2-3 
        .8, .7, //4-5 
        .7, .7, //6-7 
        .7, .8, //8-9
        .8, .8, //10-11
        .8, .9,  //12-13
        .9, .9,  //14-15
        .9, .9,  //16-17
        .9, .95,  //18-19
    ]
    readonly EXTRA_ROW_SEPARATION: number[] = [
        1, 1,   //0-1
        0       //2-3
    ]
    readonly COLLUMN_COUNT: number[] = [
        3, 3,   //0-1
        5, 5,   //2-3
        6, 8,   //4-5
        8, 0,   //6-7
        0, 0,   //8-9
    ]
    readonly ADD_TIME: number[] = [
        5, 5,   //0-1
        5, 5,   //2-3
        5, 5,   //4-5
        5, 5,   //6-7
        5, 5,   //8-9
        5, 5,   //10-11
        5, 5,   //12-13
        4, 4,   //14-15
        4, 3,   //16-17
        3, 3,   //18-19
    ]
    readonly SCORE_TO_ADD_DIFFICULTY: number = 2
    
    private parent: Entity
    private boardEntity: Entity
    private wantedEntity: Entity
    //private wantedEntityShadow: Entity
    private faceIndexes: number[] = []
    private correctImageIndex: number = -1
    private correctIndex: number = -1
    private selectedIndex: number = -1
    private correctLayer: number = this.LAYER_POS.length-1
    private spawnChance: number = 1
    private difficulty: number = 0
    private score: number = 0
    private nRound: number = 0
    private readonly posBoard: Vector3 = Vector3.Zero()
    private extraRowSeparation: number = 1
    private gridX = this.calculateGridX()
    private gridY = this.calculateGridY()
    private collumnCount: number = this.gridY

    //Score
    readonly SCORE_PLAY_POS: Vector3 = Vector3.create(0.6, -0.03, 0.05)
    readonly SCORE_END_POS: Vector3 = Vector3.create(0, this.BOARD_SIZE.y/2+0.1, -0.02)
    private scoreEntity: Entity
    private scoreText: Entity
    private scoreFaces: Entity[] = []
    private addScoreEntity: Entity
    //Time
    private timeEntity: Entity
    private time: number = this.START_TIME
    private addTimeOnSuccess: number = 0
    private restTimeOnFail: number = 2000
    private activeCountdown: boolean = false

    private playAgainEntity: Entity

    private bIsPlaying: boolean = false
    
    constructor(parent: Entity, timmerParent: Entity, scoreParent: Entity, wantedParent: Entity, tipParent: Entity) {
        this.parent = engine.addEntity()
        Transform.create(this.parent, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.fromEulerDegrees(90,-90,0),
            scale: Vector3.create(5,5,1),
            parent: parent
        })
        //addDebugPivot(this.parent, 0.05)

        this.boardEntity = engine.addEntity()
        this.posBoard = Vector3.create(0,0,0)
        Transform.create(this.boardEntity, {
            position: this.posBoard,
            scale: Vector3.create(this.BOARD_SIZE.x, this.BOARD_SIZE.y, 1),
            parent: this.parent
        })
        //WANTED IMG
        this.wantedEntity = engine.addEntity()
        Transform.create(this.wantedEntity, {
            position: Vector3.create(0, 0, 0.05),
            rotation: Quaternion.fromEulerDegrees(0,180,0),
            scale: Vector3.scale(Vector3.One(), 1),
            parent: wantedParent
        })
        MeshRenderer.setPlane(this.wantedEntity)
        VisibilityComponent.create(this.wantedEntity, { visible: true })
        /*
        this.wantedEntityShadow = engine.addEntity()
        Transform.createOrReplace(this.wantedEntityShadow, {
            position: Vector3.create(0,0,0.0001),
            scale: Vector3.create(1.1,1.1,1),
            parent: this.wantedEntity
        })
        MeshRenderer.setPlane(this.wantedEntityShadow)
        */

        //SCORE
        this.scoreEntity = engine.addEntity()
        Transform.create(this.scoreEntity, {
            position: this.SCORE_PLAY_POS,
            rotation: Quaternion.fromEulerDegrees(0,180,0),
            scale: Vector3.scale(Vector3.One(), 0.4),
            parent: scoreParent
        })

        this.setScoreImage(0, 1)
        this.disableScoreImage(0)

        this.scoreText = engine.addEntity()
        Transform.create(this.scoreText, {
            position: Vector3.create(0,0,-0.01),
            scale: Vector3.scale(Vector3.One(), 0.5),
            parent: this.scoreFaces[0]
        })
        TextShape.create(this.scoreText, {
            text: "",
            fontSize: 10,
            textColor: Color4.Red(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })

        this.addScoreEntity = engine.addEntity()
        Transform.create(this.addScoreEntity, {
            position: Vector3.create(0,0,-0.02),
            scale: Vector3.scale(Vector3.One(), 0.2),
            parent: this.parent
        })
        TextShape.create(this.addScoreEntity, {
            text: "+1",
            fontSize: 5,
            textColor: Color4.Green(),
            outlineWidth: 0.15,
            outlineColor: Color4.Black()
        })
        VisibilityComponent.create(this.addScoreEntity, { visible: false })

        //TIMER
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

        const tipEntity = engine.addEntity()
        Transform.create(tipEntity, {
            position: Vector3.create(-0.0,0.05,0),
            scale: Vector3.scale(Vector3.One(), 0.9),
            rotation: Quaternion.fromEulerDegrees(90,-90,0),
            parent: tipParent
        })
        TextShape.create(tipEntity, {
            text: "<b>CLICK THE CORRECT STICKER</b>",
            fontSize: 4,
            textColor: Color4.White(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })

        const debugPanel = engine.addEntity()
        Transform.create(debugPanel, {
            parent: this.boardEntity,
            position: Vector3.create(0,0,-0.01),
            scale: Vector3.create(2,1.4,1),
        })

        //addDebugPivot(debugPanel, 0.03)

        MeshRenderer.setPlane(debugPanel)
        Material.setPbrMaterial(debugPanel, { 
            albedoColor: Color4.Black(),
            metallic: 0,
            roughness: 1,
        })

        this.startGame()
        enableHoverSystem()
        this.enableTimerSystem()

        /*this.setScore(1)
        this.setScore(2)
        this.setScore(3)
        this.setScore(4)
        this.setScore(5)
        delay(()=> {
            this.setScore(6)
            this.setScore(7)
            this.setScore(8)
            this.setScore(9)
        }, 500)*/
    }

    startGame() {
        disableRedHighlight()
        VisibilityComponent.getMutable(this.playAgainEntity).visible = false
        MeshCollider.getMutable(this.playAgainEntity).collisionMask = ColliderLayer.CL_NONE
        Transform.getMutable(this.scoreEntity).position = this.SCORE_PLAY_POS
        this.setScore(0)
        this.nRound = 0
        this.setTime(this.START_TIME)
        this.setDifficulty(0)
        this.nextRound()
        VisibilityComponent.getMutable(this.wantedEntity).visible = true
        
        AudioManager.instance().playGameMusic({
            parent: this.parent,
            pitch: 1
        })
    }

    setDifficulty(difficulty: number) {

        this.difficulty = difficulty
        this.spawnChance = this.getDifficultyValue(this.SPAWN_CHANCE)
        this.correctLayer = this.getDifficultyValue(this.CORRECT_LAYER)
        this.extraRowSeparation = this.getDifficultyValue(this.EXTRA_ROW_SEPARATION)
        this.gridX = this.calculateGridX()
        this.gridY = this.calculateGridY()
        this.collumnCount = this.getDifficultyValue(this.COLLUMN_COUNT)
        if(this.collumnCount == 0) this.collumnCount = this.gridY
        this.addTimeOnSuccess = this.getDifficultyValue(this.ADD_TIME) * 1000

    }

    private getDifficultyValue<T>(array: T[]): T {
        return array[clamp(this.difficulty, 0, array.length-1)]
    }

    getScore() {
        return this.score
    }

    private setScoreImage(index:number, imgIndex: number) {
        if(!this.scoreFaces[index]) {
            this.scoreFaces[index] = engine.addEntity()
            Transform.create(this.scoreFaces[index], {
                position: Vector3.create(index*0.7, 0,  -index*0.001),
                scale: Vector3.scale(Vector3.One(), 1),
                parent: this.scoreEntity
            })
            MeshRenderer.setPlane(this.scoreFaces[index])
            VisibilityComponent.create(this.scoreFaces[index], { visible: true })
        }

        Transform.getMutable(this.scoreFaces[index]).position = Vector3.create(index*0.7, 0,  -index*0.001)
        VisibilityComponent.getMutable(this.scoreFaces[index]).visible = true
        Material.setBasicMaterial(this.scoreFaces[index], {
            texture: getOrCreateTexture(imgIndex),
        })
    }

    private disableScoreImage(index: number) {
        if(!this.scoreFaces[index]) return;
        VisibilityComponent.getMutable(this.scoreFaces[index]).visible = false
    }

    private setScore(score: number) {
        this.score = score
        if(score == 0) {
            TextShape.getMutable(this.scoreText).text = ""
            for (let i = 0; i < this.scoreFaces.length; i++) {
                this.disableScoreImage(i)
            }
            return;
        }
        if(score >= 5) {
            TextShape.getMutable(this.scoreText).text = "<b>" + (score - score%5) + "</b>"
        }
        if(score%5 == 0) {
            this.setScoreImage(5, this.correctImageIndex)
            this.moduleScoreAnim()
            
            return;
        }
        this.setScoreImage(score%5, this.correctImageIndex)
    }

    private moduleScoreAnim() {
        for (let i = 1; i < this.scoreFaces.length; i++) {
            
            if(!MoveComponent.has(this.scoreFaces[i])) {
                MoveComponent.create(this.scoreFaces[i], {
                    type: MovementType.Simple,
                    bInicialized: false,
                    bActive: false,
                    entity: this.scoreFaces[i],
                })
            }

            setTarget(this.scoreFaces[i], Vector3.create(0, 0, -i*0.001))
            activate(this.scoreFaces[i], 1.5*i)
        }
        setMovementCallback(this.scoreFaces[this.scoreFaces.length-1], () => {
            
            for (let i = 1; i < this.scoreFaces.length; i++) {
                this.disableScoreImage(i)
            }
            this.setScoreImage(0, this.correctImageIndex)
        })
    }

    private setTime(time: number) {
        this.time = time
        TextShape.getMutable(this.timeEntity).text = "<b>" + millisToMinutesAndSeconds(this.time) + "</b>"
    }
    private addTime(time: number) {
        this.setTime(this.time + time)

        const pos = getPosition(this.selectedIndex)
        Transform.getMutable(this.addScoreEntity).position = Vector3.create(pos.x, pos.y+0.1, -0.1)
        TextShape.getMutable(this.addScoreEntity).text = "<b>+" + Math.floor(time/1000) + "</b>"
        TextShape.getMutable(this.addScoreEntity).textColor = Color4.Green()
        VisibilityComponent.getMutable(this.addScoreEntity).visible = true
        delay(()=> {
            VisibilityComponent.getMutable(this.addScoreEntity).visible = false
        }, 2000)
    }

    private restTime(time: number) {
        this.setTime(this.time - time)

        const pos = getPosition(this.selectedIndex)
        Transform.getMutable(this.addScoreEntity).position = Vector3.create(pos.x, pos.y+0.1, -0.1)
        TextShape.getMutable(this.addScoreEntity).text = "<b>-" + Math.floor(time/1000) + "</b>"
        TextShape.getMutable(this.addScoreEntity).textColor = Color4.Red()
        VisibilityComponent.getMutable(this.addScoreEntity).visible = true
        delay(()=> {
            VisibilityComponent.getMutable(this.addScoreEntity).visible = false
        }, 2000)
    }

    private setRandomCorrectImage() {
        this.correctImageIndex = randomIntFromInterval(1, this.IMAGE_COUNT)
        Material.setBasicMaterial(this.wantedEntity, {
            texture: getOrCreateTexture(this.correctImageIndex),
        })

        /*
        Material.setPbrMaterial(this.wantedEntityShadow, {
            texture: getOrCreateTexture(this.correctImageIndex),
            transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST,
            albedoColor: Color4.Green(),
            emissiveColor: Color4.Green(),
            emissiveIntensity: 0.5,
        })
        */
    }

    private calculateGridX() {
        return Math.floor(this.BOARD_SIZE.x / this.GRID_SIZE.x )
    }
    private calculateGridY() {
       return Math.floor(this.BOARD_SIZE.y / this.GRID_SIZE.y / (this.ROW_SEPARATION + this.extraRowSeparation) * 2)
    }

    private createGrid() {

        this.gridX = this.calculateGridX()
        this.gridY = this.calculateGridY()

        const randomI = randomIntFromInterval(0, this.gridX-1)
        const randomJ = randomIntFromInterval(Math.floor(this.gridY/2-this.collumnCount/2), Math.floor(this.gridY/2+this.collumnCount/2)-1)
        let lastRandomLayer = 0
        let randomLayer = 0
        let randomImage = 0
        let index = 0
        
        for (let i = 0; i < this.gridX; i++) {
            for (let j = 0; j < this.gridY; j++) {
                
                if(j < Math.floor(this.gridY/2-this.collumnCount/2) || j >= Math.floor(this.gridY/2+this.collumnCount/2)) continue;

                if((i != randomI || j != randomJ) && Math.random() > this.spawnChance) continue;

                randomLayer = randomIntFromInterval(0, this.LAYER_POS.length-1)
                if(randomLayer == lastRandomLayer) {
                    if(randomLayer < this.LAYER_POS.length-1) randomLayer++
                    else randomLayer = 0
                }
                randomImage = randomIntFromInterval(1, this.IMAGE_COUNT)
                if(randomImage == this.correctImageIndex) {
                    if(randomImage < this.IMAGE_COUNT) randomImage++
                    else randomImage = 1
                }

                this.spawnFace(index, i, j, randomLayer, randomImage, (i == randomI && j == randomJ))
                index++


                lastRandomLayer = randomLayer
            }
        }
    }

    private spawnFace(index: number, i: number, j: number, layer: number, imgIndex: number, bCorrect: boolean) {
        if(!this.faceIndexes[index]) {
            this.faceIndexes[index] = createFace()
        }
        if(bCorrect) {
            this.correctIndex = this.faceIndexes[index]
            imgIndex = this.correctImageIndex
            layer = this.correctLayer
        }
        
        activateFace(this.faceIndexes[index], {
            position: this.getPosInGrid(i, j, layer),
            scale: Vector3.create(this.FACE_SIZE, this.FACE_SIZE, 1),
            imgIndex: imgIndex,
            parent: this.parent,
            clickCallback: (face, index) => {
                this.clickFace(index)
            }
        })
    }

    private getPosInGrid(i: number, j: number, layer: number) {
        
        return Vector3.create(
            this.posBoard.x + (-this.BOARD_SIZE.x/2+this.GRID_SIZE.x/4) + i*(this.GRID_SIZE.x) + (j%2==0 ? this.GRID_SIZE.x/2 : 0),
            this.posBoard.y + (this.BOARD_SIZE.y/2-this.GRID_SIZE.y/4)-j*this.GRID_SIZE.y/2*(this.ROW_SEPARATION + this.extraRowSeparation),
            -this.LAYER_POS[layer]-0.02
            //-0.1
        )
        
    }

    clickFace(index: number) {
        if(this.selectedIndex >= 0) return;
        this.selectedIndex = index
        this.stopClock()
        setSelected(true)
        if(index == this.correctIndex) {
            this.success()
        }
        else {
            this.fail()
        }

        delay(()=>{
            setHighlightRed(index, false)
            setHighlightGreen(index, false)
            setSelected(false)
            this.nextRound()
        }, 2000)
    }

    fail() {
        disableGreenHighlight()
        setHighlightRed(this.selectedIndex, true)
        this.faceIndexes.forEach(index => {
            if(index == this.correctIndex) return;
            if(index == this.selectedIndex) return;
            deactivateFace(index)
        });

        this.restTime(this.restTimeOnFail)

        AudioManager.instance().playFail({ parent: this.boardEntity })
    }

    success() {
        disableRedHighlight()
        this.setScore(this.score+1)
        this.faceIndexes.forEach(index => {
            if(index == this.correctIndex) return;
            deactivateFace(index)
        });

        this.addTime(this.addTimeOnSuccess)
        this.setDifficulty(Math.floor(this.score / this.SCORE_TO_ADD_DIFFICULTY))

        AudioManager.instance().playSuccess({ parent: this.boardEntity })
    }

    nextRound() {
        this.nRound++
        if(this.nRound > 1) {
            this.bIsPlaying = true
            this.resumeClock()
        }
        if(this.correctIndex >= 0) {
            deactivateFace(this.correctIndex)
        }
        if(this.selectedIndex >= 0) {
            deactivateFace(this.selectedIndex)
        }
        this.setRandomCorrectImage()
        this.createGrid()
        this.selectedIndex = -1
    }

    gameOver() {
        this.stopClock()
        disableGreenHighlight()
        disableRedHighlight()

        setHighlightRed(this.correctIndex, true)
        this.faceIndexes.forEach(index => {
            if(index == this.correctIndex) return;
            deactivateFace(index)
        });

        AudioManager.instance().playFail({ parent: this.boardEntity })

        //Transform.getMutable(this.scoreEntity).position = this.SCORE_END_POS
        //VisibilityComponent.getMutable(this.wantedEntity).visible = false

        delay(()=>{
            TextShape.getMutable(this.playAgainEntity).text = "<b>PLAY AGAIN?</b>"
            VisibilityComponent.getMutable(this.playAgainEntity).visible = true
            MeshCollider.getMutable(this.playAgainEntity).collisionMask = ColliderLayer.CL_POINTER
            AudioManager.instance().stopGameMusic()
            
            this.bIsPlaying = false
        }, 2000)

        sendScoreRequest("avatar_garden_wanted", {
            score: this.score,
        }, ()=>{
            if(getLeaderboardConfig("avatar_garden_wanted")?.REQUEST_MY_SCORE) {
                Leaderboard.instance().requestDataAndUpdatePanels("avatar_garden_wanted", 0)
            }
        })
        if(!isLoaded()) {
            uiGuestData.mode = 3
            uiGuestCanvasData.visible = true
            return;
        }
        if(this.score >= Wanted.SCORE_TO_UNLOCK_SEASON) {
            unlockNext()
        }
    }

    isPlaying() {
        return this.bIsPlaying
    }

    private stopClock() {
        this.activeCountdown = false
        AudioManager.instance().stopClock()
    }

    private resumeClock() {
        this.activeCountdown = true
        AudioManager.instance().playClock({
            parent: this.timeEntity,
            pitch: 0.5
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

    destroyGame() {
        engine.removeEntity(this.parent)
        engine.removeEntity(this.boardEntity)
        engine.removeEntity(this.wantedEntity)
        engine.removeEntity(this.scoreEntity)
        engine.removeEntity(this.scoreText)
        engine.removeEntity(this.addScoreEntity)
        engine.removeEntity(this.timeEntity)
        engine.removeEntity(this.playAgainEntity)
        destroyAll()
    }
}