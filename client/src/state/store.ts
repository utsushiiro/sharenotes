import { createStore, applyMiddleware, combineReducers } from "redux";
import notesReducer from "./notes";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import authReducer from "./auth";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from "react-redux";

export const history = createBrowserHistory();
const middlewares = [logger, routerMiddleware(history), thunk];
const rootReducer = combineReducers({
  notesState: notesReducer,
  authState: authReducer,
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
