import Deck from "../model/deck";
import Card from "../model/card";
import { useState } from "react";

export default function Scoundrel() {

    const startingDeck = new Deck('scoundrel');
    startingDeck.shuffleDeck();

    let startingRoom: Card[] = [];

    for (let i = 0; i < 4; i++) {
        let roomCard = startingDeck.drawCard();
        if (roomCard === undefined) break;
        startingRoom.push(roomCard);
    }

    const [deck, setDeck] = useState<Deck>(startingDeck);
    const [room, setRoom] = useState<Array<Card>>(startingRoom);
    const [life, setLife] = useState<number>(20);

    console.log(deck);
    console.log(room);
    
    // TODO:
    // Add logic for interacting with cards in the room
    // Add logic for fleeing a room
    // Add logic for managing equipped weapon


    return (
        <>
            <h1>Scoundrel</h1>
                <div className="game-flex-row">
                    <div>
                        <h2>Dungeon Deck</h2>
                        <div className="deck-container">
                            <img src='./src/assets/red_card_back.png' height="200px" width="auto"></img>
                            <p className="overlay-text">{deck.cards.length}</p>
                        </div>
                    </div>
                    <div>
                        <h2>Room</h2>
                        {room.map((card) => <img height="200px" src={card.getImageFileName()}></img>)}
                    </div>
                </div>
                <div>
                    <h2>Life: {life}</h2>
                    <h2>Current Weapon</h2>
                </div>
        </>
    );
};