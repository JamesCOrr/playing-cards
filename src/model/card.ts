import valueMap from './valueMap.ts';

export default class Card {
    suit: string;
    value: string;

    constructor(suit: string, value: string) {
        this.suit = suit;
        this.value = value;
    }

    public getSuit(): string {
        return this.suit;
    }

    // TODO: Refactor to ScoundrelCardType?
    public getScoundrelType(): string {
        return this.suit === 'diamonds' ? 'weapon' : this.suit === 'hearts' ? 'potion' : 'monster';
    }

    public getValue(): string {
        return this.value;
    }

    public getNumericValue(): number {
        return valueMap.get(this.value) ?? 0;
    }

    public getPrettyName(): string {
        return `${this.value} of ${this.suit}`;
    }

    public getImageFileName(): string {
        return `./src/assets/${this.value}_of_${this.suit}.svg`;
    }
}