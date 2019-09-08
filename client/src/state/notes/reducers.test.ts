import reducer from "./reducers";
import { actionTypes } from "./actions";
import { Note, NotesState, NotesAction } from "./types";
import { createTestNote } from "@test-utils";

describe("Note Reducers", () => {
  describe("CREATE_NOTE", () => {
    test("STARTED", () => {
      // setup
      const state: NotesState = {
        isLoading: false,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.CREATE_NOTE.STARTED
      };

      const expected: NotesState = {
        isLoading: true,
        notes: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const note = createTestNote();

      const state: NotesState = {
        isLoading: true,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.CREATE_NOTE.DONE,
        payload: {
          note
        }
      };

      const expected: NotesState = {
        isLoading: false,
        notes: [note]
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state: NotesState = {
        isLoading: true,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.CREATE_NOTE.FAILED
      };

      const expected: NotesState = {
        isLoading: false,
        notes: []
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
      const state: NotesState = {
        isLoading: false,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.GET_NOTES.STARTED
      };

      const expected: NotesState = {
        isLoading: true,
        notes: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const notes: Note[] = [createTestNote()];

      const state: NotesState = {
        isLoading: true,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.GET_NOTES.DONE,
        payload: {
          notes
        }
      };

      const expected: NotesState = {
        isLoading: false,
        notes: notes
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state: NotesState = {
        isLoading: true,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.GET_NOTES.FAILED
      };

      const expected: NotesState = {
        isLoading: false,
        notes: []
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
      const state: NotesState = {
        isLoading: false,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.GET_NOTE.STARTED
      };

      const expected: NotesState = {
        isLoading: true,
        notes: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const note = createTestNote();

      const state: NotesState = {
        isLoading: true,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.GET_NOTE.DONE,
        payload: {
          note
        }
      };

      const expected: NotesState = {
        isLoading: false,
        notes: [note]
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state: NotesState = {
        isLoading: true,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.GET_NOTE.FAILED
      };

      const expected: NotesState = {
        isLoading: false,
        notes: []
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
      const state: NotesState = {
        isLoading: false,
        notes: []
      };

      const action: NotesAction = {
        type: actionTypes.UPDATE_NOTE.STARTED
      };

      const expected: NotesState = {
        isLoading: false,
        notes: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const note = createTestNote();

      const updatedNote: Note = {
        ...note,
        content: "test-content-2",
        version: "1"
      };

      const state: NotesState = {
        isLoading: false,
        notes: [note]
      };

      const action: NotesAction = {
        type: actionTypes.UPDATE_NOTE.DONE,
        payload: {
          note: updatedNote
        }
      };

      const expected: NotesState = {
        isLoading: false,
        notes: [updatedNote]
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const note = createTestNote();

      const state: NotesState = {
        isLoading: false,
        notes: [note]
      };

      const action: NotesAction = {
        type: actionTypes.UPDATE_NOTE.FAILED
      };

      const expected: NotesState = {
        isLoading: false,
        notes: [note]
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });
});
