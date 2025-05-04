import { filterWordsByCommonLetters } from "./FilterWord";
import { extracSametLetter } from "./ExtractSameLetter";
import Board from "../components/Board";

export const robotGuessWord = ({
  pos,
  wordSet,
  setBoard,
  history,
  setHistory,
  setPos,
  setIsUserTurn,
  correctWord,
  gameMode,
  setGameResult,
  setIsGameFinished,
}) => {
  const currentRow = pos.wordPos;
  const wordsArray = Array.from(wordSet);
  let minCommonLetters;

  if (gameMode === "easy") {
    minCommonLetters = 1;
  } else if (gameMode === "medium") {
    minCommonLetters = 2;
  } else if (gameMode === "hard") {
    minCommonLetters = 3;
  }

  // filter by minCommonLetters
  let availableWords = filterWordsByCommonLetters(
    wordsArray,
    correctWord,
    minCommonLetters
  );

  // Filter by history
  const filterWordByHistory = (availableWords, history, correctWord) => {
    if (history.length === 0) {
      return availableWords;
    }
    const sameLetter = extracSametLetter(history, correctWord);

    return (availableWords = availableWords.filter((word) => {
      let isValid = true;
      Object.entries(sameLetter).forEach(([index, letter]) => {
        if (word[index].toUpperCase() !== letter.toUpperCase()) {
          isValid = false;
        }
      });
      return isValid;
    }));
  };

  availableWords = filterWordByHistory(availableWords, history, correctWord);

  // Prevent robot from reusing previous guesses
  availableWords = availableWords.filter(
    (word) =>
      !history.some(
        (prevGuess) => prevGuess.join("").toUpperCase() === word.toUpperCase()
      )
  );

  if (!availableWords.includes(correctWord)) {
    availableWords.unshift(correctWord);
  }

  // Selelct word from array
  const robotWord =
    availableWords[Math.floor(Math.random() * availableWords.length)];

  setBoard((prevBoard) => {
    const newBoard = prevBoard.map((row) => [...row]);
    for (let i = 0; i < 5; i++) {
      newBoard[currentRow][i] = robotWord[i] || "";
    }
    return newBoard;
  });

  setHistory((prevHistory) => [...prevHistory, robotWord.split("")]);

  if (robotWord.toUpperCase() === correctWord.toUpperCase()) {
    setGameResult(`Correct word was ${correctWord}
        Robot wins! 🤖🎉`);
    setIsGameFinished(true);
    return;
  }

  setPos((prev) => ({ wordPos: prev.wordPos + 1, letterPos: 0 }));
  setIsUserTurn(true);
};
