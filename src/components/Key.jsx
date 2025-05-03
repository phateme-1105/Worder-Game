import React, { useContext, useEffect, useState } from 'react'
import { boardDefault } from '../assets/Word'
import { AppContext } from '../App'

const Key = ({keyValue, exKey}) => {
  const {onDelete, onSelectLetter, onEnter, isUserTurn, setIsUserTurn} = useContext(AppContext);


  const selectLetter = () => {
    if(!isUserTurn) return;
    if(keyValue === 'Enter'){
    onEnter();
    } 
    else if (keyValue === 'Delete'){
     onDelete();
    }
    else{
     onSelectLetter(keyValue)
    }
  }
  
  return (
    <div className={`key ${isUserTurn ?'' :'key-disabled'}`} id={exKey && 'big'} onClick={selectLetter} >{keyValue}</div>
  )
}

export default Key