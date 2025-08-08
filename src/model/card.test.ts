import Card from './card.ts';
import { expect, test, describe } from 'vitest'


describe('Card', () => {
    test('can be initialized', () => {
        let testCard = new Card('hearts', 'ace');
        expect(testCard.getSuit()).toBe('hearts');
        expect(testCard.getValue()).toBe('ace');
        expect(testCard.getImageFileName()).toBe('./src/assets/ace_of_hearts.svg');
        expect(testCard.getNumericValue()).toBe(14);
    });
});