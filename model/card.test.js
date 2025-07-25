import Deck from './deck.ts';
import Card from './card.ts';
import { expect, test, describe } from 'vitest'


describe('Card', () => {
    test('can be initialized', () => {
        let testCard = new Card('hearts', 'A');
        expect(testCard.suit).toBe('hearts');
        expect(testCard.value).toBe('A');
        expect(testCard.printCard()).toBe('A of hearts');

    });
});