import { actionTypes } from "./actions";
import { actionTypes as eventsActionTypes } from "@state/events/actions";
import operations from "./operations";
import {
  mockAxios,
  mockStore,
  mockAxiosWith401Handler,
  createTestUser
} from "@test-utils";
import { AuthAction } from "./types";
import uuid from "uuid/v4";
import dayjs from "dayjs";
import { eventTypes } from "@state/events/constants";
import { EventAction } from "@state/events/types";

// mocks
const fixedUUID = "00000000-0000-0000-0000-000000000000";
jest.mock("uuid/v4", () => () => fixedUUID);
const fixedDate = new Date("2019-09-23");
jest.spyOn(global.Date, "now").mockImplementation(() => fixedDate.getTime());

describe("Auth Operations", () => {
  test("login (success)", async () => {
    const user = createTestUser();

    // expected actions
    const expected: (AuthAction | EventAction)[] = [
      {
        type: actionTypes.START_LOADING
      },
      {
        type: actionTypes.SET_LOGIN_USER,
        payload: {
          user
        }
      },
      {
        type: actionTypes.FINISH_LOADING
      },
      {
        type: eventsActionTypes.CREATE,
        payload: {
          eventEntity: {
            id: uuid(),
            type: eventTypes.LOGGED_IN,
            createdAt: dayjs(Date.now()).toISOString()
          }
        }
      }
    ];

    // api mock
    mockAxios.onPost("/api/v1/login").reply(200, user);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.login(user.name, "password"));

    // verify
    expect(store.getActions()).toEqual(expected);
  });

  test("logout", async () => {
    // expected actions
    const expected: (AuthAction | EventAction)[] = [
      {
        type: actionTypes.START_LOADING
      },
      {
        type: actionTypes.SET_LOGIN_USER,
        payload: {
          user: null
        }
      },
      {
        type: actionTypes.FINISH_LOADING
      },
      {
        type: eventsActionTypes.CREATE,
        payload: {
          eventEntity: {
            id: uuid(),
            type: eventTypes.LOGGED_OUT,
            createdAt: dayjs(Date.now()).toISOString()
          }
        }
      }
    ];

    // api mock
    // TODO check body
    mockAxiosWith401Handler.onPost("/api/v1/logout").reply(200);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.logout());

    // verify
    expect(store.getActions()).toEqual(expected);
  });

  test("signUp", async () => {
    const user = createTestUser();

    // expected actions
    const expected: (AuthAction | EventAction)[] = [
      {
        type: actionTypes.START_LOADING
      },
      {
        type: actionTypes.SET_LOGIN_USER,
        payload: {
          user: user
        }
      },
      {
        type: actionTypes.FINISH_LOADING
      },
      {
        type: eventsActionTypes.CREATE,
        payload: {
          eventEntity: {
            id: uuid(),
            type: eventTypes.SIGNED_UP,
            createdAt: dayjs(Date.now()).toISOString()
          }
        }
      }
    ];

    // api mock
    // TODO check body
    mockAxiosWith401Handler.onPost("/api/v1/users").reply(200, user);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.signUp(user.name, user.email, "password"));

    // verify
    expect(store.getActions()).toEqual(expected);
  });
});
