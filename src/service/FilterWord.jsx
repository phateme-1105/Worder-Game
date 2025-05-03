export const filterWordsByCommonLetters = (words, correctWord, minCommonLetters) => {
    const correctLetters = new Set(correctWord.split(''));
    return words.filter(word => {
      const wordLetters = new Set(word.split(''));
      let commonCount = 0;
      for (let letter of wordLetters) {
        if (correctLetters.has(letter)) {
          commonCount++;
        }
      }
      return commonCount >= minCommonLetters;
    });
  };