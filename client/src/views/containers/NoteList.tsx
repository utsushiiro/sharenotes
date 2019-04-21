import NoteList from "../components/NoteList";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/notes/types";
import { notesOperations } from "../../state/notes";

const mapStateToProps = ({ notes }: State) => {
  return { notes };
};

const mapDispatchToProps = (dispatch:  Dispatch)=> {
  return {
    addNote(text: string) {
      dispatch(notesOperations.addNote(text));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
