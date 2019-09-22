import reducer, { initialState } from "./reducers";
import { actionTypes } from "./actions";
import { UsersState, UsersAction } from "./types";
import { createTestUserEntity } from "@test-utils";

describe("Users Reducers", () => {
  describe("UPSERT_USER_ENTITIES", () => {
    test("insert", () => {
      // setup
      const state: UsersState = {
        ...initialState
      };

      const userEntity = createTestUserEntity();

      const action: UsersAction = {
        type: actionTypes.UPSERT_ENTITIES,
        payload: {
          userEntities: {
            [userEntity.id]: userEntity
          }
        }
      };

      const expected: UsersState = {
        ...initialState,
        entities: {
          byId: {
            [userEntity.id]: userEntity
          }
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("update", () => {
      // setup
      const userId = "1";
      const userEntity = createTestUserEntity({
        id: userId,
        name: "before@example.com"
      });

      const state: UsersState = {
        ...initialState,
        entities: {
          byId: {
            [userId]: userEntity
          }
        }
      };

      const updatedUserEntity = createTestUserEntity({
        id: userId,
        name: "after@example.com"
      });

      const action: UsersAction = {
        type: actionTypes.UPSERT_ENTITIES,
        payload: {
          userEntities: {
            [userId]: updatedUserEntity
          }
        }
      };

      const expected: UsersState = {
        ...initialState,
        entities: {
          byId: {
            [userId]: updatedUserEntity
          }
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("DELETE_USER_ENTITY", () => {
    test("no entity after delete", () => {
      // setup
      const userEntity = createTestUserEntity({ id: "1" });

      const state: UsersState = {
        ...initialState,
        entities: {
          byId: {
            [userEntity.id]: userEntity
          }
        }
      };

      const action: UsersAction = {
        type: actionTypes.DELETE_ENTITY,
        payload: {
          userId: userEntity.id
        }
      };

      const expected: UsersState = {
        ...initialState,
        entities: {
          byId: {}
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("some entity after delete", () => {
      // setup
      const userEntity1 = createTestUserEntity({ id: "1" });
      const userEntity2 = createTestUserEntity({ id: "2" });

      const state: UsersState = {
        ...initialState,
        entities: {
          byId: {
            [userEntity1.id]: userEntity1,
            [userEntity2.id]: userEntity2
          }
        }
      };

      const action: UsersAction = {
        type: actionTypes.DELETE_ENTITY,
        payload: {
          userId: userEntity1.id
        }
      };

      const expected: UsersState = {
        ...initialState,
        entities: {
          byId: {
            [userEntity2.id]: userEntity2
          }
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("RESET_USER_ENTITIES", () => {
    // setup
    const userEntity1 = createTestUserEntity({ id: "1" });
    const userEntity2 = createTestUserEntity({ id: "2" });

    const state: UsersState = {
      ...initialState,
      entities: {
        byId: {
          [userEntity1.id]: userEntity1,
          [userEntity2.id]: userEntity2
        }
      }
    };

    const action: UsersAction = {
      type: actionTypes.RESET_ENTITIES
    };

    const expected: UsersState = {
      ...initialState,
      entities: {
        byId: {}
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });

  describe("START_USER_LOADING", () => {
    // setup
    const state: UsersState = {
      ...initialState,
      meta: {
        isLoading: false
      }
    };

    const action: UsersAction = {
      type: actionTypes.START_LOADING
    };

    const expected: UsersState = {
      ...initialState,
      meta: {
        isLoading: true
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });

  describe("FINISH_USER_LOADING", () => {
    // setup
    const state: UsersState = {
      ...initialState,
      meta: {
        isLoading: true
      }
    };

    const action: UsersAction = {
      type: actionTypes.FINISH_LOADING
    };

    const expected: UsersState = {
      ...initialState,
      meta: {
        isLoading: false
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });
});
