import { useEffect, useMemo, useRef, useState } from "react";
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

    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = "rgb(200 0 0)";
            ctx.fillRect(10, 10, 50, 50);

            ctx.fillStyle = "rgb(0 0 200 / 50%)";
            ctx.fillRect(30, 30, 50, 50);
        }
    }, []);


    return (
        <>
            <h1>This is 52 card pickup!</h1>
            <canvas ref={canvasRef} width='300px' height='150px'>
            </canvas>
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