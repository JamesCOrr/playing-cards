import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Deck from './../model/deck.ts';
import Card from './../model/card.ts';

import './App.css'

function App() {
  const [deck, setDeck] = useState(new Deck());

  return (
    <>
      <h1>
        Playing Cards
      </h1>
      {deck.cards.map((card, idx) => (
        <img src={card.getImageFileName()}/>
      ))}
    </>
  )
}

export default App
