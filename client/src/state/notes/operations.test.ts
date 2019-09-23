import { actionTypes } from "./actions";
import { actionTypes as eventsActionTypes } from "@state/events/actions";
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
import { EventAction } from "@state/events/types";
import uuid from "uuid/v4";
import dayjs from "dayjs";
import { eventTypes } from "@state/events/constants";

// mocks
const fixedUUID = "00000000-0000-0000-0000-000000000000";
jest.mock("uuid/v4", () => () => fixedUUID);
const fixedDate = new Date("2019-09-23");
jest.spyOn(global.Date, "now").mockImplementation(() => fixedDate.getTime());

describe("Note Operations", () => {
  test("createNote", async () => {
    const note = createTestNote();
    const normalizedData = normalize(note, noteSchema);
    const noteEntities = normalizedData.entities.notes;
    const userEntities = normalizedData.entities.users;

    // expected actions
    const expected: (NotesAction | UsersAction | EventAction)[] = [
      {
        type: actionTypes.START_LOADING
      },
      {
        type: actionTypes.UPSERT_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_ENTITIES,
        payload: {
          userEntities
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
            type: eventTypes.CREATED_NOTE,
            createdAt: dayjs(Date.now()).toISOString()
          }
        }
      }
    ];

    // api mock
    mockAxiosWith401Handler.onPost("/api/v1/notes").reply(200, note);

    // mock store
    const store = mockStore();

    // execute
    await store.dispatch(operations.createNote(note.title, note.content));

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
        type: actionTypes.START_LOADING
      },
      {
        type: actionTypes.UPSERT_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_ENTITIES,
        payload: {
          userEntities
        }
      },
      {
        type: actionTypes.FINISH_LOADING
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
        type: actionTypes.START_LOADING
      },
      {
        type: actionTypes.UPSERT_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_ENTITIES,
        payload: {
          userEntities
        }
      },
      {
        type: actionTypes.FINISH_LOADING
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
    const expected: (NotesAction | UsersAction | EventAction)[] = [
      {
        type: actionTypes.START_LOADING
      },
      {
        type: actionTypes.UPSERT_ENTITIES,
        payload: {
          noteEntities
        }
      },
      {
        type: usersActionTypes.UPSERT_ENTITIES,
        payload: {
          userEntities
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
            type: eventTypes.UPDATED_NOTE,
            createdAt: dayjs(Date.now()).toISOString()
          }
        }
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
