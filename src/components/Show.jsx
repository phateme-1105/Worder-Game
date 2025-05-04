import React, { useContext } from 'react'
import { AppContext } from '../App';
import Board from './Board';
import Letter from './Letter';

const Show = () => {
    const {history, correctWord, timeLeft} =useContext(AppContext);
  return (
    <div className='show'>
      <div>{timeLeft}</div>
     <div >
      {history.map((word, index) => <div key={index} className='board' >
        {word.map((letter, index) =>{
          let className = '';
          if(correctWord[index] === letter){
            className= 'correct';
          } else if (correctWord.includes(letter)){
             className='almost';
            }
            return <Letter letter={letter} key={index} className={className}/>
        })}
      </div> )}
      </div>
      
    </div>
  )
}

export default Show