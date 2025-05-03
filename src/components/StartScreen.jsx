import React, { useContext } from 'react'
import { AppContext } from '../App'

const StartScreen = () => {
    const {setGameMode} = useContext(AppContext);
    const handleModeSelection = (mode) => {
     setGameMode(mode);
    }
  return (
    <div className="start-screen">
    <h1>Select Game Difficulty</h1>
    <div className="options">
      <button onClick={() => handleModeSelection('easy')}>Easy Game</button>
      <button onClick={() => handleModeSelection('medium')}>Medium Game</button>
      <button onClick={() => handleModeSelection('hard')}>Hard Game</button>
    </div>
  </div>
  )
}

export default StartScreen