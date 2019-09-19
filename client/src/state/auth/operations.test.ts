import { actionTypes } from "./actions";
import { push, RouterAction } from "connected-react-router";
import operations from "./operations";
import {
  mockAxios,
  mockStore,
  mockAxiosWith401Handler,
  createTestUser
} from "@test-utils";
import { AuthAction } from "./types";

/**
 * TODO check eventsOperations call
 */
describe("Auth Operations", () => {
  test("login (success)", async () => {
    const user = createTestUser();

    // expected actions
    const expected: (AuthAction | RouterAction)[] = [
      {
        type: actionTypes.START_AUTH_LOADING
      },
      {
        type: actionTypes.SET_LOGIN_USER,
        payload: {
          user
        }
      },
      {
        type: actionTypes.FINISH_AUTH_LOADING
      },
      push("/")
    ];

    // api mock
    mockAxios.onPost("/api/v1/login").reply(200, user);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.login(user.name, "password"));

    // verify
    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });

  test("logout", async () => {
    // expected actions
    const expected: (AuthAction | RouterAction)[] = [
      {
        type: actionTypes.START_AUTH_LOADING
      },
      {
        type: actionTypes.SET_LOGIN_USER,
        payload: {
          user: null
        }
      },
      {
        type: actionTypes.FINISH_AUTH_LOADING
      },
      push("/login")
    ];

    // api mock
    // TODO check body
    mockAxiosWith401Handler.onPost("/api/v1/logout").reply(200);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.logout());

    // verify
    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });

  test("signUp", async () => {
    const user = createTestUser();

    // expected actions
    const expected: (AuthAction | RouterAction)[] = [
      {
        type: actionTypes.START_AUTH_LOADING
      },
      {
        type: actionTypes.SET_LOGIN_USER,
        payload: {
          user: user
        }
      },
      {
        type: actionTypes.FINISH_AUTH_LOADING
      },
      push("/")
    ];

    // api mock
    // TODO check body
    mockAxiosWith401Handler.onPost("/api/v1/users").reply(200, user);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.signUp(user.name, user.email, "password"));

    // verify
    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });
});
