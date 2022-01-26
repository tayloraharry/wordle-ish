import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useEventListener from "../../hooks/event-listener";
import { IWordState, wordReducer } from "../../reducers/word";
import { RootState } from "../../store";
import { IWord } from "../../types";
import Word from "../word";
import "./board.css";

const Board = () => {
  const [height, setHeight] = useState<number>(window.innerHeight - 250);
  useEventListener('resize', () => setHeight(window.innerHeight - 250));
  const ref = useRef<HTMLDivElement | null>(null);
  const {currentWord, submittedWords} = useSelector<RootState, RootState["wordReducer"]>(
    (state) => state.wordReducer
  );

  return (
    <div id="board-container">
      <div id="board" ref={ref} style={{height: height, width: height*(5/6)}}>
        {submittedWords.map((submittedWord: IWord, index: number) => {
          return (
            <Word
              key={index}
              type="submitted"
              letters={submittedWord.letters}
            />
          );
        })}
        {submittedWords.length < 6 && (
          <Word type="current" letters={currentWord.letters} />
        )}
        {submittedWords.length < 6 &&
          Array(6 - (submittedWords.length + 1))
            .fill("")
            .map((_, index) => {
              return <Word key={index} type="idle" />;
            })}
      </div>
    </div>
  );
};

export default Board;
