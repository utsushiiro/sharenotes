import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { Note, State } from "../../state/notes/types";
import { Action } from "../../state/notes/actions";
import { Media } from "reactstrap";
import { notesOperations } from "../../state/notes";
import { useEffect } from "react";

type Props = {
  notes: Note[];
  onMount: () => void;
  isFetching: boolean;
};

const NoteList: React.FC<Props> = ({ notes, onMount, isFetching }) => {
  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="p-3">
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Note List</h2>
          <ul>
            {notes.map(note => (
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
            ))}
          </ul>
        </>
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
