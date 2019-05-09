package jp.utsushiiro.mdnb.api.controller;

import jp.utsushiiro.mdnb.api.domain.Note;
import jp.utsushiiro.mdnb.api.domain.Notes;
import jp.utsushiiro.mdnb.api.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
public class NoteRestController {

    private final NoteService noteService;

    @Autowired
    public NoteRestController(NoteService noteService) {
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
    public Note create(@RequestBody Note note) {
        return noteService.create(note);
    }

    @PatchMapping(path = "/{id}")
    public void update(@PathVariable int id, @RequestBody Note note) {
        note.setId(id);
        noteService.update(note);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable int id) {
        noteService.delete(id);
    }
}
