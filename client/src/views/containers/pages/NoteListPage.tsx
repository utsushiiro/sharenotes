import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { notesOperations } from "../../../state/notes";
import { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { noteEventTypes } from "../../../state/notes/constants";
import { useSnackbar } from "notistack";
import { useSelector } from "../../../state/store";

const useStyles = makeStyles(
  createStyles({
    card: {
      minWidth: 275
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })
);

const NoteListPage: React.FC = () => {
  const classes = useStyles();

  const notes = useSelector(state => state.notesState.notes);
  const isFetching = useSelector(state => state.notesState.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notesOperations.fetchNotes())
  }, []);

  const events = useSelector(state => state.notesState.events);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    events.forEach(event => {
      if (event.type === noteEventTypes.DELETED_NOTE) {
        enqueueSnackbar("Successfuly deleted", {
          variant: "success",
          autoHideDuration: 1500
        });
        dispatch(notesOperations.deleteNoteEvent(event.id));
      }
    });
  });

  return (
    <div>
      {!isFetching && (
        <Box mt={4}>
          <Typography variant="h5" component="h1">
            Note List
          </Typography>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {notes.map(note => (
              <li key={note.id} style={{ marginBottom: "20px" }}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {note.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {note.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={Link}
                      to={`/notes/${note.id}`}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  );
};

export default NoteListPage;
