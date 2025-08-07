import './App.css'
import ButtonLink from './components/ButtonLink.tsx';

function App() {
  return (
    <>
      <h1>
        Playing Cards
      </h1>
      <div className="flex-row">
        <ButtonLink link='/war' displayText='War' />
        <ButtonLink link='/solitaire' displayText='Solitaire' />
        <ButtonLink link='/scoundrel' displayText='Scoundrel' />
        <ButtonLink link='/fifty_two_card_pickup' displayText='52 Card Pickup' />
      </div>
    </>
  )
}

export default App
