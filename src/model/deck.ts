import Card from './card.ts';

export default class Deck {
    cards: Array<Card>;
    
    // TODO: Consider refactoring to factory pattern
    constructor(gameName: string = '', seedCards: Array<Card> = []) {
        if(gameName === 'scoundrel') {
            this.cards = this.createScoundrelDeck();
        } else {
            if(seedCards.length > 0) {
                this.cards = seedCards;
            } else {
                this.cards = this.createDefaultDeck();
            }
        }
    }

    createDefaultDeck(): Card[] {
        const cards: Card[] = [];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

        for (const suit of suits) {
            for (const value of values) {
                cards.push(new Card(suit, value));
            }
        }
        return cards as Card[];
    }

    createScoundrelDeck(): Card[] {
        const cards: Card[] = [];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
        const filteredValues = values.filter((val) => val.length < 3);

        for (const suit of suits) {
            if (suit === 'hearts' || suit === 'diamonds') {
                for (const value of filteredValues) {
                    cards.push(new Card(suit, value));
                }
            } else {
                for (const value of values) {
                    cards.push(new Card(suit, value));
                }
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

    dealCards(count: number = this.cards.length / 2): Array<Deck> {
        const hands = [];
        hands.push(new Deck('', this.cards.slice(0, count)));
        this.cards.splice(0, count);
        hands.push(new Deck('', this.cards.slice(0, count)));
        this.cards.splice(0, count);
        return hands;
    }

    drawCard(): Card | undefined {
        if (this.cards.length === 0) {
            throw Error('Deck is empty');
        }
        return this.cards.pop();
    }

    addCardsToBottom(cards: Array<Card>): void {
        this.cards.unshift(...cards);
    }
}