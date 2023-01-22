import { useEffect, useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dices, setDices] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice(){
    const newArray = [];
    for (let i = 0; i < 10; i++){
      newArray.push(generateNewDice());
    }
    return newArray;
  }

  function rollDice() {

    setDices(oldDice => oldDice.map(die => {
      return die.isHeld? die : generateNewDice()
    }));
  }

  function holdDice(id) {
    setDices(oldDice => oldDice.map(dice => {
      return dice.id === id ? {...dice, isHeld:!dice.isHeld } : dice
    }))
  }

  useEffect(()=>{
    const allHeld = dices.every(dice => dice.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every(dice => firstValue === dice.value);
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("you won")
    }
  }, [dices])

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies Game</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">
        {dices.map((dice) => (
          <Die
            value={dice.value}
            key={dice.id}
            isHeld={dice.isHeld}
            holdDice={() => holdDice(dice.id)}
          />
        ))}
      </div>

      <button onClick={rollDice} className="roll-dice">
        {tenzies? "New Game" : "Roll Game"}
      </button>
    </main>
  );
}

export default App;
