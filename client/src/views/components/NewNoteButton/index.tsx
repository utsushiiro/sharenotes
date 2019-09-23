import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { useState, useCallback } from "react";
import React from "react";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { useNote } from "@state/notes/hooks";
import { useRouter } from "@state/router/hooks";

const NewNoteButton: React.FC = () => {
  // for dialog open&close
  const [open, setOpen] = useState(false);
  const handleOpenDialog = useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);

  // for new note form
  const [title, setTitle] = useState("");
  const { createNote } = useNote();
  const router = useRouter();
  const handleNewNote = useCallback(async () => {
    handleCloseDialog();
    const noteId = await createNote(title, "");
    // redirect to note page on success
    if (noteId !== undefined) {
      router.push(`/notes/${noteId}`);
    }
  }, [title]);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenDialog}>
        <LibraryAddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth={true}>
        <DialogTitle>Create New Note</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Note Title"
            type="text"
            fullWidth
            onChange={e => setTitle(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleNewNote} color="primary">
            New
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewNoteButton;
