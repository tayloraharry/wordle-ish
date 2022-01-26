import { createStore } from "redux";
import { wordReducer } from "./reducers/word";
import { themeReducer } from "./reducers/theme";

import { combineReducers } from 'redux'

var x = combineReducers({wordReducer, themeReducer});

export const store = createStore(x);
export type RootState = ReturnType<typeof x>;