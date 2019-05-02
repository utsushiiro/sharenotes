import * as React from 'react';
import { connect } from "react-redux";
import { Note, State } from '../../state/notes/types';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from "../../state/notes/actions";
import { Button } from 'reactstrap';
import { push, CallHistoryMethodAction } from 'connected-react-router';

type Props = {
  note: Note;
  onClick: () => void;
};

const Note: React.FC<Props> = ({
  note,
  onClick,
}) => {
  return (
    <>
      <div>
        {note.title}
      </div>
      <div>
        {note.content}
      </div>
      <Button color="primary" onClick={onClick} >Edit</Button>
    </>
  );
};

const mapStateToProps = ({ notesState }: State, ownProps: {id: string}) => {
  return { 
    note: notesState.notes[ownProps.id]
  };
};

const mapDispatchToProps = (
    dispatch:  ThunkDispatch<State, void, Action | CallHistoryMethodAction>, 
    ownProps: {id: string}
  )=> {
    return {
      onClick() {
        dispatch(push(`/notes/${ownProps.id}/edit`));
      }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
