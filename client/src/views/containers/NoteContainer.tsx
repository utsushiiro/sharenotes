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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    content: {
      padding: "20px"
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const editorModeStyle = {
  height: "100vh",
  position: "absolute",
  zIndex: 1,
  width: "100%",
  top: 0,
  left: 0,
  border: "none"
};

type Props = {
  note: Note;
  onMount: () => void;
  isFetching: boolean;
};

const NoteContainer: React.FC<Props> = ({ note, onMount, isFetching }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  useEffect(() => {
    onMount();
  }, []);

  const s = value === 1 ? editorModeStyle : {};

  return isFetching || note == null ? (
    <div>Loading...</div>
  ) : (
    <div>
      {/* <h2>{note.title}</h2> */}

      <Paper className={classes.root} style={s}>
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
        {value === 0 && <p>Item One</p>}
        {value === 1 && <p>Item Two</p>}
        {value === 2 && <p>Item Three</p>}
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
)(NoteContainer);
