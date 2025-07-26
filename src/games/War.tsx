import Deck from "../model/deck";

export default function War() {
    
    const deck = new Deck();
    deck.shuffleDeck();
    console.log(deck.dealCards());
    // TODO: initialize state for each players hand


    return (
        <h1>This is war!</h1>
    );
}