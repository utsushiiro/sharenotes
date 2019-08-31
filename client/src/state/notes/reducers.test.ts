import reducer from "./reducers";
import { actionTypes } from "./actions";
import { Note } from "./types";

describe("Note Reducers", () => {
  describe("CREATE_NOTE", () => {
    test("STARTED", () => {
      // setup
      const state = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.CREATE_NOTE.STARTED
      };

      const expected = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const note: Note = {
        id: 0,
        title: "test-title",
        content: "test-content",
        version: 0
      };

      const state = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.CREATE_NOTE.DONE,
        payload: {
          note
        }
      };

      const expected = {
        isLoading: false,
        note: note,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.CREATE_NOTE.FAILED
      };

      const expected = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("GET_NOTES", () => {
    test("STARTED", () => {
      // setup
      const state = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.GET_NOTES.STARTED
      };

      const expected = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const notes: Note[] = [
        {
          id: 0,
          title: "test-title",
          content: "test-content",
          version: 0
        }
      ];

      const state = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.GET_NOTES.DONE,
        payload: {
          notes
        }
      };

      const expected = {
        isLoading: false,
        note: null,
        notes: notes,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.GET_NOTES.FAILED
      };

      const expected = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("GET_NOTE", () => {
    test("STARTED", () => {
      // setup
      const state = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.GET_NOTE.STARTED
      };

      const expected = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const note: Note = {
        id: 0,
        title: "test-title",
        content: "test-content",
        version: 0
      };

      const state = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.GET_NOTE.DONE,
        payload: {
          note
        }
      };

      const expected = {
        isLoading: false,
        note: note,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state = {
        isLoading: true,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.GET_NOTE.FAILED
      };

      const expected = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("UPDATE_NOTE", () => {
    test("STARTED", () => {
      // setup
      const state = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.UPDATE_NOTE.STARTED
      };

      const expected = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const note: Note = {
        id: 0,
        title: "test-title",
        content: "test-content",
        version: 0
      };

      const state = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.UPDATE_NOTE.DONE,
        payload: {
          note
        }
      };

      const expected = {
        isLoading: false,
        note: note,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      const action = {
        type: actionTypes.UPDATE_NOTE.FAILED
      };

      const expected = {
        isLoading: false,
        note: null,
        notes: [],
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });
});
