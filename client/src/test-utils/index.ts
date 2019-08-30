import { axiosInstance, axiosInstanceWith401Handler } from "../api/axios-base";
import MockAdapter from "axios-mock-adapter";
import createMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { State, Action } from "../state/types";

// store
type Dispatch = ThunkDispatch<State, void, Action>;
const middlewares = [thunk];
export const mockStore = createMockStore<State, Dispatch>(middlewares);

// axios
export const mockAxios = new MockAdapter(axiosInstance);
export const mockAxiosWith401Handler = new MockAdapter(
  axiosInstanceWith401Handler
);
