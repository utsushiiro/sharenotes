import { createStore, applyMiddleware, combineReducers } from "redux";
import notesReducer from "./notes";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import authReducer from "./auth";

export const history = createBrowserHistory();
const middlewares = [logger, routerMiddleware(history), thunk];

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({
    notesState: notesReducer,
    authState: authReducer,
    router: connectRouter(history)
  });
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
