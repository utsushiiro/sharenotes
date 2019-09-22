import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from "react-redux";
import { notesReducer } from "./notes";
import { authReducer } from "./auth";
import { eventsReducer } from "./events";

export const history = createBrowserHistory();
const middlewares = [thunk, logger, routerMiddleware(history)];
const rootReducer = combineReducers({
  notesState: notesReducer,
  authState: authReducer,
  eventsState: eventsReducer,
  router: connectRouter(history)
});
type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
