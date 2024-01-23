type CardID = {
  id: number;
};

export const cardList: Record<number, CardID> = {};
export const selectedCards: number[] = new Array<number>(9).fill(0);

export function getCardList() {
  for (let i = 0; i < 18; i++) {
    cardList[i] = { id: i };
  }

  const selectedSet = new Set<number>();

  for (let i = 0; i < 9; i++) {
    let randomId: number;

    do {
      randomId = Math.floor(Math.random() * 18);
    } while (selectedSet.has(randomId));

    selectedSet.add(randomId);

    const card = cardList[randomId];
    selectedCards[i] = card.id;
  }
}

