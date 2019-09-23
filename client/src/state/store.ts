import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk, { ThunkDispatch } from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch
} from "react-redux";
import { notesReducer } from "./notes";
import { authReducer } from "./auth";
import { eventsReducer } from "./events";
import { Action } from "./types";
import { usersReducer } from "./users";

// middlewares
export const history = createBrowserHistory();
const middlewares = [thunk, logger, routerMiddleware(history)];

// rootReducer
const rootReducer = combineReducers({
  authState: authReducer,
  eventsState: eventsReducer,
  notesState: notesReducer,
  usersState: usersReducer,
  router: connectRouter(history)
});

// types
export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch: () => ThunkDispatch<
  RootState,
  void,
  Action
> = useReduxDispatch;

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
