import { useState } from "react";
import { useSelector } from "react-redux";
import useEventListener from "../../hooks/event-listener";
import { RootState } from "../../store";
import Board from "../board";
import Header from "../header";
import Keyboard from "../keyboard";
import PlayAgain from "../modal/play-again";
import './main.css';

const Main = () => {
  const [height, setHeight] = useState<number>(window.innerHeight);
  useEventListener("resize", () => setHeight(window.innerHeight));
  const { currentTheme: { colors : { background, color } } } = useSelector<RootState, RootState["themeReducer"]>(
    (state) => state.themeReducer
  );
  
  return (
    <div style={{backgroundColor:  background, color: color  }}>
      <div id="main">
        <Header />
        <Board />
        <Keyboard />
        <PlayAgain />
      </div>
    </div>
  );
};

export default Main;
