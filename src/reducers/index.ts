import { combineReducers } from 'redux'
import { wordReducer } from './word';
import { themeReducer } from "./theme";

export default combineReducers({
  wordReducer,
  themeReducer
});