import { CardName } from "./cardPool";
import { Card, CardStatus } from "./card";
import { createCardsWithPositions } from "./placeCardsPosition";
import { AudioSource, AvatarAnchorPointType, AvatarAttach, Entity, SystemFn, TextShape, Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { millisToMinutesAndSeconds } from "../../utils";
import { sendScoreRequest } from "../../imports/leaderboard/leaderboard.service";
import { getLeaderboardConfig } from "../../imports/leaderboard/leaderboard.data";
import { Leaderboard } from "../../imports/leaderboard/leaderboard";
import { delay } from "../../imports/delay";
import { unlockNext } from "../seasonpass/seasonpass";

export const playerGetPoint = engine.addEntity()

AudioSource.create(playerGetPoint, {
    audioClipUrl: 'assets/audio/card_points.mp3',
    loop: false,
    playing: false,
    volume: 0.15,
})

AvatarAttach.create(playerGetPoint, {
    anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG,
})
function playSound(entity: Entity, bPlaying: boolean) {
    // fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(entity)

    // modify its playing value
    audioSource.playing = bPlaying
}
export class CardManager {
    private static instance: CardManager;

    static readonly SCORE_TO_UNLOCK_SEASON = 9

    public availableCards: Card[] = [];
    public cardsSelected: CardName[] = [];
    public idArray: number[] = [];
    public playing: boolean;
    public score: number = 0;
    public time: number = 0;
    public timerOn: boolean = false;
    public timerEntity: Entity;
    public scoreEntity: Entity;

    public static Instance(): CardManager {
        if (!CardManager.instance) {
            CardManager.instance = new CardManager();
            CardManager.instance.enableTimerSystem();
        }
        return CardManager.instance;
    }

    startGame(): void {
        this.setTime(90000);
        TextShape.getMutable(this.timerEntity).text = "<b>" + millisToMinutesAndSeconds(this.time) + "</b>"

        this.timerOn = true;
    }

    incScore(score: number): void {
        this.score += score;
        TextShape.getMutable(this.scoreEntity).text = "<b>" + this.score + "</b>"
    }

    setScore(score: number): void {
        this.score = score;
        TextShape.getMutable(this.scoreEntity).text = "<b>" + this.score + "</b>"
    }

    getScore(): number {
        return this.score;
    }

    getCardFromAvailableCards(cardName: CardName, id: number): Card {
        for (const card of this.availableCards) {
            if (card.cardName == cardName && id == card.id) {
                return card;
            }
        }
        return null;
    }

    createPanels(panelTimer: Entity, scoreEntity: Entity, tipParent: Entity): void {
        //create timer
        this.timerEntity = engine.addEntity()
        this.scoreEntity = engine.addEntity()


        Transform.createOrReplace(this.scoreEntity, {
            position: Vector3.create(0, 0, 0.05),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.scale(Vector3.One(), 0.4),
            parent: scoreEntity
        })
        TextShape.create(this.scoreEntity, {
            text: "<b>0</b>",
            fontSize: 8,
            textColor: Color4.Green(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })
        TextShape.create(this.timerEntity, {
            text: "<b>00:00</b>",
            fontSize: 8,
            textColor: Color4.White(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })

        Transform.createOrReplace(this.timerEntity, {
            position: Vector3.create(0, 0, 0.05),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.scale(Vector3.One(), 0.4),
            parent: panelTimer
        })

        const tipEntity = engine.addEntity()
        Transform.create(tipEntity, {
            position: Vector3.create(-0.0,0.05,0),
            scale: Vector3.scale(Vector3.One(), 0.9),
            rotation: Quaternion.fromEulerDegrees(90,-90,0),
            parent: tipParent
        })
        TextShape.create(tipEntity, {
            text: "<b>CLICK THE CARDS AND MATCH PAIRS</b>",
            fontSize: 3,
            textColor: Color4.White(),
            outlineWidth: 0.1,
            outlineColor: Color4.Black()
        })
    }

    checkValues(id: number): void {
        this.idArray.push(id);
        if (this.cardsSelected.length == 2) {
            // Si ya hay dos elementos, verificar sus IDs

            if (this.cardsSelected[0] === this.cardsSelected[1]) {
                playSound(playerGetPoint, true)

                for (let i = 0; i < this.idArray.length; i++) {
                    this.findCardsToDisable(this.cardsSelected[i], this.idArray[i]);
                }
            } else {
                for (let i = 0; i < this.idArray.length; i++) {
                    let card1 = this.getCardFromAvailableCards(this.cardsSelected[i], this.idArray[i])
                    delay(() => {
                        card1.playUnswapAnimation();
                    }, 1000);
                }
                this.cardsSelected = [];
            }
            this.cardsSelected = [];
            this.idArray = [];
        }
    }

    findCardsToDisable(cardName: CardName, id: number): void {
        let card1 = this.getCardFromAvailableCards(cardName, id)
        card1.status = CardStatus.Linked;
        this.incScore(.5);
        if (this.checkAllcardsLinked()) {
            delay(() => {
                this.resetGame();
            }, 1500);
        }
    }

    destroyGame(): void {
        this.playing = false;
        this.score = 0;
        //delete all entities
        engine.removeSystem(this.timerSystem);
        engine.removeEntity(this.timerEntity);
        engine.removeEntity(this.scoreEntity);
        for (const card of this.availableCards) {
            engine.removeEntity(card.entity);
        }
    }

    resetGame(): void {
        if(this.playing == true){
            console.log("swap cards at reset ");
            this.swapAllCards();
        }
        //this.setScore(0)
        //this.availableCards = [];
        this.cardsSelected = [];
        this.idArray = [];
        createCardsWithPositions()
    }

    checkAllcardsLinked(): boolean {
        for (const card of this.availableCards) {
            if (card.status != CardStatus.Linked) {
                return false;
            }
        }
        return true;
    }

    swapAllCards(): void {
        for (const card of this.availableCards) {
            /*if (card.status === CardStatus.Swapped) {
                console.log("card " + card.cardName + " reset flip");
                card.status = CardStatus.Enabled;
                card.playSwapAnimation();
            }*/
            card.playUnswapAnimation();
        }
    }

    swapResetCards(): void {
        for (const card of this.availableCards) {
            if (card.status === CardStatus.Linked) {
                console.log("card " + card.cardName + " reset flip");
                card.playUnswapAnimation();
            }
        }
    }

    isPlaying(): boolean {
        return this.playing;
    }

    private setTime(time: number) {
        this.time = time
        TextShape.getMutable(this.timerEntity).text = "<b>" + millisToMinutesAndSeconds(this.time) + "</b>"
    }

    private enableTimerSystem() {
        engine.addSystem((dt: number) => {
            this.timerSystem(dt)
        })
    }

    private timerSystem(dt: number) {
        if (!this.timerOn) return;
        if ((this.time - dt * 1000) <= 0) {
            this.endGame()
            return;
        }
        this.setTime(this.time - dt * 1000)
    }

    private endGame() {
        console.log("END GAME");
        this.playing = false;
        this.timerOn = false;
        this.setTime(0)
        //this.swapResetCards();
        //this.swapAllCards();
        sendScoreRequest("avatar_garden_cards", {
            score: this.score,
        }, () => {
            if (getLeaderboardConfig("avatar_garden_cards")?.REQUEST_MY_SCORE) {
                Leaderboard.instance().requestDataAndUpdatePanels("avatar_garden_cards", 0)
            }
        })
        if (this.score >= CardManager.SCORE_TO_UNLOCK_SEASON) {
            unlockNext()
        }
        delay(() => {
            this.setScore(0)
            this.resetGame();
        }, 1500);
    }
}