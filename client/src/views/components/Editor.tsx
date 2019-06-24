import * as React from "react";
import { connect } from "react-redux";
import { Note } from "../../state/notes/types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "../../state/notes/actions";
import { useState, useEffect } from "react";
import { notesOperations } from "../../state/notes";
import { push, CallHistoryMethodAction } from "connected-react-router";
import { State } from "../../state/types";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";

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

type Props = {
  note: Note | null;
  createButtonHandler: (title: string, content: string) => void;
  cancelButtonHandler: () => void;
  onMount: () => void;
  isNew: boolean;
  isFetching: boolean;
};

const Editor: React.FC<Props> = ({
  note,
  createButtonHandler,
  cancelButtonHandler,
  onMount,
  isNew
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    onMount();
  }, []);

  useEffect(() => {
    if (note != null) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const submitButtonText = isNew ? "Create" : "Update";

  return (
    <div>
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
        <form>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
          />

          <textarea
            name=""
            style={{ width: "100%", height: "600px", resize: "none" }}
            value={content}
            onChange={e => setContent(e.currentTarget.value)}
          />
        </form>
        <Divider />
        <Box p={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={e => createButtonHandler(title, content)}
          >
            {submitButtonText}
          </Button>
          {!isNew && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={cancelButtonHandler}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>
    </div>
  );
};

const mapStateToProps = (
  { notesState }: State,
  ownProps: { id: string | null }
) => {
  if (ownProps.id != null) {
    return {
      note: notesState.note,
      isFetching: notesState.isFetching,
      isNew: false
    };
  } else {
    return {
      note: null,
      isFetching: notesState.isFetching,
      isNew: true
    };
  }
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, void, Action | CallHistoryMethodAction>,
  ownProps: { id: string | null }
) => {
  return {
    createButtonHandler(title: string, content: string) {
      // TODO ownProps.idの代わりにmergePropsでnoteの方を見るようにすべき
      if (ownProps.id != null) {
        dispatch(
          notesOperations.updateNoteAndRedirect(
            parseInt(ownProps.id),
            title,
            content
          )
        );
      } else {
        dispatch(notesOperations.createNoteAndRedirect(title, content));
      }
    },
    cancelButtonHandler() {
      if (ownProps.id != null) {
        dispatch(push(`/notes/${ownProps.id}`));
      }
    },
    onMount() {
      if (ownProps.id != null) {
        dispatch(notesOperations.fetchNote(parseInt(ownProps.id)));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
