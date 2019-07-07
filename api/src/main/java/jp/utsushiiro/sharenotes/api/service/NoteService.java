package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class NoteService {
    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Transactional(readOnly = true)
    public Optional<Note> findById(Long id) {
        return noteRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Notes findAll() {
        Notes notes = new Notes();
        notes.setNotes(noteRepository.findAll());
        return notes;
    }

    /**
     * Create a note belongs to specified user
     */
    @Transactional
    public Note create(Note note, User user) {
        note.setUser(user);
        noteRepository.save(note);
        return note;
    }

    @Transactional
    public void update(Note note) {
        Note target = noteRepository.findById(note.getId()).orElseThrow(() -> new ResourceNotFoundException(Note.class, note.getId()));
        target.setTitle(note.getTitle());
        target.setContent(note.getContent());
        noteRepository.save(target);
    }

    @Transactional
    public void delete(Long id) {
        noteRepository.deleteById(id);
    }
}

