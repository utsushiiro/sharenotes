import { actionCreators } from "./actions";
import { Dispatch } from "redux";
import { apiGet, apiPost, apiPatch, apiDelete } from "@api";
import { push } from "connected-react-router";
import constants from "./constants";
import { eventsOperations } from "@state/events";

const createNoteAndRedirect = (title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.createNote.started());

    try {
      const response = await apiPost("/api/v1/notes", {
        body: {
          title,
          content
        }
      });
      dispatch(actionCreators.createNote.done(response.data));
      dispatch(
        eventsOperations.createEvent(constants.eventTypes.CREATED_NOTE)
      );
      dispatch(
        push(`/notes/${response.data.id}`, { fromCreateNoteOperation: true })
      );
    } catch (err) {
      dispatch(actionCreators.createNote.failed());
      dispatch(
        eventsOperations.createEvent(
          constants.eventTypes.FAILED_TO_CREATE_NOTE
        )
      );
    }
  };
};

const fetchNotes = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.getNotes.started());

    try {
      const response = await apiGet("/api/v1/notes");
      dispatch(actionCreators.getNotes.done(response.data.notes));
    } catch (err) {
      dispatch(actionCreators.getNotes.failed());
    }
  };
};

const fetchNote = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.getNote.started());

    try {
      const response = await apiGet("/api/v1/notes/:id", {
        vars: { id: String(id) }
      });
      dispatch(actionCreators.getNote.done(response.data));
    } catch (err) {
      dispatch(actionCreators.getNote.failed());
    }
  };
};

const updateNote = (
  id: number,
  title: string,
  content: string,
  version: number
) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.updateNote.started());

    try {
      const response = await apiPatch("/api/v1/notes/:id", {
        vars: { id: String(id) },
        body: {
          title,
          content,
          version
        }
      });
      dispatch(actionCreators.updateNote.done(response.data));
      dispatch(
        eventsOperations.createEvent(constants.eventTypes.UPDATED_NOTE)
      );
      dispatch(push(`/notes/${id}`));
    } catch (err) {
      dispatch(actionCreators.updateNote.failed());
      dispatch(
        eventsOperations.createEvent(
          constants.eventTypes.FAILED_TO_UPDATE_NOTE
        )
      );
    }
  };
};

const deleteNoteAndRedirect = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.deleteNote.started());

    try {
      await apiDelete("/api/v1/notes/:id", {
        vars: { id: String(id) }
      });
      dispatch(actionCreators.deleteNote.done());
      dispatch(
        eventsOperations.createEvent(constants.eventTypes.DELETED_NOTE)
      );
      dispatch(push("/notes/"));
    } catch (err) {
      dispatch(actionCreators.deleteNote.failed());
      dispatch(
        eventsOperations.createEvent(
          constants.eventTypes.FAILED_TO_DELETE_NOTE
        )
      );
    }
  };
};

export default {
  createNoteAndRedirect,
  fetchNotes,
  fetchNote,
  updateNote,
  deleteNoteAndRedirect,
};
