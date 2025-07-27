import Deck from './deck.ts';
import { expect, test, describe } from 'vitest'


describe('Default deck', () => {
    let testDeck = new Deck();
    expect(testDeck.cards.length === 52);
    test('should draw the Ace of Spades', () => {
        let drawnCard = testDeck.drawCard();
        expect(drawnCard).toBeDefined();
        if(drawnCard) {
            expect(drawnCard.suit).toBe('spades');
            expect(drawnCard.value).toBe('ace');
            expect(testDeck.cards.length === 51);
        }
    });
});