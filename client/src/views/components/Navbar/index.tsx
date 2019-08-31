import * as React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { authOperations } from "@state/auth";
import { notesOperations } from "@state/notes";
import { useState, useCallback } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const Navbar: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const openDialogHandler = useCallback(() => {
    setOpen(true);
  }, []);
  const closeDialogHandler = useCallback(() => {
    setOpen(false);
  }, []);

  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const logoutButtonHandler = useCallback(() => {
    dispatch(authOperations.logout());
  }, []);
  const newButtonHandler = useCallback(() => {
    closeDialogHandler();
    dispatch(notesOperations.createNoteAndRedirect(title, ""));
  }, [title]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.title}>
            <Link
              color="inherit"
              component={RouterLink}
              to="/notes"
              style={{ textDecoration: "none" }}
            >
              ShareNotes
            </Link>
          </Typography>
          <Button color="inherit" onClick={openDialogHandler}>
            New
          </Button>
          <Button color="inherit" onClick={logoutButtonHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={closeDialogHandler} fullWidth={true}>
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
          <Button onClick={closeDialogHandler} color="secondary">
            Cancel
          </Button>
          <Button onClick={newButtonHandler} color="primary">
            New
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
