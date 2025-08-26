import { useMemo, useState } from "react";
import type Card from "../model/card";
import Deck from "../model/deck";

export default function FiftyTwoCardPickup() {

    const startingDeck = new Deck();
    startingDeck.shuffleDeck();

    const [deck, setDeck] = useState<Deck>(startingDeck);
    const [activeCard, setActiveCard] = useState<Card | null>();
    const [deckSize, setDeckSize] = useState<number>(deck.cards.length);

    useMemo(() => {
        setDeckSize(deck.cards.length);
    }, [deck.cards.length]);

    const drawCard = () => {
        setActiveCard(deck.drawCard())
    }

    return (
        <>
            <h1>This is 52 card pickup!</h1>
            <div className="game-flex-row">
                <div className="deck-container">
                    <img onClick={drawCard} src='./src/assets/red_card_back.png' height="200px" width="auto"></img>
                    <p className="overlay-text">{deckSize}</p>
                </div>
                {activeCard && 
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={activeCard.getImageFileName()} height="200px" width="auto"></img>
                            </div>
                            <div className="flip-card-back">
                                <img onClick={drawCard} src='./src/assets/red_card_back.png' height="200px" width="auto"></img>
                            </div>
                        </div>
                    </div>
                } 
            </div>
        </>
    );
}