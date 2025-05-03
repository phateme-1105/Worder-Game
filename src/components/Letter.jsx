import React, { useContext } from 'react'
import { AppContext } from '../App'

const Letter = ({letter, className}) => {
   
  return (
    <div className={`letter ${className}`} >{letter}</div>
  )
}

export default Letter