import { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from "nanoid";

function App() {
  const [dices, setDices] = useState(allNewDice())

  function allNewDice(){
    const newArray = [];
    for (let i = 0; i < 10; i++){
      newArray.push({
        value: Math.ceil(Math.random() * 6 ), 
        isHeld: false, 
        id: nanoid()
      });
    }
    return newArray;
  }

  function rollDice() {
    setDices(allNewDice());
  }

  return (
    <main>
      <div className="die-container">
        {dices.map((dice) => (
          <Die value={dice.value} key={dice.id} isHeld={dice.isHeld}/>
        ))}
      </div>

      <button onClick={rollDice} className="roll-dice">Roll Dice</button>
    </main>
  );
}

export default App;
