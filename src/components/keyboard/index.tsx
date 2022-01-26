import KeyboardButton from "./keyboard-button";
import "./keyboard.css";
import { useDispatch, useSelector } from "react-redux";
import { IWordState } from "../../reducers/word";
import { useEffect, useState } from "react";
import { generateWordObject, removeLetter, validateLetterCount } from "../../generate-word-object";
import { alphabet, alphabet_keys } from "../../constants";
import { lookupWord } from "../../word-banks/five";
import { RootState } from "../../store";


const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K","L"];
const row3 = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"];

const Keyboard = () => {
  const dispatch = useDispatch();
  const { currentWord, submittedWords } = useSelector<RootState, RootState["wordReducer"]>(
    (state) => state.wordReducer
  );
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);

  useEffect(() => {
    var correctLetters: string[] = [];
    var presentLetters: string[] = [];
    var absentLetters: string[] = [];
    submittedWords.forEach(word => {
      word.letters.forEach(letter => {
        const letterValue = letter.value.toUpperCase();
        if (letter.correct) {
          correctLetters.push(letterValue);
        } else if (letter.present) {
          presentLetters.push(letterValue);
        } else {
          absentLetters.push(letterValue);
        }
      });
    });
    setCorrectLetters(correctLetters);
    setAbsentLetters(absentLetters);
    setPresentLetters(presentLetters);
  }, [submittedWords]);

  const onKeyPress = (value: string) => {
    dispatch({
      type: "SET_INVALID_WORD",
      payload: false,
    });
    if (alphabet.includes(value)) {
      dispatch({
        type: "UPDATE_CURRENT_GUESS",
        payload: generateWordObject(currentWord, value),
      });
    } else if (value === "Back") {
      dispatch({
        type: "UPDATE_CURRENT_GUESS",
        payload: removeLetter(currentWord),
      });
    } else if (value === "Enter" && validateLetterCount(currentWord)) {
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
  };

  return (
    <div id="keyboard">
      <div className="row">
        {row1.map((value, index) => {
          return (
            <KeyboardButton
              key={index}
              value={value}
              onClick={() => onKeyPress(value)}
              correct={correctLetters.includes(value)}
              present={presentLetters.includes(value)}
              absent={absentLetters.includes(value)}
            />
          );
        })}
      </div>
      <div className="row">
        <div className="half"></div>
        {row2.map((value, index) => {
          return (
            <KeyboardButton
              key={index}
              value={value}
              onClick={() => onKeyPress(value)}
              correct={correctLetters.includes(value)}
              present={presentLetters.includes(value)}
              absent={absentLetters.includes(value)}
            />
          );
        })}
        <div className="half"></div>
      </div>
      <div className="row">
        {row3.map((value, index) => {
          return (
            <KeyboardButton
              key={index}
              value={value}
              onClick={() => onKeyPress(value)}
              correct={correctLetters.includes(value)}
              present={presentLetters.includes(value)}
              absent={absentLetters.includes(value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
