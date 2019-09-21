import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { notesOperations } from "@state/notes";
import { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { useSelector } from "@state/store";
import { eventTypes } from "@state/events/constants";
import { EventToasterDefs, useEventToaster } from "@state/events/hooks";

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

const eventToasterDefs = [
  {
    eventType: eventTypes.CREATED_NOTE,
    toasterOptions: {
      message: "Successfully deleted",
      variant: "success",
      autoHideDuration: 1500
    }
  }
] as EventToasterDefs;

const NoteListPage: React.FC = () => {
  const classes = useStyles();

  const notesById = useSelector(state => state.notesState.entities.byId);
  const notes = Object.keys(notesById).map(key => notesById[key]);
  const isLoading = useSelector(state => state.notesState.meta.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notesOperations.fetchNotes());
  }, []);

  // event toaster
  useEventToaster(eventToasterDefs);

  return (
    <div>
      {!isLoading && (
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
