

export const onSelectLetter = (keyValue, board, pos, setBoard, setPos) => {
    if(pos.letterPos > 4) return ; 
    const newBoard = [...board];
    newBoard[pos.wordPos][pos.letterPos] = keyValue;
    setBoard(newBoard);
    setPos({...pos, letterPos: pos.letterPos + 1});
  };

export const onDelete = (board, pos, setBoard, setPos) => {
    if(pos.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[pos.wordPos][pos.letterPos-1] = "";
    setBoard(newBoard);
    setPos({...pos, letterPos: pos.letterPos - 1});
  };

