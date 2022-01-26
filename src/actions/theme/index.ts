export type SetDarkModeAction  = { type: "SET_DARK_MODE", payload: boolean };

export type ThemeAction =
| SetDarkModeAction

export const setDarkMode = (on: boolean): SetDarkModeAction => ({
  type: "SET_DARK_MODE",
  payload: on,
});