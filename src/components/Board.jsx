import React, { useContext, useEffect, useState } from 'react'
import Letter from './Letter'
import { AppContext } from '../App'

const Board = () => {
  const {board, pos} = useContext(AppContext);
  
  return (
    <div className="container">
      <div className='board'>
       {board[pos.wordPos].map((letter, index) =>
        <Letter letter={letter} key={index}  />
       )}
      </div>
    </div>
  ) 
}

export default Board