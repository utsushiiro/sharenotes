import * as React from 'react';
import { connect } from "react-redux";
import { Note, State } from '../../state/notes/types';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from "../../state/notes/actions";
import {RouteComponentProps} from 'react-router';
import { Button } from 'reactstrap';
import { push, CallHistoryMethodAction } from 'connected-react-router';

type Props = {
  note: Note;
  onClick: () => void;
};

const mapStateToProps = ({ notesState }: State, ownProps: RouteComponentProps<{id: string}>) => {
  return { 
    note: notesState.notes[ownProps.match.params.id]
  };
};

const mapDispatchToProps = (
    dispatch:  ThunkDispatch<State, void, Action | CallHistoryMethodAction>, 
    ownProps: RouteComponentProps<{id: string}>
  )=> {
    return {
      onClick() {
        dispatch(push(`/notes/${ownProps.match.params.id}/edit`));
      }
    };
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);

