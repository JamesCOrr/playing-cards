import Card from './card.js';

export default class Deck {
    
    constructor(cards = []) {
        if(cards.length === 0) {
            this.cards = this.createDefaultDeck();
        } else {
            this.cards = cards;
        }
    }

    createDefaultDeck() {
        const deck = [];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (const suit of suits) {
            for (const value of values) {
                deck.push(new Card(suit, value));
            }
        }
        return deck;
    }

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            cardToSwap = this.cards[j];
            this.cards[j] = this.cards[i];
            this.cards[i] = cardToSwap;
        } 
    }

    drawCard() {
        return this.cards.pop();
    }
}