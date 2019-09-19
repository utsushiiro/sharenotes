import { axiosInstance, axiosInstanceWith401Handler } from "@api/axios-base";
import MockAdapter from "axios-mock-adapter";
import createMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { State, Action } from "@state/types";
import { Note, NoteEntity } from "@state/notes/types";
import { User, UserEntity } from "@state/users/types";
import { EventEntity } from "@state/events/types";
import constants from "@state/events/constants";
import uuid from "uuid";

// store
type Dispatch = ThunkDispatch<State, void, Action>;
const middlewares = [thunk];
export const mockStore = createMockStore<State, Dispatch>(middlewares);

// axios
export const mockAxios = new MockAdapter(axiosInstance);
export const mockAxiosWith401Handler = new MockAdapter(
  axiosInstanceWith401Handler
);

// factory
export function createTestNote(note: Partial<Note> = {}): Note {
  return {
    id: "0",
    title: "test-title",
    content: "test-content",
    version: "0",
    updatedAt: "XXX",
    updatedBy: createTestUser(),
    createdAt: "XXX",
    createdBy: createTestUser(),
    ...note
  };
}

export function createTestNoteEntity(
  noteEntity: Partial<NoteEntity> = {}
): NoteEntity {
  return {
    id: "0",
    title: "test-title",
    content: "test-content",
    version: "0",
    updatedAt: "XXX",
    updatedBy: "0",
    createdAt: "XXX",
    createdBy: "0",
    ...noteEntity
  };
}

export function createTestUser(user: Partial<User> = {}): User {
  return {
    id: "0",
    email: "test@example.com",
    name: "test-name",
    ...user
  };
}

export function createTestUserEntity(
  userEntity: Partial<UserEntity> = {}
): UserEntity {
  return {
    id: "0",
    email: "test@example.com",
    name: "test-name",
    ...userEntity
  };
}

export function createTestEventEntity(
  eventEntity: Partial<EventEntity> = {}
): EventEntity {
  return {
    id: uuid(),
    type: constants.eventTypes.LOGGED_IN,
    createdAt: new Date().toISOString(),
    ...eventEntity
  };
}
