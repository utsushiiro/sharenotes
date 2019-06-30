import actions from "./actions";
import { Dispatch } from "redux";
import api from "../api";
import { push } from "connected-react-router";
import { authSelectors } from "../auth";
import { State } from "../types";
import { noteEventTypes } from "./constants";

const createNoteAndRedirect = (title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.createNote.started());

    try {
      const response = await api.post("http://localhost:3001/api/notes/", {
        title,
        content
      });
      dispatch(actions.createNote.done(response.data));
      dispatch(actions.createNoteEvent(noteEventTypes.CREATED_NOTE));
      dispatch(
        push(`/notes/${response.data.id}`, { fromCreateNoteOperation: true })
      );
    } catch (err) {
      dispatch(actions.createNote.failed());
      dispatch(actions.createNoteEvent(noteEventTypes.FAILED_TO_CREATE_NOTE));
    }
  };
};

const fetchNotes = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getNotes.started());

    try {
      const response = await api.get("http://localhost:3001/api/notes/");
      dispatch(actions.getNotes.done(response.data.notes));
    } catch (err) {
      dispatch(actions.getNotes.failed());
    }
  };
};

const fetchNote = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getNote.started());

    try {
      const response = await api.get(`http://localhost:3001/api/notes/${id}`);
      dispatch(actions.getNote.done(response.data));
    } catch (err) {
      dispatch(actions.getNote.failed());
    }
  };
};

const updateNote = (id: number, title: string, content: string) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    const state = getState();
    const userId = authSelectors.getUserId(state.authState);

    dispatch(actions.updateNote.started());

    try {
      const response = await api.patch(
        `http://localhost:3001/api/notes/${id}`,
        {
          title,
          content,
          userId
        }
      );
      dispatch(
        actions.updateNote.done({
          id,
          title,
          content
        })
      );
      dispatch(actions.createNoteEvent(noteEventTypes.UPDATED_NOTE));
      dispatch(push(`/notes/${id}`));
    } catch (err) {
      dispatch(actions.updateNote.failed());
      dispatch(actions.createNoteEvent(noteEventTypes.FAILED_TO_UPDATE_NOTE));
    }
  };
};

const deleteNoteAndRedirect = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.deleteNote.started());

    try {
      const response = await api.delete(
        `http://localhost:3001/api/notes/${id}`
      );
      dispatch(actions.deleteNote.done());
      dispatch(actions.createNoteEvent(noteEventTypes.DELETED_NOTE));
      dispatch(push("/notes/"));
    } catch (err) {
      dispatch(actions.deleteNote.failed());
      dispatch(actions.createNoteEvent(noteEventTypes.FAILED_TO_DELETE_NOTE));
    }
  };
};

export default {
  createNoteAndRedirect,
  fetchNotes,
  fetchNote,
  updateNote,
  deleteNoteAndRedirect,
  createNoteEvent: actions.createNoteEvent,
  deleteNoteEvent: actions.deleteNoteEvent
};
