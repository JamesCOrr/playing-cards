import Deck from './deck.js';
import Card from './card.js';

describe('Default deck', () => {
    let testDeck = new Deck();
    expect(testDeck.cards.length === 52);
    test('should draw the Ace of Spades', () => {
        let drawnCard = testDeck.drawCard();
        expect(drawnCard.suit).toBe('spades');
        expect(drawnCard.value).toBe('A');
    });
});