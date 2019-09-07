import * as React from "react";
import { useDispatch } from "react-redux";
import { notesOperations } from "@state/notes";
import { useEffect, useCallback, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import Note from "@components/Note";
import Editor from "@components/Editor";
import { useSnackbar } from "notistack";
import { useSelector } from "@state/store";
import { eventsOperations, eventsConstants } from "@state/events";

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
  isEditorMode: boolean;
  noteId: string;
};

const NotePage: React.FC<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.notesState.isLoading);
  const note = useSelector(state => state.notesState.notes.find(note => note.id === props.noteId));

  // fetch note when props.noteId changed
  useEffect(() => {
    dispatch(notesOperations.fetchNote(props.noteId));
  }, [props.noteId]);

  // for note update
  const updateNoteHandler = useCallback(
    (content: string) => {
      if (note !== undefined) {
        dispatch(
          notesOperations.updateNote(note.id, note.title, content, note.version)
        );
      }
    },
    [note]
  );

  // for note delete
  const deleteNoteHandler = useCallback(() => {
    if (note !== undefined) {
      dispatch(notesOperations.deleteNoteAndRedirect(note.id));
    }
  }, [note]);

  const [tabValue, setTabValue] = useState(props.isEditorMode ? 1 : 0);
  const tabModeStyle = tabValue === 1 ? editorModeStyle : {};

  const events = useSelector(state => state.eventsState.events);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    events.forEach(event => {
      if (event.type === eventsConstants.eventTypes.CREATED_NOTE) {
        enqueueSnackbar("Successfully created", {
          variant: "success",
          autoHideDuration: 1500
        });
        dispatch(eventsOperations.deleteEvent(event.id));
      } else if (event.type === eventsConstants.eventTypes.UPDATED_NOTE) {
        enqueueSnackbar("Successfully updated", {
          variant: "success",
          autoHideDuration: 1500
        });
        dispatch(eventsOperations.deleteEvent(event.id));
      } else if (
        event.type === eventsConstants.eventTypes.FAILED_TO_UPDATE_NOTE
      ) {
        enqueueSnackbar("Failed to update", {
          variant: "error",
          autoHideDuration: 1500
        });
        dispatch(eventsOperations.deleteEvent(event.id));
      }
    });
  });

  return isLoading || note === undefined ? (
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
      <Box mt={2} mb={4}>
        <Paper className={classes.content}>
          <Box p={2}>
            <Typography variant="h5" component="h1">
              {note.title}
            </Typography>
          </Box>
          <Divider />
          <Box style={tabModeStyle}>
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
              <Tab label="Others" />
            </Tabs>
            <Divider />
            <>
              {tabValue === 0 && (
                <Note note={note} onDelete={deleteNoteHandler} />
              )}
              {tabValue === 1 && (
                <Editor note={note} onUpdate={updateNoteHandler} />
              )}
              {tabValue !== 0 && tabValue !== 1 && (
                <Typography variant="body1" style={{ padding: "20px" }}>
                  {"TBD"}
                </Typography>
              )}
            </>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default NotePage;
