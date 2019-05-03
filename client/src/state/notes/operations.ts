import actions from "./actions";
import { Dispatch } from "redux";
import axios from "axios";
import { push } from "connected-react-router";

const createNoteAndRedirect = (title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.createNote.started());
    
    try{
      const response = await axios.post(
        "http://localhost:3001/api/notes/",
        {
          title,
          content,
        }
      );
      dispatch(actions.createNote.done(response.data));
      dispatch(push(`/notes/${response.data.id}`));
    }catch(err) {
      dispatch(actions.createNote.failed());
    }
  }
}

const fetchNotes = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getNotes.started());

    try{
      const response = await axios.get("http://localhost:3001/api/notes/");
      dispatch(actions.getNotes.done(response.data.notes));
    }catch(err) {
      dispatch(actions.getNotes.failed());
    }
  }
};

const fetchNote = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getNote.started());

    try{
      const response = await axios.get(`http://localhost:3001/api/notes/${id}`);
      dispatch(actions.getNote.done(response.data));
    }catch(err) {
      dispatch(actions.getNote.failed());
    }
  }
};

const updateNoteAndRedirect = (id: number, title: string, content: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.updateNote.started());

    try{
      const response = await axios.patch(
        `http://localhost:3001/api/notes/${id}`,
        {
          title,
          content,
        }
      );
      dispatch(actions.updateNote.done(response.data));
      dispatch(push(`/notes/${id}`));
    }catch(err) {
      dispatch(actions.updateNote.failed());
    }
  }
};

export default {
  createNoteAndRedirect,
  fetchNotes,
  fetchNote,
  updateNoteAndRedirect,
};
