import actions from "./actions";
import { Dispatch } from "redux";
import api from "../api";
import { push } from "connected-react-router";

const createNoteAndRedirect = (title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.createNote.started());

    try {
      const response = await api.post("http://localhost:3001/api/notes/", {
        title,
        content
      });
      dispatch(actions.createNote.done(response.data));
      dispatch(push(`/notes/${response.data.id}`));
    } catch (err) {
      dispatch(actions.createNote.failed());
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

const updateNoteAndRedirect = (id: number, title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.updateNote.started());

    try {
      const response = await api.patch(
        `http://localhost:3001/api/notes/${id}`,
        {
          title,
          content
        }
      );
      dispatch(actions.updateNote.done(response.data));
      dispatch(push(`/notes/${id}`));
    } catch (err) {
      dispatch(actions.updateNote.failed());
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
      dispatch(push("/notes/"));
    } catch (err) {
      dispatch(actions.deleteNote.failed());
    }
  };
};

export default {
  createNoteAndRedirect,
  fetchNotes,
  fetchNote,
  updateNoteAndRedirect,
  deleteNoteAndRedirect
};
