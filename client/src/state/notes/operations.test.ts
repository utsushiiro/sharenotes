import { actionTypes } from "./actions";
import { push } from "connected-react-router";
import constants from "./constants";
import operations from "./operations";
import {
  mockStore,
  mockAxiosWith401Handler
} from "../../test-utils";
import { Note } from "./types";

describe("Note Operations", () => {
  test("createNoteAndRedirect", async () => {
    const note: Note = {
      id: 0,
      title: "test-title",
      content: "test-content",
      version: 0
    };

    // expected actions
    const expected = [
      {
        type: actionTypes.CREATE_NOTE.STARTED
      },
      {
        type: actionTypes.CREATE_NOTE.DONE,
        payload: {
          note
        }
      },
      {
        type: actionTypes.CREATE_NOTES_EVENT,
        payload: {
          type: constants.eventTypes.CREATED_NOTE
        }
      },
      push(`/notes/${note.id}`, { fromCreateNoteOperation: true })
    ];

    // api mock
    mockAxiosWith401Handler.onPost("/api/v1/notes").reply(200, note);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.createNoteAndRedirect(note.title, note.content));

    // verify
    expect(store.getActions()).toEqual(expected);
  });

  test("fetchNotes", async () => {
    const notes: Note[] = [{
      id: 0,
      title: "test-title",
      content: "test-content",
      version: 0
    }];

    // expected actions
    const expected = [
      {
        type: actionTypes.GET_NOTES.STARTED
      },
      {
        type: actionTypes.GET_NOTES.DONE,
        payload: {
          notes
        }
      }
    ];

    // api mock
    mockAxiosWith401Handler.onGet("/api/v1/notes").reply(200, { notes });

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.fetchNotes());

    // verify
    expect(store.getActions()).toEqual(expected);
  });

  test("fetchNote", async () => {
    const note: Note = {
      id: 0,
      title: "test-title",
      content: "test-content",
      version: 0
    };

    // expected actions
    const expected = [
      {
        type: actionTypes.GET_NOTE.STARTED
      },
      {
        type: actionTypes.GET_NOTE.DONE,
        payload: {
          note
        }
      }
    ];

    // api mock
    mockAxiosWith401Handler.onGet(`/api/v1/notes/${note.id}`).reply(200, note);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.fetchNote(note.id));

    // verify
    expect(store.getActions()).toEqual(expected);
  });

  test("updateNote", async () => {
    const note: Note = {
      id: 0,
      title: "test-title",
      content: "test-content",
      version: 0
    };

    const updatedNote: Note = {
      ...note,
      version: note.version + 1
    }

    // expected actions
    const expected = [
      {
        type: actionTypes.UPDATE_NOTE.STARTED
      },
      {
        type: actionTypes.UPDATE_NOTE.DONE,
        payload: {
          note: updatedNote
        }
      },
      {
        type: actionTypes.CREATE_NOTES_EVENT,
        payload: {
          type: constants.eventTypes.UPDATED_NOTE
        }
      },
      push(`/notes/${updatedNote.id}`)
    ];

    // api mock
    mockAxiosWith401Handler.onPatch(`/api/v1/notes/${note.id}`).reply(200, updatedNote);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.updateNote(note.id, note.title, note.content, note.version));

    // verify
    expect(store.getActions()).toEqual(expected);
  });
});
