import { Entity, engine } from "@dcl/sdk/ecs";
import { Card, CardStatus } from "./card";
import { CardManager } from "./cardGame.manager";
import { Vector3 } from "@dcl/ecs-math";
import { selectedCards } from "./randomCardGenerator";
import { CardName, CardPool } from "./cardPool";

export const initialPositions: Vector3[] = [];

export function createCardsWithPositions() {
    console.log("createCardsPositions")
    const rows = 6;
    const columns = 3;
    const marginX = .8;
    const marginY = .8;


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            let positionX = col * marginX - 1;
            let positionZ = row * marginY - 2;
            initialPositions.push(Vector3.create(positionX, 0, positionZ));
        }
    }
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            let i = row * columns + col;
            let j
            if (i <= 35) { 
                if (i > 8){
                    j = -(i - 17);
                    let cardName = "Card_" + (selectedCards[j]);
                    shuffleArray(initialPositions)
                    let newPosition = initialPositions.pop();
                    try {
                        var newCard
                        if (CardPool.Instance().getCard(cardName as CardName, i)!= null)  {
                            newCard = CardPool.Instance().getCard(cardName as CardName, i);
                            newCard.changePosition(newPosition);
                            newCard.playSwapCard();
                            newCard.status = CardStatus.Enabled;
                            CardManager.Instance().availableCards.push(newCard);
                        } else {
                            CardPool.Instance().cardPool.push(newCard = new Card(cardName as CardName, i, newPosition));
                            CardManager.Instance().availableCards.push(newCard);
                        }
                    }
                    catch {
                        console.log("error creating card " + cardName + " at position " + newPosition);
                    }
                }else{
                    let cardName = "Card_" + (selectedCards[i]);
                    // Calcular la posición en función de la fila, columna y márgenes
                    let newPosition = initialPositions.pop();
                    try {
                        var newCard
                        if (CardPool.Instance().getCard(cardName as CardName, i)!= null)  {
                            newCard = CardPool.Instance().getCard(cardName as CardName, i);
                            newCard.changePosition(newPosition);
                            newCard.playSwapCard();
                            newCard.status = CardStatus.Enabled;
                            CardManager.Instance().availableCards.push(newCard);
                        } else {
                            CardPool.Instance().cardPool.push(newCard = new Card(cardName as CardName, i, newPosition));
                            CardManager.Instance().availableCards.push(newCard);
                        }
                    }
                    catch {
                        console.log("error creating card " + cardName + " at position " + newPosition);
                    }
                }
            }
        }
    }
}

// Función para mezclar un array utilizando el algoritmo de Fisher-Yates
function shuffleArray(array: Vector3[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
