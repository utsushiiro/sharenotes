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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";

interface TabContainerProps {
  children?: React.ReactNode;
}

function TabContainer(props: TabContainerProps) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1
    },
    content: {
      padding: "20px"
    }
  })
);

type Props = {
  note: Note;
  onMount: () => void;
  deleteButtonHandler: () => void;
  isFetching: boolean;
};

const Note: React.FC<Props> = ({
  note,
  onMount,
  deleteButtonHandler,
  isFetching
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  useEffect(() => {
    onMount();
  }, []);

  return isFetching || note == null ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>{note.title}</h2>

      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="View" />
          <Tab label="Edit" />
          <Tab label="Others" />
        </Tabs>
        <Divider />
        <Typography variant="body1" gutterBottom className={classes.content}>
          {note.content}
        </Typography>
        <Divider />
        <Box p={1}>
          <Button component={Link} to={`/notes/${note.id}/edit`}>
            Edit
          </Button>
          <Button onClick={deleteButtonHandler}>
            Delete
          </Button>
        </Box>
      </Paper>
    </div>
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
)(Note);
