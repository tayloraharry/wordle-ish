import Letter from "../letter";
import "./word.css";
import { ILetter } from "../../types";
import { alphabet_keys } from "../../constants";
import {
  generateWordObject,
  removeLetter,
  validateLetterCount,
} from "../../generate-word-object";
import { useDispatch, useSelector } from "react-redux";
import { lookupWord } from "../../word-banks/five";
import { useRef, useState } from "react";
import { RootState } from "../../store";

interface IWordProps {
  type: "current" | "submitted" | "idle";
  letters?: ILetter[];
}

const Word = ({ type, letters }: IWordProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { currentWord, invalidWord } = useSelector<RootState, RootState["wordReducer"]>(
    (state) => state.wordReducer
  );

  const updateWord = async ({ code, key }: KeyboardEvent) => {
    
    if (currentWord.letters.filter(letter => letter.value !== ' ' ).length < 6) {
      dispatch({
        type: "SET_INVALID_WORD",
        payload: false,
      });
      if (alphabet_keys.includes(code)) {
        dispatch({
          type: "UPDATE_CURRENT_GUESS",
          payload: generateWordObject(currentWord, key),
        });
      } else if (code === "Backspace") {
        dispatch({
          type: "UPDATE_CURRENT_GUESS",
          payload: removeLetter(currentWord),
        });
      } else if (code === "Enter" && validateLetterCount(currentWord)) {
        //need actual word validation here
        const found = lookupWord(currentWord.text);
        if (found) {
          dispatch({
            type: "SUBMIT_CURRENT_GUESS",
            payload: currentWord,
          });
        } else {
          dispatch({
            type: "SET_INVALID_WORD",
            payload: true,
          });
        }
      }
    }

  };


  if (type === "current") {
    return (
      <div
        className="word-container"
        tabIndex={0}
        onKeyDown={(e: any) => updateWord(e)}
      >
        {letters!.map((letter, index) => {
          return <Letter key={index} invalidWord={invalidWord} current={true} letter={letter} />;
        })}
      </div>
    );
  } else if (type === "submitted") {
    return (
      <div className="word-container">
        {letters!.map((letter, index) => {
          return <Letter key={index} current={false} letter={letter} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="word-container">
        { Array(5).fill('').map((_, index) => {
          return <Letter key={index} idle={true} current={false} letter={{value: ' ', present: false, correct: false }}/>
        }) }
      </div>
    )
  }
};

export default Word;