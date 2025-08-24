import Deck from "../model/deck";
import Card from "../model/card";
import { useEffect, useMemo, useState } from "react";

export default function Scoundrel() {

    const startingDeck = new Deck('scoundrel');
    startingDeck.shuffleDeck();

    const [deck, setDeck] = useState<Deck>(startingDeck);

    const drawRoom = (count: number): Array<Card> => {    
        const roomAdditions: Array<Card> = []; 
        for (let i = 0; i < count; i++) {
            let roomCard = deck.drawCard();
            if (roomCard === undefined) break;
            roomAdditions.push(roomCard);
        }
        return roomAdditions;
    }

    const startingRoom = useMemo(() => drawRoom(4), []);
    const [room, setRoom] = useState<Array<Card>>(startingRoom);
    const [life, setLife] = useState<number>(20);
    const [weapon, setWeapon] = useState<Card | null>(null);
    const [statusText, setStatusText] = useState<string>('');
    const [loss, setLoss] = useState<boolean>(false);
    const [fled, setFled] = useState<boolean>(false);
    
    useEffect(() => {
        if(room.length === 1) {
            setRoom([...room, ...drawRoom(3)]);
            setFled(false);
        }
    }, [room]);

    useEffect(() => {
        if (life <= 0) {
            setLoss(true);
        }
    }, [life]);


    // TODO: Add logic for loss screen

    const interactWithCard = (card: Card) => {
        switch (card.getScoundrelType()) {
            case 'weapon':
                setWeapon(card);
                setStatusText(`Equipped ${card.getPrettyName()}`);
                break;
            case 'monster':
                if (!weapon) {
                    setLife(life - card.getNumericValue());
                    setStatusText(`Fought ${card.getPrettyName()} barehanded`);
                }
                else {
                    // TODO: implement choice to not use weapon
                    // TODO: implement weapon limitations
                    setLife(life - Math.max(0, card.getNumericValue() - weapon.getNumericValue()));
                    setStatusText(`Fought ${card.getPrettyName()} with ${weapon.getPrettyName()}`);
                }
                break;
            case 'potion':
                // TODO: implement 1 potion limit per room.
                setLife(Math.min(20, life + card.getNumericValue()));
                setStatusText(`Drank health potion ${card.getPrettyName()}`);
                break;
        }
        setRoom(room.filter(c => c !== card));
    };

    const flyYouFool = () => {
        setFled(true);
        setRoom(drawRoom(4));
        deck.addCardsToBottom(room);
    }


    return (
        <>
            <h1>Scoundrel</h1>
            <h2>{statusText}</h2>
                <div className="game-flex-row">
                    <div>
                        <h2>Dungeon Deck</h2>
                        <div className="deck-container">
                            <img src='./src/assets/red_card_back.png' height="200px" width="auto"></img>
                            <p className="overlay-text">{deck.cards.length}</p>
                        </div>
                    </div>
                    <div>
                        {room.map((card) => <img onClick={() => interactWithCard(card)} height="200px" src={card.getImageFileName()}></img>)}
                    </div>
                </div>
                <div>
                    <h2>Life: {life}</h2>
                    <h2>Current Weapon</h2>
                    <img height="200px" src={weapon?.getImageFileName()}></img>
                </div>
            <div>
                <button onClick={() => flyYouFool()} disabled={fled}>Flee</button>
            </div>
        </>
    );
};