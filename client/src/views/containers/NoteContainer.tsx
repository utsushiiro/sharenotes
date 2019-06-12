import * as React from "react";
import { connect } from "react-redux";
import { Note } from "../../state/notes/types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "../../state/notes/actions";
import { notesOperations } from "../../state/notes";
import { useEffect } from "react";
import { State } from "../../state/types";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    path: {
      padding: theme.spacing(1, 2),
    },
    content: {
      flexGrow: 1
    },
    button: {
      margin: theme.spacing(1)
    },
    icon: {
      width: 20,
      height: 20,
      verticalAlign: "text-bottom"
    },
  })
);

const editorModeStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  borderRadius: "unset",
  zIndex: 1,
  backgroundColor: "white"
};

type Props = {
  note: Note;
  onMount: () => void;
  isFetching: boolean;
};

const tabComponentSwitcher = value => {
  return (
    <>
      {value === 0 && <div>Item One</div>}
      {value === 1 && <div>Item Two</div>}
      {value === 2 && <div>Item Three</div>}
      {value === 3 && <div>Item Four</div>}
      {value === 4 && <div>Item Five</div>}
    </>
  );
};

const NoteContainer: React.FC<Props> = ({ note, onMount, isFetching }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    onMount();
  }, []);

  const s = value === 1 ? editorModeStyle : {};

  return isFetching || note == null ? (
    <div>Loading...</div>
  ) : (
    <>
      <Box mt={2}>
        <Paper className={classes.path}>
          <Breadcrumbs aria-label="Breadcrumb">
            <HomeIcon className={classes.icon} />
            <Typography color="inherit">Path</Typography>
            <Typography color="inherit">To</Typography>
            <Typography color="textPrimary">Note</Typography>
          </Breadcrumbs>
        </Paper>
      </Box>
      <Box mt={2}>
        <Paper className={classes.content} >
          <Box p={2}>
            <Typography variant="h5" component="h1">
              {note.title}
            </Typography>
          </Box>
          <Divider />
          <Box style={s}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
            >
              <Tab label="View" />
              <Tab label="Edit" />
              <Tab label="History" />
              <Tab label="Children" />
              <Tab label="Others" />
            </Tabs>
            <Divider />
            {tabComponentSwitcher(value)}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

const mapStateToProps = ({ notesState }: State) => {
  return {
    note: notesState.note,
    isFetching: notesState.isFetching
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, void, Action>,
  ownProps: { id: string }
) => {
  return {
    onMount() {
      dispatch(notesOperations.fetchNote(parseInt(ownProps.id)));
    },
    deleteButtonHandler() {
      dispatch(notesOperations.deleteNoteAndRedirect(parseInt(ownProps.id)));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);
