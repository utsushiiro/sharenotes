import reducer, { initialState } from "./reducers";
import { actionTypes } from "./actions";
import { NotesState, NotesAction } from "./types";
import { createTestNoteEntity } from "@test-utils";

describe("Note Reducers", () => {
  describe("UPSERT_NOTE_ENTITIES", () => {
    test("insert", () => {
      // setup
      const state: NotesState = {
        ...initialState
      };

      const noteEntity = createTestNoteEntity();

      const action: NotesAction = {
        type: actionTypes.UPSERT_NOTE_ENTITIES,
        payload: {
          noteEntities: {
            [noteEntity.id]: noteEntity
          }
        }
      };

      const expected: NotesState = {
        ...initialState,
        entities: {
          byId: {
            [noteEntity.id]: noteEntity
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
      const noteId = "1";
      const noteEntity = createTestNoteEntity({ id: noteId, version: "0" });

      const state: NotesState = {
        ...initialState,
        entities: {
          byId: {
            [noteId]: noteEntity
          }
        }
      };

      const updatedNoteEntity = createTestNoteEntity({
        id: noteId,
        version: "1"
      });

      const action: NotesAction = {
        type: actionTypes.UPSERT_NOTE_ENTITIES,
        payload: {
          noteEntities: {
            [noteId]: updatedNoteEntity
          }
        }
      };

      const expected: NotesState = {
        ...initialState,
        entities: {
          byId: {
            [noteId]: updatedNoteEntity
          }
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("DELETE_NOTE_ENTITY", () => {
    test("no entity after delete", () => {
      // setup
      const noteEntity = createTestNoteEntity({ id: "1" });

      const state: NotesState = {
        ...initialState,
        entities: {
          byId: {
            [noteEntity.id]: noteEntity
          }
        }
      };

      const action: NotesAction = {
        type: actionTypes.DELETE_NOTE_ENTITY,
        payload: {
          noteId: noteEntity.id
        }
      };

      const expected: NotesState = {
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
      const noteEntity1 = createTestNoteEntity({ id: "1" });
      const noteEntity2 = createTestNoteEntity({ id: "2" });

      const state: NotesState = {
        ...initialState,
        entities: {
          byId: {
            [noteEntity1.id]: noteEntity1,
            [noteEntity2.id]: noteEntity2
          }
        }
      };

      const action: NotesAction = {
        type: actionTypes.DELETE_NOTE_ENTITY,
        payload: {
          noteId: noteEntity1.id
        }
      };

      const expected: NotesState = {
        ...initialState,
        entities: {
          byId: {
            [noteEntity2.id]: noteEntity2
          }
        }
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  test("RESET_NOTE_ENTITIES", () => {
    // setup
    const noteEntity1 = createTestNoteEntity({ id: "1" });
    const noteEntity2 = createTestNoteEntity({ id: "2" });

    const state: NotesState = {
      ...initialState,
      entities: {
        byId: {
          [noteEntity1.id]: noteEntity1,
          [noteEntity2.id]: noteEntity2
        }
      }
    };

    const action: NotesAction = {
      type: actionTypes.RESET_NOTE_ENTITIES
    };

    const expected: NotesState = {
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

  test("START_NOTE_LOADING", () => {
    // setup
    const state: NotesState = {
      ...initialState,
      meta: {
        isLoading: false
      }
    };

    const action: NotesAction = {
      type: actionTypes.START_NOTE_LOADING
    };

    const expected: NotesState = {
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

  test("FINISH_NOTE_LOADING", () => {
    // setup
    const state: NotesState = {
      ...initialState,
      meta: {
        isLoading: true
      }
    };

    const action: NotesAction = {
      type: actionTypes.FINISH_NOTE_LOADING
    };

    const expected: NotesState = {
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
