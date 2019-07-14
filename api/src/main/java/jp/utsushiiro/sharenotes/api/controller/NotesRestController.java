package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.dto.form.NoteForm;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.response.NoteResponse;
import jp.utsushiiro.sharenotes.api.dto.response.NotesResponse;
import jp.utsushiiro.sharenotes.api.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public NotesResponse findAll() {
        return new NotesResponse(noteService.findAll());
    }

    @GetMapping(path = "/{id}")
    public NoteResponse find(@PathVariable Long id) {
        return new NoteResponse(noteService.findById(id));
    }

    @PostMapping(path = "")
    public NoteResponse create(@RequestBody NoteForm noteForm, @AuthenticationPrincipal(expression = "user") User user) {
        return new NoteResponse(noteService.create(noteForm, user));
    }

    @PatchMapping(path = "/{id}")
    public void update(@PathVariable Long id, @RequestBody NoteForm noteForm) {
        noteService.update(id, noteForm);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable Long id) {
        noteService.delete(id);
    }
}
