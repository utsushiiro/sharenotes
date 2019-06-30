import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "../../state/notes/actions";
import { notesOperations } from "../../state/notes";
import { useEffect } from "react";
import { State } from "../../state/types";
import { Note as NoteType, NoteEvent } from "../../state/notes/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import { Note } from "../components/Note";
import { Editor } from "../components/Editor";
import { useSnackbar } from "notistack";
import { noteEventTypes } from "../../state/notes/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    path: {
      padding: theme.spacing(1, 2)
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
    }
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
  note: NoteType | null;
  onMount: () => void;
  deleteButtonHandler: () => void;
  updateButtonHandler: (title: string, content: string) => void;
  isFetching: boolean;
  isEditorMode: boolean;
  events: NoteEvent[];
  deleteEvent: (eventId: string) => void;
};

const NoteContainer: React.FC<Props> = ({
  note,
  onMount,
  updateButtonHandler,
  deleteButtonHandler,
  isFetching,
  isEditorMode,
  events,
  deleteEvent
}) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(isEditorMode ? 1 : 0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const modeStyle = tabValue === 1 ? editorModeStyle : {};

  useEffect(() => {
    onMount();
  }, []);

  useEffect(() => {
    events.forEach(event => {
      if (event.type === noteEventTypes.UPDATED_NOTE) {
        enqueueSnackbar("Successfuly updated", {
          variant: "success",
          autoHideDuration: 1500
        });
        deleteEvent(event.id);
      } else if (event.type === noteEventTypes.FAILED_TO_UPDATE_NOTE) {
        enqueueSnackbar("Failed to update", {
          variant: "error",
          autoHideDuration: 1500
        });
        deleteEvent(event.id);
      }
    });
  });

  const tabComponentSwitcher = (value: number, note: NoteType) => {
    return (
      <>
        {value === 0 && (
          <Note note={note} deleteButtonHandler={deleteButtonHandler} />
        )}
        {value === 1 && (
          <Editor
            note={note}
            updateButtonHandler={content =>
              updateButtonHandler(note.title, content)
            }
          />
        )}
        {value !== 0 && value !== 1 && (
          <Typography variant="body1" style={{ padding: "20px" }}>
            {"TBD"}
          </Typography>
        )}
      </>
    );
  };

  return isFetching || note == null ? (
    <></>
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
        <Paper className={classes.content}>
          <Box p={2}>
            <Typography variant="h5" component="h1">
              {note.title}
            </Typography>
          </Box>
          <Divider />
          <Box style={modeStyle}>
            <Tabs
              value={tabValue}
              onChange={(event: React.ChangeEvent<{}>, newValue: number) =>
                setTabValue(newValue)
              }
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
            {tabComponentSwitcher(tabValue, note)}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

const mapStateToProps = ({ notesState }: State) => {
  return {
    note: notesState.note,
    isFetching: notesState.isFetching,
    events: notesState.events
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
    },
    updateButtonHandler(title: string, content: string) {
      dispatch(
        notesOperations.updateNote(parseInt(ownProps.id), title, content)
      );
    },
    deleteEvent(eventId: string) {
      dispatch(notesOperations.deleteNoteEvent(eventId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);
