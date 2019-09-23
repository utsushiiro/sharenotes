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

const NewNoteButton: React.FC = () => {
  // for dialog open&close
  const [open, setOpen] = useState(false);
  const handleDialogOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleDialogClose = useCallback(() => {
    setOpen(false);
  }, []);

  // for new note form
  const [title, setTitle] = useState("");
  const { createNote } = useNote();
  const handleNewNote = useCallback(() => {
    handleDialogClose();
    createNote(title, "");
  }, [title]);

  return (
    <>
      <IconButton color="inherit" onClick={handleDialogOpen}>
        <LibraryAddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleDialogClose} fullWidth={true}>
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
          <Button onClick={handleDialogClose} color="secondary">
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
