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
    const [monstersSlain, setMonstersSlain] = useState<Array<Card>>([]);
    const [showWeaponDialog, setShowWeaponDialog] = useState<boolean>(false);
    const [statusText, setStatusText] = useState<string>('');
    const [loss, setLoss] = useState<boolean>(false);
    const [fled, setFled] = useState<boolean>(false);
    // TODO: Use lockControls to prevent actions while modal is up
    const [lockControls, setLockControls] = useState<boolean>(false);
    const [activeMonster, setActiveMonster] = useState<Card>();
    const [drankPotion, setDrankPotion] = useState<boolean>(false);
    
    useEffect(() => {
        if(room.length === 1) {
            setRoom([...room, ...drawRoom(3)]);
            setDrankPotion(false);
            setFled(false);
        }
    }, [room]);

    useEffect(() => {
        if (life <= 0) {
            setLoss(true);
            setLockControls(true);
        }
    }, [life]);


    // TODO: Add logic for loss screen

    const interactWithCard = (card: Card) => {
        if (lockControls) return;
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
                    setActiveMonster(card);
                    setLockControls(true);
                    setShowWeaponDialog(true);
                }
                break;
            case 'potion':
                if (drankPotion) {
                    setStatusText('Already drank a health potion in this room, discarding');
                }
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

    const fightMonsterBarehanded = () => {
        if (!activeMonster) return;
        setShowWeaponDialog(false);
        setLife(life - activeMonster.getNumericValue());
        setStatusText(`Fought ${activeMonster.getPrettyName()} barehanded`);
    }

    const fightMonsterWithWeapon = () => {
        if (!activeMonster || !weapon) return;
        setMonstersSlain([...monstersSlain, activeMonster])
        setLife(life - Math.max(0, activeMonster.getNumericValue() - weapon.getNumericValue()));
        setStatusText(`Fought ${activeMonster.getPrettyName()} with ${weapon.getPrettyName()}`);
        setShowWeaponDialog(false);
    }

    const weaponCanSlayMonster = useMemo(() => {
        if(!activeMonster) return false;
        if(!monstersSlain || monstersSlain.length < 1) return true;
        return (activeMonster?.getNumericValue() < monstersSlain[monstersSlain.length-1]?.getNumericValue())
    }, [activeMonster, monstersSlain]);


    return (
        <>
            <dialog open={loss}>
                <p>You have been defeated!</p>
                <button onClick={() => location.reload()}>Try Again</button>
            </dialog>
            <dialog open={showWeaponDialog}>
                <p>Fight monster</p>
                <div className="game-flex-row">
                    <button disabled={!weaponCanSlayMonster} onClick={fightMonsterWithWeapon}>With the {weapon?.getPrettyName()}</button>
                    <button onClick={fightMonsterBarehanded}>Barehanded</button>
                </div>
            </dialog>
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
                    <h2>Monsters Slain with Current Weapon</h2>
                    {monstersSlain.map(card => <img height="200px" src={card.getImageFileName()}></img>)}
                </div>
            <div>
                <button onClick={() => flyYouFool()} disabled={fled || lockControls}>Flee</button>
            </div>
        </>
    );
};