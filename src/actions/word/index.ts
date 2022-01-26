import { IWord } from "../../types";

export type StartNewGameAction  = { type: "START_NEW_GAME" };
export type UpdateCurrentWordAction  = { type: "UPDATE_CURRENT_WORD"; payload: string };
export type UpdateCurrentGuessAction = { type: "UPDATE_CURRENT_GUESS"; payload: IWord };
export type SubmitCurrentGuessAction = { type: "SUBMIT_CURRENT_GUESS"; payload: IWord };
export type SetInvalidWordAction = { type: "SET_INVALID_WORD"; payload: boolean };

export type WordAction =
| StartNewGameAction
| UpdateCurrentGuessAction
| SubmitCurrentGuessAction
| SetInvalidWordAction

export const startNewGame = (): StartNewGameAction => ({
  type: "START_NEW_GAME",
});

export const updateCurrentGuess = (word: IWord): UpdateCurrentGuessAction => ({
  type: "UPDATE_CURRENT_GUESS",
  payload: word,
});

export const submitGuess = (word: IWord): SubmitCurrentGuessAction => ({
  type: "SUBMIT_CURRENT_GUESS",
  payload: word
});

export const setInvalidWord = (invalid: boolean): SetInvalidWordAction => ({
  type: "SET_INVALID_WORD",
  payload: invalid
});