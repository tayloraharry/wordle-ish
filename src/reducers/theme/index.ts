import { ThemeAction } from "../../actions/theme";
import { generateEmptyWordObject } from "../../generate-word-object";
import { IWord } from "../../types";
import { getRandomWord } from "../../word-banks/five";

interface IColorPallette {
  correct: string,
  present: string,
  absent: string,
  idle: string,
  background: string,
  color: string,
}

interface ITheme {
  darkMode: boolean;
  colors: IColorPallette
}

const dark_theme: IColorPallette = {
  correct: "#6aaa64",
  present: "#c9b458",
  absent: "#787c7e",
  idle: "#d3d6da",
  background: "black",
  color: "white",
}

const light_theme: IColorPallette = {
  correct: "orange",
  present: "#c9b458",
  absent: "#787c7e",
  idle: "#d3d6da",
  background: "white",
  color: "black",
}

export interface IThemeState {
  currentTheme: ITheme;
}

export const themeReducer = (
  state: IThemeState = { currentTheme: { darkMode: false, colors: light_theme } },
  action: ThemeAction
) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      return { ...state, currentTheme: { darkMode: action.payload, colors: action.payload ? dark_theme : light_theme } };
    default:
      return state;
  }
};