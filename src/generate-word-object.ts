import { ILetter, IWord } from "./types";
//@ts-ignore
import Cookies from 'js-cookie'

export const generateEmptyWordObject = (): IWord => {
  return {
    text: '     ',
    letters: [
      { value: ' ', present: false, correct: false},
      { value: ' ', present: false, correct: false},
      { value: ' ', present: false, correct: false},
      { value: ' ', present: false, correct: false},
      { value: ' ', present: false, correct: false},
    ]
  }
};

export const generateEmptyLetterObject = (): ILetter => {
  return {
    value: ' ',
    present: false,
    correct: false,
  }
};

export const generateEmptyLetterObjectArray = (numberOfLetters: number): ILetter[] => {
  return Array(numberOfLetters).map(() => {
    return generateEmptyLetterObject();
  })
};

export const generateWordObject = (word: IWord, newLetter: string) : IWord => {
  var currentLetters = word.letters.filter(letter => letter.value !== ' ').map(letter => letter.value);
  currentLetters.push(newLetter);
  var placeholders: string[] = [];
  if (currentLetters.length < 5) {
    placeholders = Array(5 - currentLetters.length).fill(' ');
  }
  var allLetters = currentLetters.concat(placeholders);
  return {
    text: allLetters.join(''),
    letters: validateLetters(allLetters, Cookies.get('targetWord').toUpperCase().split(''))
  }
};

const validateLetters = (letters: string[], correctWord: string[]): ILetter[] => {
  return letters.map((letter, index) => {
    return {
      value: letter,
      correct: correctWord[index].toUpperCase() === letter.toUpperCase(),
      present: correctWord.includes(letter.toUpperCase())
    }
  });
};

export const removeLetter = (word: IWord): IWord => {
  var newLetterObject: IWord = {
    text: word.text,
    letters: word.letters,
  }
  var lastLetterIndex = 0;
  word.letters.forEach((letter, index) => {
    if (letter.value !== ' ') {
      lastLetterIndex = index
    }
  });
  newLetterObject.letters[lastLetterIndex] = { value: ' ', correct: false, present: false };
  return newLetterObject;
};

export const validateLetterCount = (word: IWord): boolean => {
  return word.letters.filter(letter => letter.value !== ' ').length === 5;
}