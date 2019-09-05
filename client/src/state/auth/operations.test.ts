import { actionTypes } from "./actions";
import { push } from "connected-react-router";
import operations from "./operations";
import { User } from "./types";
import { mockAxios, mockStore, mockAxiosWith401Handler } from "@test-utils";

/**
 * TODO check eventsOperations call
 */
describe("Auth Operations", () => {
  test("login (success)", async () => {
    const user: User = {
      id: 0,
      email: "test@example.com",
      name: "test-name"
    };

    // expected actions
    const expected = [
      {
        type: actionTypes.LOGIN.STARTED
      },
      {
        type: actionTypes.LOGIN.DONE,
        payload: {
          user: user
        }
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

  test("login (failure)", async () => {
    // expected actions
    const expected = [
      {
        type: actionTypes.LOGIN.STARTED
      },
      {
        type: actionTypes.LOGIN.FAILED
      }
    ];

    // api mock
    mockAxios.onPost("/api/v1/login").reply(401);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.login("test-user", "invalidPassword"));

    // verify
    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });

  test("logout", async () => {
    // expected actions
    const expected = [
      {
        type: actionTypes.LOGOUT.STARTED
      },
      {
        type: actionTypes.LOGOUT.DONE
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
    const user: User = {
      id: 0,
      email: "test@example.com",
      name: "test-name"
    };

    // expected actions
    const expected = [
      {
        type: actionTypes.SIGN_UP.STARTED
      },
      {
        type: actionTypes.SIGN_UP.DONE,
        payload: {
          user: user
        }
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
