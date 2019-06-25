import * as React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../state/types";
import { Action } from "../../state/notes/actions";
import { authOperations } from "../../state/auth";
import { User } from "../../state/auth/types";

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
import { notesOperations } from "../../state/notes";

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
type Props = {
  loginUser: User;
  logoutButtonHandler: () => void;
  newButtonHandler: (title: string) => void;
};

const Navbar: React.FC<Props> = ({
  logoutButtonHandler,
  loginUser,
  newButtonHandler
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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
            {/* TODO use styled-component */}
            <Link
              color="inherit"
              component={RouterLink}
              to="/notes"
              style={{ textDecoration: "none" }}
            >
              ShareNotes
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            New
          </Button>
          <Button color="inherit" onClick={logoutButtonHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => newButtonHandler(title)} color="primary">
            New
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ authState }: State) => {
  return {
    loginUser: authState.loginUser
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => {
  return {
    logoutButtonHandler: () => {
      dispatch(authOperations.logout());
    },
    newButtonHandler: (title: string) => {
      console.log(title);
      dispatch(notesOperations.createNoteAndRedirect(title, ""));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
