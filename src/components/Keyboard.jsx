import React, { useCallback, useContext, useEffect } from 'react'
import Key from './Key'
import { AppContext } from '../App';

const Keyboard = () => {
  const {onEnter, onDelete, onSelectLetter, isUserTurn, setIsUserTurn}=useContext(AppContext);
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const Keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    if(!isUserTurn) return;
    if (event.key === 'Enter'){
      onEnter();
    }else if(event.key === 'Backspace'){
      onDelete();
    }else{
      keys1.forEach(key => {
        if(key.toLowerCase() === event.key.toLowerCase()) 
          onSelectLetter(key);
        });
      Keys2.forEach(key => {
        if(key.toLowerCase() === event.key.toLowerCase()) 
          onSelectLetter(key)
        });
      keys3.forEach(key => {
        if(key.toLowerCase() === event.key.toLowerCase()) 
          onSelectLetter(key)
        });
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return (
    <div className='container'>
      <div className={`keyboard ${isUserTurn ?'' : 'disabled'}`}>
        <div className='line1'>
          {keys1.map(key => <Key key={key} keyValue={key}/>)}
          </div>
        <div className='line2'>
          {Keys2.map(key => <Key key={key} keyValue={key}/>)}
        </div>
        <div className='line3'>
          <Key keyValue={"Enter"} exKey/>
          {keys3.map(key => <Key key={key} keyValue={key}/>)}
          <Key keyValue={'Delete'} exKey />
        </div>
      </div>
    </div>
  )
}

export default Keyboard