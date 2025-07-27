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

    public getValue(): string {
        return this.value;
    }

    public getNumericValue(): number|undefined {
        return valueMap.get(this.value);
    }

    public getPrettyName(): string {
        return `${this.value} of ${this.suit}`;
    }

    public getImageFileName(): string {
        return `./src/assets/${this.value}_of_${this.suit}.svg`;
    }
}