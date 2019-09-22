import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { eventTypes } from "@state/events/constants";
import { EventToasterDefs, useEventToaster } from "@state/events/hooks";
import { useNotes } from "@state/notes/hooks";

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
  const { isLoading, fetchNotes, selectNotes } = useNotes();

  const notes = selectNotes();
  useEffect(() => {
    fetchNotes();
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
            {notes.map(
              note =>
                note !== undefined && (
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
                )
            )}
          </ul>
        </Box>
      )}
    </div>
  );
};

export default NoteListPage;
