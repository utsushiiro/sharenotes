import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { Note } from "../../state/notes/types";
import { Action } from "../../state/notes/actions";
import { notesOperations } from "../../state/notes";
import { useEffect } from "react";
import { State } from "../../state/types";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

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

type Props = {
  notes: Note[];
  onMount: () => void;
  isFetching: boolean;
};

const NoteList: React.FC<Props> = ({ notes, onMount, isFetching }) => {
  useEffect(() => {
    onMount();
  }, []);

  const classes = useStyles();
  return (
    <div>
      {isFetching ? (
        <></>
      ) : (
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

const mapStateToProps = ({ notesState }: State) => {
  return {
    notes: notesState.notes,
    isFetching: notesState.isFetching
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => {
  return {
    onMount: () => dispatch(notesOperations.fetchNotes())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
