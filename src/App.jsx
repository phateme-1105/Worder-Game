import { createContext, useEffect, useState } from 'react'

import './App.css'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import Show from './components/Show'
import { boardDefault, generateWordSet } from './assets/Word'
import { robotGuessWord } from './service/RobotGuessWord'
import ResultScreen from './components/ResultScreen'
import StartScreen from './components/StartScreen'
import { onDelete, onSelectLetter } from './service/GameControls'

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState( boardDefault); 
  const [pos, setPos] = useState({letterPos: 0, wordPos:0});
  const [history, setHistory] = useState([]);
  const [wordSet, setWordSet] = useState(new Set());
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameResult, setGameResult] = useState(""); 
  const [gameMode, setGameMode] = useState('');
  const [correctWord, setCorrectWord] = useState("");
  
  useEffect(() => {
    generateWordSet().then(words =>{

      const fetchWord = words.wordSet;
       setWordSet(fetchWord);
       const wordsArray = Array.from(fetchWord);
       const randomIndex = Math.floor(Math.random() * wordsArray.length);
       setCorrectWord(wordsArray[randomIndex].toUpperCase());      
    })
  }, [])

  const handleSelectLetter = (keyValue) =>
    onSelectLetter(keyValue, board, pos, setBoard, setPos);
 
  const handleDelete = () =>
    onDelete(board, pos, setBoard, setPos); 

  const onEnter = () => {
      if(pos.letterPos < 5) return;
      
     
      let currWord = '';
      for(let i=0; i<5 ; i++){
        currWord += board[pos.wordPos][i];
      }
     
        if(currWord === correctWord){
          setGameResult(`excellent! Correct word was ${correctWord}
          You win! 🎉`);
          setIsGameFinished(true);
          return;
        } 
        if (pos.wordPos >= boardDefault.length-1 ) {
          setGameResult("Game Over! Nobody guessed right.😢");
          setIsGameFinished(true);
          return;
        }
  
        const newHistory = [...history, [...board[pos.wordPos]]];
        setHistory(newHistory);
        setPos({wordPos: pos.wordPos + 1 , letterPos: 0});
        setIsUserTurn(false);
        setTimeout(() => robotGuessWord({ 
          pos, 
          wordSet, 
          setBoard, 
          history: newHistory,
          setHistory, 
          setPos, 
          setIsUserTurn, 
          correctWord,
          gameMode,
          setGameResult,
          setIsGameFinished
         }), 2000);
     
    };

  return (
    <>
    <div className='App'>
      <nav><h1>worder</h1></nav>
      <AppContext.Provider value={{board,
       setBoard,
        pos,
        setPos,
        history, 
        setHistory,
        onSelectLetter: handleSelectLetter,
        onDelete: handleDelete, 
        onEnter, 
        correctWord, 
        isUserTurn, 
        setIsUserTurn, 
        gameResult, 
        setGameResult, 
        gameMode, 
        setGameMode}}>
          {gameMode === '' ? <StartScreen/> : (
          <>
          {isGameFinished && <ResultScreen/>}
           <Show/>
           <Board/>
           <Keyboard/>
          </>
          )}
      </AppContext.Provider>
    </div>
    </>
  )
}

export default App
