import { Note } from "./types";
import { notesOps } from ".";
import { useDispatch, useSelector } from "@state/store";

export function useNote() {
  const dispatch = useDispatch();
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
    await dispatch(notesOps.fetchNote(noteId));
  };

  const createNote = async (title: string, content: string) => {
    const noteId = await dispatch(notesOps.createNote(title, content));
    return noteId;
  };

  const updateNote = async (
    id: string,
    title: string,
    content: string,
    version: string
  ) => {
    await dispatch(notesOps.updateNote(id, title, content, version));
  };

  const deleteNote = async (id: string) => {
    await dispatch(notesOps.deleteNote(id));
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
  const dispatch = useDispatch();
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
    await dispatch(notesOps.fetchNotes());
  };

  return {
    isLoading,
    selectNotes,
    fetchNotes
  };
}
