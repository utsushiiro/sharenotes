import { createStore, applyMiddleware, combineReducers } from "redux";
import notesReducer from "./notes";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
const middlewares = [logger, routerMiddleware(history), thunk];

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({
    notesState: notesReducer,
    router: connectRouter(history)
  });
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
