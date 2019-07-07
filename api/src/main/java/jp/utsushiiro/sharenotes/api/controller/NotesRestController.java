package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.auth.LoginUserDetails;
import jp.utsushiiro.sharenotes.api.form.NoteForm;
import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.error.exceptions.ForbiddenOperationException;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
public class NotesRestController {

    private final NoteService noteService;

    @Autowired
    public NotesRestController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping(path = "")
    public Notes findAll() {
        return noteService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Note find(@PathVariable Long id) {
        return noteService.findById(id).orElseThrow(() -> new ResourceNotFoundException(Note.class, id));
    }

    @PostMapping(path = "")
    public Note create(@RequestBody NoteForm noteForm) {
        return noteService.create(noteForm.toNote(), getLoggedInUser());
    }

    @PatchMapping(path = "/{id}")
    public void update(@PathVariable Long id, @RequestBody NoteForm noteForm) {
        if (!noteForm.getUserId().equals(getLoggedInUser().getId())) {
            throw new ForbiddenOperationException();
        }

        Note note = noteForm.toNote();
        note.setId(id);
        noteService.update(note);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable Long id) {
        Note note = noteService.findById(id).orElseThrow(() -> new ResourceNotFoundException(Note.class, id));
        if (!note.getUser().getId().equals(getLoggedInUser().getId())) {
            throw new ForbiddenOperationException();
        }

        noteService.delete(id);
    }

    private User getLoggedInUser() {
        return ((LoginUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }
}
