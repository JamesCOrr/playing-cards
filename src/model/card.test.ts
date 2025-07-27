import Card from './card.ts';
import { expect, test, describe } from 'vitest'


describe('Card', () => {
    test('can be initialized', () => {
        let testCard = new Card('hearts', 'A');
        expect(testCard.getSuit()).toBe('hearts');
        expect(testCard.getValue()).toBe('A');
        expect(testCard.getImageFileName()).toBe('./src/assets/A_of_hearts.svg');
        expect(testCard.getNumericValue()).toBe(14);
    });
});