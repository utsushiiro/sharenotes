import { combineReducers } from "redux";
import { State, Action } from "@state/types";
import { notesReducer } from "./notes";
import { usersReducer } from "./users";

export const entitiesReducers = combineReducers<State["entities"], Action>({
  notes: notesReducer,
  users: usersReducer
});
