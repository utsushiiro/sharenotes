import { actionTypes } from "./actions";
import { push, RouterAction } from "connected-react-router";
import operations from "./operations";
import {
  mockStore,
  mockAxiosWith401Handler,
  createTestNote
} from "@test-utils";
import { NotesAction } from "./types";
import { normalize } from "normalizr";
import { noteSchema, notesObjectSchema } from "./schema";
import { actionTypes as usersActionTypes } from "@state/users/actions";
import { UsersAction } from "@state/users/types";

describe("Note Operations", () => {
  test("createNoteAndRedirect", async () => {
    const note = createTestNote();
    const normalizedData = normalize(note, noteSchema);
    const noteEntities = normalizedData.entities.notes;
    const userEntities = normalizedData.entities.users;

    // expected actions
    const expected: (NotesAction | UsersAction | RouterAction)[] = [
      {
        type: actionTypes.START_NOTE_LOADING
      },
      {
        type: actionTypes.UPSERT_NOTE_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_USER_ENTITIES,
        payload: {
          userEntities
        }
      },
      push(`/notes/${note.id}`, { fromCreateNoteOperation: true }),
      {
        type: actionTypes.FINISH_NOTE_LOADING
      }
    ];

    // api mock
    mockAxiosWith401Handler.onPost("/api/v1/notes").reply(200, note);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(
      operations.createNoteAndRedirect(note.title, note.content)
    );

    // verify
    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });

  test("fetchNotes", async () => {
    const notes = {
      notes: [createTestNote({ id: "0" }), createTestNote({ id: "1" })]
    };
    const normalizedData = normalize(notes, notesObjectSchema);
    const noteEntities = normalizedData.entities.notes;
    const userEntities = normalizedData.entities.users;

    // expected actions
    const expected: (NotesAction | UsersAction)[] = [
      {
        type: actionTypes.START_NOTE_LOADING
      },
      {
        type: actionTypes.UPSERT_NOTE_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_USER_ENTITIES,
        payload: {
          userEntities
        }
      },
      {
        type: actionTypes.FINISH_NOTE_LOADING
      }
    ];

    // api mock
    mockAxiosWith401Handler.onGet("/api/v1/notes").reply(200, { ...notes });

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.fetchNotes());

    // verify
    expect(store.getActions()).toEqual(expected);
  });

  test("fetchNote", async () => {
    const note = createTestNote();
    const normalizedData = normalize(note, noteSchema);
    const noteEntities = normalizedData.entities.notes;
    const userEntities = normalizedData.entities.users;

    // expected actions
    const expected: (NotesAction | UsersAction)[] = [
      {
        type: actionTypes.START_NOTE_LOADING
      },
      {
        type: actionTypes.UPSERT_NOTE_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_USER_ENTITIES,
        payload: {
          userEntities
        }
      },
      {
        type: actionTypes.FINISH_NOTE_LOADING
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
    const note = createTestNote();
    const normalizedData = normalize(note, noteSchema);
    const noteEntities = normalizedData.entities.notes;
    const userEntities = normalizedData.entities.users;

    // expected actions
    const expected: (NotesAction | UsersAction)[] = [
      {
        type: actionTypes.START_NOTE_LOADING
      },
      {
        type: actionTypes.UPSERT_NOTE_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_USER_ENTITIES,
        payload: {
          userEntities
        }
      },
      {
        type: actionTypes.FINISH_NOTE_LOADING
      }
    ];

    // api mock
    mockAxiosWith401Handler
      .onPatch(`/api/v1/notes/${note.id}`)
      .reply(200, note);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(
      operations.updateNote(note.id, note.title, note.content, note.version)
    );

    // verify
    expect(store.getActions()).toEqual(expect.arrayContaining(expected));
  });
});
