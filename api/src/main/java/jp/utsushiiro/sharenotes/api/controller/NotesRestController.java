package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.error.exceptions.ForbiddenOperationException;
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
    public Notes findAll() {
        return noteService.findAll();
    }

    @GetMapping(path = "/{id}")
    public Note findOne(@PathVariable int id) {
        return noteService.findOne(id);
    }

    @PostMapping(path = "")
    public Note create(@RequestBody Note note, @ModelAttribute("loggedInUser") User loggedInUser) {
        return noteService.create(note, loggedInUser);
    }

    @PatchMapping(path = "/{id}")
    public void update(@PathVariable int id, @RequestBody Note note, @ModelAttribute("loggedInUser") User loggedInUser) {
        if (note.getUserId() != loggedInUser.getId()) {
            throw new ForbiddenOperationException();
        }

        note.setId(id);
        noteService.update(note);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable int id, @ModelAttribute("loggedInUser") User loggedInUser) {
        Note note = findOne(id);
        if (note.getUserId() != loggedInUser.getId()) {
            throw new ForbiddenOperationException();
        }

        noteService.delete(id);
    }

    @ModelAttribute("loggedInUser")
    public User getLoggedInUser(@AuthenticationPrincipal(expression = "user") User user) {
        return user;
    }
}
