import worderBank from './worderBank.txt';

export const boardDefault = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]

export const generateWordSet = async () => {
    let wordSet;
     await fetch(worderBank)
     .then(response => response.text())
     .then(result => {
      const wordArr = result.split(",")
      wordSet = new Set(wordArr);
})
return {wordSet};
}


 