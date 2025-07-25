import Deck from './deck.js';
import Card from './card.js';

describe('Card', () => {
    test('can be initialized', () => {
        let testCard = new Card('hearts', 'A');
        expect(testCard.suit).toBe('hearts');
        expect(testCard.value).toBe('A');
        expect(testCard.printCard()).toBe('A of hearts');

    });
});