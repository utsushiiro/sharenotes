import { actionCreators } from "./actions";
import { Dispatch } from "redux";
import { apiGet, apiPost, apiPatch, apiDelete } from "@api";
import { push } from "connected-react-router";
import { eventsOperations, eventsConstants } from "@state/events";
import { normalize } from "normalizr";
import { noteSchema, notesObjectSchema } from "./schema";
import { actionCreators as usersActionCreators } from "@state/users/actions";

const createNoteAndRedirect = (title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionCreators.startNoteLoading());

      const response = await apiPost("/api/v1/notes", {
        body: {
          title,
          content
        }
      });

      const normalizedData = normalize(response.data, noteSchema);
      dispatch(
        actionCreators.upsertNoteEntities(normalizedData.entities.notes)
      );
      dispatch(
        usersActionCreators.upsertUserEntities(normalizedData.entities.users)
      );

      dispatch(
        eventsOperations.createEvent(eventsConstants.eventTypes.CREATED_NOTE)
      );

      dispatch(
        push(`/notes/${response.data.id}`, { fromCreateNoteOperation: true })
      );
    } catch (err) {
      dispatch(
        eventsOperations.createEvent(
          eventsConstants.eventTypes.FAILED_TO_CREATE_NOTE
        )
      );
    } finally {
      dispatch(actionCreators.finishNoteLoading());
    }
  };
};

const fetchNotes = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.startNoteLoading());

    try {
      const response = await apiGet("/api/v1/notes");

      const normalizedData = normalize(response.data, notesObjectSchema);
      dispatch(
        actionCreators.upsertNoteEntities(normalizedData.entities.notes)
      );
      dispatch(
        usersActionCreators.upsertUserEntities(normalizedData.entities.users)
      );
    } finally {
      dispatch(actionCreators.finishNoteLoading());
    }
  };
};

const fetchNote = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionCreators.startNoteLoading());

      const response = await apiGet("/api/v1/notes/:id", {
        vars: { id: id }
      });

      const normalizedData = normalize(response.data, noteSchema);
      dispatch(
        actionCreators.upsertNoteEntities(normalizedData.entities.notes)
      );
      dispatch(
        usersActionCreators.upsertUserEntities(normalizedData.entities.users)
      );
    } finally {
      dispatch(actionCreators.finishNoteLoading());
    }
  };
};

const updateNote = (
  id: string,
  title: string,
  content: string,
  version: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionCreators.startNoteLoading());

      const response = await apiPatch("/api/v1/notes/:id", {
        vars: { id: id },
        body: {
          title,
          content,
          version
        }
      });

      const normalizedData = normalize(response.data, noteSchema);
      dispatch(
        actionCreators.upsertNoteEntities(normalizedData.entities.notes)
      );
      dispatch(
        usersActionCreators.upsertUserEntities(normalizedData.entities.users)
      );

      dispatch(
        eventsOperations.createEvent(eventsConstants.eventTypes.UPDATED_NOTE)
      );
      dispatch(push(`/notes/${id}`));
    } catch (err) {
      dispatch(
        eventsOperations.createEvent(
          eventsConstants.eventTypes.FAILED_TO_UPDATE_NOTE
        )
      );
    } finally {
      dispatch(actionCreators.finishNoteLoading());
    }
  };
};

const deleteNoteAndRedirect = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionCreators.startNoteLoading());
      await apiDelete("/api/v1/notes/:id", {
        vars: { id: id }
      });

      dispatch(actionCreators.deleteNoteEntity(id));

      dispatch(
        eventsOperations.createEvent(eventsConstants.eventTypes.DELETED_NOTE)
      );
      dispatch(push("/notes/"));
    } catch (err) {
      dispatch(
        eventsOperations.createEvent(
          eventsConstants.eventTypes.FAILED_TO_DELETE_NOTE
        )
      );
    } finally {
      dispatch(actionCreators.finishNoteLoading());
    }
  };
};

export default {
  createNoteAndRedirect,
  fetchNotes,
  fetchNote,
  updateNote,
  deleteNoteAndRedirect
};
