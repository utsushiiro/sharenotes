import { actionCreators } from "./actions";
import { Dispatch } from "redux";
import api from "../../api";
import { push } from "connected-react-router";
import { noteEventTypes } from "./constants";

const createNoteAndRedirect = (title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.createNote.started());

    try {
      const response = await api.post("/api/v1/notes/", {
        title,
        content
      });
      dispatch(actionCreators.createNote.done(response.data));
      dispatch(actionCreators.createNoteEvent(noteEventTypes.CREATED_NOTE));
      dispatch(
        push(`/notes/${response.data.id}`, { fromCreateNoteOperation: true })
      );
    } catch (err) {
      dispatch(actionCreators.createNote.failed());
      dispatch(
        actionCreators.createNoteEvent(noteEventTypes.FAILED_TO_CREATE_NOTE)
      );
    }
  };
};

const fetchNotes = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.getNotes.started());

    try {
      const response = await api.get("/api/v1/notes/");
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
      const response = await api.get(`/api/v1/notes/${id}`);
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
      const response = await api.patch(`/api/v1/notes/${id}`, {
        title,
        content,
        version
      });
      dispatch(actionCreators.updateNote.done(response.data));
      dispatch(actionCreators.createNoteEvent(noteEventTypes.UPDATED_NOTE));
      dispatch(push(`/notes/${id}`));
    } catch (err) {
      dispatch(actionCreators.updateNote.failed());
      dispatch(
        actionCreators.createNoteEvent(noteEventTypes.FAILED_TO_UPDATE_NOTE)
      );
    }
  };
};

const deleteNoteAndRedirect = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.deleteNote.started());

    try {
      const response = await api.delete(`/api/v1/notes/${id}`);
      dispatch(actionCreators.deleteNote.done());
      dispatch(actionCreators.createNoteEvent(noteEventTypes.DELETED_NOTE));
      dispatch(push("/notes/"));
    } catch (err) {
      dispatch(actionCreators.deleteNote.failed());
      dispatch(
        actionCreators.createNoteEvent(noteEventTypes.FAILED_TO_DELETE_NOTE)
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
  createNoteEvent: actionCreators.createNoteEvent,
  deleteNoteEvent: actionCreators.deleteNoteEvent
};
