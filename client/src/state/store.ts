import { createStore, applyMiddleware, combineReducers } from "redux";
import notesReducer from "./notes";
import logger from "redux-logger";

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({ notesReducer });
  return createStore(rootReducer, initialState, applyMiddleware(
    logger
  ));
}
