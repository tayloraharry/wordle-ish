import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { color_absent, color_correct, color_present } from "../../constants";
import { IWordState } from "../../reducers/word";
import "./keyboard.css";
import {  BsBackspace, BsBackspaceFill } from "react-icons/bs";
import { RootState } from "../../store";

interface IKeyboardButtonProps {
  value: string;
  onClick: () => void;
  correct: boolean;
  present: boolean;
  absent: boolean;
}

const KeyboardButton = ({
  value,
  onClick,
  correct,
  present,
  absent,
}: IKeyboardButtonProps) => {
  const [color, setColor] = useState<string>("");
  const { targetWord } = useSelector<RootState, RootState["wordReducer"]>(
    (state) => state.wordReducer
  );

  useEffect(() => {
    if (correct) {
      setColor(color_correct);
    } else if (present) {
      setColor(color_present);
    } else if (absent) {
      setColor(color_absent);
    }
  }, [correct, present, absent]);

  useEffect(() => {
    setColor('');
  }, [targetWord])

  if (value === "Back") {
    return <button style={{ backgroundColor: color }} onClick={() => onClick()}>
    <BsBackspace size={ 20 }/>
  </button>
  }

  return (
    <button style={{ backgroundColor: color }} onClick={() => onClick()}>
      { value }
    </button>
  );
};

export default KeyboardButton;
