import { Animator, ColliderLayer, Entity, GltfContainer, MeshCollider, Transform, VisibilityComponent, engine } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { Card } from "./card";
import { createCardsWithPositions } from "./placeCardsPosition";
import { CardManager } from "./cardGame.manager";
export enum CardName {
    card1 = "Card_0",
    card2 = "Card_1",
    card3 = "Card_2",
    card4 = "Card_3",
    card5 = "Card_4",
    card6 = "Card_5",
    card7 = "Card_6",
    card8 = "Card_7",
    card9 = "Card_8",
    card10 = "Card_9",
    card11 = "Card_10",
    card12 = "Card_11",
    card13 = "Card_12",
    card14 = "Card_13",
    card15 = "Card_14",
    card16 = "Card_15",
    card17 = "Card_16",
    card18 = "Card_17",
}
export class CardPool {
    private static instance: CardPool;
    public cardPool: Card[] = [];

    public static Instance(): CardPool {
        if (!CardPool.instance) {
            CardPool.instance = new CardPool();
        }
        return CardPool.instance;
    }
    private constructor() {
        this.cardPool = []
    }
    public createCardPool(): void {
        createCardsWithPositions()
    }

    //Get a card from the pool
    public getCardFromPool(cardName: CardName, id: number): Card {
        for (const card of this.cardPool) {
            if (card.cardName == cardName && id == card.id) {
                return card;
            }
        }
        return null;
    }

    //Get a card from the pool or create a new one
    public getCard(cardType: CardName, id: number): Card {
        const card = this.getCardFromPool(cardType, id);
        if (card) {
            return card;
        } else {
            console.log('Card doesnt exist' + cardType + ' with id ' + id);
        }
    }
}
