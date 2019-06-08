package jp.utsushiiro.sharenotes.api.repository;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.mapper.NoteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class NoteRepository {
    private final NoteMapper noteMapper;

    @Autowired
    public NoteRepository(NoteMapper noteMapper) {
        this.noteMapper = noteMapper;
    }

    public Note findOne(int id) {
        Note note = noteMapper.findOne(id);
        if (note == null) {
            throw new ResourceNotFoundException(Note.class, id);
        }
        return note;
    }

    public Notes findAll() {
        Notes notes = new Notes();
        notes.setNotes(this.noteMapper.findAll());
        return notes;
    }

    public void insert(Note note) {
        this.noteMapper.insert(note);
    }

    public void update(Note note) {
        int affectedNum = this.noteMapper.update(note);
        if (affectedNum != 1) {
            throw new ResourceNotFoundException(Note.class, note.getId());
        }
    }

    public void delete(int id) {
        int affectedNum = this.noteMapper.delete(id);
        if (affectedNum != 1) {
            throw new ResourceNotFoundException(Note.class, id);
        }
    }
}
