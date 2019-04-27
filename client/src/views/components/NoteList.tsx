import * as React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Note, State } from '../../state/notes/types';
import { Action } from "../../state/notes/actions";
import { Media } from 'reactstrap';

type Props = {
  notes: Note[];
}

const mapStateToProps = ({ notesState }: State) => {
  return { notes: notesState.notes };
};

const mapDispatchToProps = (dispatch:  ThunkDispatch<State, void, Action>)=> {
  return {};
};

const NoteList: React.FC<Props> = ({
  notes = [],
}) => {
  const [text, setText] = React.useState('');
  return (
    <>
      <ul>
        {
          notes.map(note => 
            <li key={note.id}>
              <Media>
                <Media body>
                  <Media heading>
                    <Link to={`/notes/${note.id}`}>{note.title}</Link>
                  </Media>
                    {note.content}
                </Media>
              </Media>
            </li>
          )
        }
      </ul>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
