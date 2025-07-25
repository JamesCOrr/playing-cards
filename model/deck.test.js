import Deck from './models/deck.ts';
import Card from './models/card.ts';
import { expect, test, describe } from 'vitest'


describe('Default deck', () => {
    let testDeck = new Deck();
    expect(testDeck.cards.length === 52);
    test('should draw the Ace of Spades', () => {
        let drawnCard = testDeck.drawCard();
        expect(drawnCard.suit).toBe('spades');
        expect(drawnCard.value).toBe('A');
    });
});