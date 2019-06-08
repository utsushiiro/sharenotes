package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note findOne(int id) {
        return noteRepository.findOne(id);
    }

    public Notes findAll() {
        return noteRepository.findAll();
    }

    /**
     * Create a note belongs to specified user
     */
    public Note create(Note note, User user) {
        note.setUserId(user.getId());
        noteRepository.insert(note);
        return noteRepository.findOne(note.getId());
    }

    public void update(Note note) {
        noteRepository.update(note);
    }

    public void delete(int id) {
        noteRepository.delete(id);
    }
}

