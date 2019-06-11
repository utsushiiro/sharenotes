import * as React from "react";
import { connect } from "react-redux";
import { Note } from "../../state/notes/types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "../../state/notes/actions";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { notesOperations } from "../../state/notes";
import { push, CallHistoryMethodAction } from "connected-react-router";
import { State } from "../../state/types";

type Props = {
  note: Note | null;
  onSubmit: (title: string, content: string) => void;
  onClick: () => void;
  onMount: () => void;
  isNew: boolean;
  isFetching: boolean;
};

const Editor: React.FC<Props> = ({
  note,
  onSubmit,
  onClick,
  onMount,
  isNew
}) => {
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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, content);
  };
  const submitButtonText = isNew ? "Create" : "Update";

  return (
    <div>
      <Form onSubmit={onSubmitHandler}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="textarea"
            name="text"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Content</Label>
          <Input
            type="textarea"
            name="text"
            value={content}
            onChange={e => setContent(e.currentTarget.value)}
          />
        </FormGroup>
        <Button color="primary">{submitButtonText}</Button>
        {!isNew && <Button onClick={() => onClick()}>Cancel</Button>}
      </Form>
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
    onSubmit(title: string, content: string) {
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
    onClick() {
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
