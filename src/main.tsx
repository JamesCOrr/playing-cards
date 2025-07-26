import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route } from 'react-router'
import { Routes } from 'react-router'
import War from './games/War.tsx'
import Solitaire from './games/Solitaire.tsx'
import Scoundrel from './games/Scoundrel.tsx'
import FiftyTwoCardPickup from './games/FiftyTwoCardPickup.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/war" element={<War />} />
        <Route path="/solitaire" element={<Solitaire />} />
        <Route path="/scoundrel" element={<Scoundrel />} />
        <Route path="/fifty_two_card_pickup" element={<FiftyTwoCardPickup />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
)
