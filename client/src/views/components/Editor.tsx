import * as React from 'react';
import { connect } from "react-redux";
import { Note, State } from '../../state/notes/types';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from "../../state/notes/actions";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useState } from 'react';
import { notesOperations } from '../../state/notes';
import { push, CallHistoryMethodAction } from 'connected-react-router'

type Props = {
  note: Note | undefined;
  onSubmit: (title: string, content: string) => void;
  onClick: () => void;
}

const Editor: React.FC<Props> = ({
  note,
  onSubmit,
  onClick
}) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, content);
  };
  const isNewNote = note == null;
  const submitButtonText = isNewNote ? "Create" : "Update";

  return (
    <Form onSubmit={onSubmitHandler}>
      <FormGroup>
        <Input type="textarea" name="text" value={title} 
               onChange={(e) => setTitle(e.currentTarget.value)} />
      </FormGroup>
      <FormGroup>
        <Input type="textarea" name="text" value={content} 
               onChange={(e) => setContent(e.currentTarget.value)} />
      </FormGroup>
      <Button color="primary">{submitButtonText}</Button>
      {
        !isNewNote && <Button onClick={() => onClick()}>Cancel</Button>
      }
    </Form>
  );
};

const mapStateToProps = ({ notesState }: State, ownProps: {id: string}) => {
  if (ownProps.id != null) {
    return { 
      note: notesState.notes[ownProps.id] 
    };
  }else {
    return {
      note: undefined
    };
  }
};

const mapDispatchToProps = (
    dispatch:  ThunkDispatch<State, void, Action | CallHistoryMethodAction>,
    ownProps: {id: string}
  )=> {
  return {
    onSubmit(title: string, content: string) {
      const { payload } = dispatch(notesOperations.addNote(title, content));
      dispatch(push(`/notes/${payload.id}`));
    },
    onClick() {
      if(ownProps.id != null){
        dispatch(push(`/notes/${ownProps.id}`));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

