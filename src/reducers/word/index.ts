import { WordAction } from "../../actions/word";
import { generateEmptyWordObject } from "../../generate-word-object";
import { IWord } from "../../types";
import { getRandomWord } from "../../word-banks/five";

export interface IWordState {
  currentWord: IWord;
  submittedWords: IWord[];
  absentLetters: string[];
  correctLetters: string[];
  presentLetters: string[];
  targetWord: string;
  invalidWord: boolean;
}


export const getInitialState = (): IWordState => {
  return {
    currentWord: generateEmptyWordObject(),
    submittedWords: [],
    absentLetters: [],
    correctLetters: [],
    presentLetters: [],
    targetWord: getRandomWord(),
    invalidWord: false,
  };
}

export const wordReducer = (
  state: IWordState = getInitialState(),
  action: WordAction
) => {
  switch (action.type) {
    case "START_NEW_GAME":
      return Object.assign({},{}, getInitialState())
    case "UPDATE_CURRENT_GUESS": {
      return { ...state, currentWord: action.payload };
    }
    case "SUBMIT_CURRENT_GUESS": {
      return Object.assign({}, state, {
        submittedWords: state.submittedWords.concat(action.payload),
        currentWord: generateEmptyWordObject(),
        absentLetters: getUniqueLetters(state.submittedWords.concat(action.payload)),
      })
    }
    case "SET_INVALID_WORD": {
      return { ...state, invalidWord: action.payload };
    }
    default:
      return state;
  }
};

const getUniqueLetters= (words: IWord[]): string[] => {
  var uniqueLetters: string[] = [];
  words.forEach(word => {
    word.letters.forEach(letter => {
      if (!uniqueLetters.includes(letter.value)) {
        uniqueLetters.push(letter.value)
      }
    });
  });

  return uniqueLetters;
};