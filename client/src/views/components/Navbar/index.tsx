import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import UserMenuButton from "@components/UserMenuButton";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import NewNoteButton from "@components/NewNoteButton";

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
          <NewNoteButton />
          <IconButton color="inherit">
            <CreateNewFolderIcon />
          </IconButton>
          <UserMenuButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
