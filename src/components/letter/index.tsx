import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ILetter } from "../../types";
import "./letter.css";

interface ILetterProps {
  letter: ILetter;
  current: boolean;
  idle?: boolean;
  invalidWord?: boolean;
}

const [color_correct, color_absent, color_present, color_current] = [
  "#6aaa64",
  "#939598",
  "#c9b458",
  "#ffffff",
];

const borderStyle = "2px solid #d3d6da";

const Letter = ({ letter, current, idle, invalidWord }: ILetterProps) => {
  const [tileColor, setTileColor] = useState<string>(color_absent);
  const [border, setBorder] = useState<string | null>(null);
  const {submittedWords} = useSelector<RootState, RootState["wordReducer"]>(
    (state) => state.wordReducer
  );

  useEffect(() => {
    if (letter.correct) {
      setTileColor(color_correct);
    } else if (letter.present) {
      setTileColor(color_present);
    } else if (current || idle) {
      setTileColor(color_current);
    } else {
      setTileColor(color_absent);
    }
  });

  useEffect(() => {
    setBorder(invalidWord ? '2px solid #DC143C' : null);
  }, [invalidWord]);


  return (
    <div
      className="letter-container"
      style={{
        backgroundColor: current ? "white" : tileColor,
        border:  border || (current || idle ? borderStyle : "none"),
        color: current ? "black" : "white",
      }}
    >
      {<span>{letter?.value}</span>}
    </div>
  );
};

export default Letter;