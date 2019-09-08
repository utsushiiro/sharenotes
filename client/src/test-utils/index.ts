import { axiosInstance, axiosInstanceWith401Handler } from "@api/axios-base";
import MockAdapter from "axios-mock-adapter";
import createMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { State, Action } from "@state/types";
import { Note } from "@state/notes/types";
import { User } from "@state/users/types";

// store
type Dispatch = ThunkDispatch<State, void, Action>;
const middlewares = [thunk];
export const mockStore = createMockStore<State, Dispatch>(middlewares);

// axios
export const mockAxios = new MockAdapter(axiosInstance);
export const mockAxiosWith401Handler = new MockAdapter(
  axiosInstanceWith401Handler
);

// factory
export const createTestNote = (note: Partial<Note> = {}) => ({
  id: "0",
  title: "test-title",
  content: "test-content",
  version: "0",
  updatedAt: "XXX",
  updatedBy: createTestUser(),
  createdAt: "XXX",
  createdBy: createTestUser(),
  ...note
});

export const createTestUser = (user: Partial<User> = {}): User => ({
  id: "0",
  email: "test@example.com",
  name: "test-name",
  ...user
});
