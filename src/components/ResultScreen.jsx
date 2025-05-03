import React, { useContext } from 'react'
import { AppContext } from '../App'

const ResultScreen = () => {
  const {gameResult} = useContext(AppContext);

  const handleClick = () => {
    window.location.reload();
  }
  return (
    <>
        <div className="result-overlay">
          <div className="result">
            <h2>{gameResult}</h2>
            <button onClick={handleClick}>Restart Game</button>
          </div>
        </div>
    </>
  )
}

export default ResultScreen