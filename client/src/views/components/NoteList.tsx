import * as React from 'react';
import { Note } from '../../state/notes/types';

type Props = {
  notes?: Note[];
}

const NoteList: React.FC<Props> = ({
  notes = []
}) => {
  return (
    <ul>
      {
        notes.map(note => <li>note.text</li>)
      }
    </ul>
  );
};

export default NoteList;
