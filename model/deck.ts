import Card from './card.ts';

export default class Deck {
    cards: Array<Card>;
    
    constructor(cards = []) {
        if(cards.length === 0) {
            this.cards = this.createDefaultDeck();
        } else {
            this.cards = cards;
        }
    }

    createDefaultDeck(): Card[] {
        const cards : Card[] = [];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

        for (const suit of suits) {
            for (const value of values) {
                cards.push(new Card(suit, value));
            }
        }
        return cards as Card[];
    }

    shuffleDeck(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * i);
            const cardToSwap: Card = this.cards[j];
            this.cards[j] = this.cards[i];
            this.cards[i] = cardToSwap;
        } 
    }

    drawCard(): Card | undefined {
        if (this.cards.length === 0) {
            throw Error('Deck is empty');
        }
        return this.cards.pop();
    }
}