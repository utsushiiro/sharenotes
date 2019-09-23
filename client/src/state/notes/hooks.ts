import { Note } from "./types";
import { notesOps } from ".";
import { ThunkDispatch } from "redux-thunk";
import { Action, State } from "@state/types";
import { useDispatch, useSelector } from "@state/store";

export function useNote() {
  const dispatch: ThunkDispatch<State, void, Action> = useDispatch();
  const isLoading = useSelector(state => state.notesState.meta.isLoading);

  const selectNote = (noteId: string) => {
    const notesById = useSelector(state => state.notesState.entities.byId);
    const usersById = useSelector(state => state.usersState.entities.byId);

    const noteEntity = notesById[noteId];
    if (noteEntity === undefined) return undefined;
    const createdBy = usersById[noteEntity.createdBy];
    const updatedBy = usersById[noteEntity.updatedBy];
    if (createdBy === undefined || updatedBy === undefined) return undefined;

    return {
      ...noteEntity,
      updatedBy,
      createdBy
    } as Note;
  };

  const fetchNote = async (noteId: string) => {
    dispatch(notesOps.fetchNote(noteId));
  };

  const createNote = async (title: string, content: string) => {
    dispatch(notesOps.createNoteAndRedirect(title, content));
  };

  const updateNote = (
    id: string,
    title: string,
    content: string,
    version: string
  ) => {
    dispatch(notesOps.updateNote(id, title, content, version));
  };

  const deleteNote = (id: string) => {
    dispatch(notesOps.deleteNoteAndRedirect(id));
  };

  return {
    isLoading,
    selectNote,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
  };
}

export function useNotes() {
  const dispatch: ThunkDispatch<State, void, Action> = useDispatch();
  const isLoading = useSelector(state => state.notesState.meta.isLoading);

  const selectNotes = () => {
    const notesById = useSelector(state => state.notesState.entities.byId);
    const usersById = useSelector(state => state.usersState.entities.byId);

    const noteEntities = Object.keys(notesById).map(key => notesById[key]);
    const notes = noteEntities
      .map(noteEntity => {
        if (noteEntity === undefined) return undefined;
        const createdBy = usersById[noteEntity.createdBy];
        const updatedBy = usersById[noteEntity.updatedBy];
        if (createdBy === undefined || updatedBy === undefined)
          return undefined;
        return {
          ...noteEntity,
          updatedBy,
          createdBy
        } as Note;
      })
      .filter((note): note is Note => note !== undefined);

    return notes;
  };

  const fetchNotes = async () => {
    dispatch(notesOps.fetchNotes());
  };

  return {
    isLoading,
    selectNotes,
    fetchNotes
  };
}
