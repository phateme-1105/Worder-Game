export const extracSametLetter = (history, correctWord) => {
    const sameLetter = {};
    history.forEach(guess => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i].toUpperCase() === correctWord[i].toUpperCase()) {
          sameLetter[i] = guess[i];
        }
      }
    });
    return sameLetter;
  };