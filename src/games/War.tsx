import { useMemo, useState } from "react";
import Deck from "../model/deck";
import type Card from "../model/card";

export default function War() {
    
    const [statusText, setStatusText] = useState<string>('Prepare for War!')
    const [buttonText, setButtonText] = useState<string>('Initiate combat')

    const deck = new Deck();
    deck.shuffleDeck();
    // TODO: initialize state for each players hand
    let decks: Array<Deck> = deck.dealCards();
    const [p1Deck, setP1Deck] = useState<Deck>(decks[0]);
    const [p2Deck, setP2Deck] = useState<Deck>(decks[1]);

    const [p1BattleWin, setP1BattleWin] = useState(false);
    const [p2BattleWin, setP2BattleWin] = useState(false);

    const [p1GameWin, setP1GameWin] = useState(false);
    const [p2GameWin, setP2GameWin] = useState(false);
    
    
    const [p1DeckSize, setP1DeckSize] = useState<number>(p1Deck.cards.length);
    const [p2DeckSize, setP2DeckSize] = useState<number>(p2Deck.cards.length);

    const [p1ActiveCard, setP1ActiveCard] = useState<Card>();
    const [p2ActiveCard, setP2ActiveCard] = useState<Card>();

    const [p1ActiveCardValue, setP1ActiveCardValue] = useState<number>();
    const [p2ActiveCardValue, setP2ActiveCardValue] = useState<number>();

    const [prisoners, setPrisoners] = useState<Array<Card>>([]);
    
    
    useMemo(() => {
        setP1DeckSize(p1Deck.cards.length);
    }, [p1Deck.cards.length]);
    
    useMemo(() => {
        setP2DeckSize(p2Deck.cards.length);
    }, [p2Deck.cards.length]);

    useMemo(() => {
        setP1ActiveCardValue(p1ActiveCard?.getNumericValue());
    }, [p1ActiveCard]);

    useMemo(() => {
        setP2ActiveCardValue(p2ActiveCard?.getNumericValue());
    }, [p2ActiveCard]);

    useMemo(() => {
        if(p1DeckSize === 0) {
            setP2GameWin(true);
        }
    }, [p1DeckSize]);
    
    useMemo(() => {
        if(p2DeckSize === 0) {
            setP1GameWin(true);
        }
    }, [p2DeckSize]);


    useMemo(() => {
        if(!p1ActiveCardValue || !p2ActiveCardValue || !p1ActiveCard || !p2ActiveCard) return;

        if (p1ActiveCardValue > p2ActiveCardValue) {
            setStatusText(`Battle lost, ${p1ActiveCard.value} captures ${p2ActiveCard.value}`);
            prisoners.push(p1ActiveCard, p2ActiveCard);
            setP1BattleWin(true);
        }

        if (p1ActiveCardValue < p2ActiveCardValue) {
            setStatusText(`Battle won, ${p2ActiveCard.value} captures ${p1ActiveCard.value}`);
            prisoners.push(p1ActiveCard, p2ActiveCard);
            setP2BattleWin(true);
        }

        if (p1ActiveCardValue === p2ActiveCardValue) {
            setStatusText('War!');
            prisoners.push(p1ActiveCard, p2ActiveCard);
            for (let i = 0; i < 3; i++) {
                const p1Prisoner = p1Deck.drawCard();
                const p2Prisoner = p2Deck.drawCard();
                if (p1Prisoner) prisoners.push(p1Prisoner);
                if (p2Prisoner) prisoners.push(p2Prisoner);
            }
        }    
    }, [p1ActiveCardValue, p2ActiveCardValue]);

    function capturePrisoners(): void {
        if(p1BattleWin) {
            p1Deck.addCardsToBottom(prisoners);
            setP1Deck(p1Deck);
            setP1BattleWin(false);
            setPrisoners([]);
        }
        if(p2BattleWin) {
            p2Deck.addCardsToBottom(prisoners);
            setP2Deck(p2Deck);
            setP2BattleWin(false);
            setPrisoners([]);
        }
    }

    function initiateBattle(): void {
        capturePrisoners();
        setP1ActiveCard(p1Deck.drawCard());
        setP2ActiveCard(p2Deck.drawCard());
    }

    return (
        <>
        <div className="game-flex-row">
            <div>
                <h2>My Deck</h2>
                <div className="deck-container">
                    <img src='./src/assets/red_card_back.png' height="200px" width="auto"></img>
                    <p className="overlay-text">{p1DeckSize}</p>
                </div>
                <h2>Opponent's Deck</h2>
                <div className="deck-container">
                    <img src='./src/assets/red_card_back.png' height="200px" width="auto"></img>
                    <p className="overlay-text">{p2DeckSize}</p>
                </div>
            </div>
            <div className="button-flex-column">
                <h1>War</h1>
                <h2 id="status">{statusText}</h2>
                <div>
                    {prisoners.filter((p) => p !== p1ActiveCard && p!= p2ActiveCard).length > 0 && <h2>Prisoners</h2>}
                    {prisoners.filter((p) => p !== p1ActiveCard && p!= p2ActiveCard).map(prisoner => (
                        <img height='70px' src={prisoner.getImageFileName()} key={prisoner.getImageFileName()} />
                    ))}
                </div>
                <button className="button-game" onClick={initiateBattle}>
                    {buttonText}
                </button>
            </div>
            <div>
                <h2>Opponent's Card</h2>
                {p1ActiveCard && <img height="200px" width="auto" src={p1ActiveCard.getImageFileName()}></img>}
                <h2>My Card</h2>
                {p2ActiveCard && <img height="200px" width="auto" src={p2ActiveCard.getImageFileName()}></img>}
            </div>
            <div>
            </div>
        </div>
        </>
    );
}