package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.repository.NoteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {

    @InjectMocks
    private NoteService noteService;

    @Mock
    private NoteRepository noteRepository;

    @Test
    void findById() {
        Long id = 1L;
        Optional<Note> expected = Optional.of(new Note());
        Mockito.doReturn(expected).when(noteRepository).findById(id);

        Optional<Note> result = noteService.findById(id);

        assertThat(result).isEqualTo(expected);
        Mockito.verify(noteRepository, Mockito.times(1)).findById(id);
    }

    @Test
    void findAll() {
        List<Note> expected = new ArrayList<>();
        Mockito.doReturn(expected).when(noteRepository).findAll();

        Notes result = noteService.findAll();

        assertThat(result.getNotes()).isEqualTo(expected);
        Mockito.verify(noteRepository, Mockito.times(1)).findAll();
    }

    @Test
    void create() {
        Note note = new Note();
        User user = new User();

        Note result = noteService.create(note, user);

        assertThat(result).isEqualTo(note);
        assertThat(note.getUser()).isEqualTo(user);
        Mockito.verify(noteRepository, Mockito.times(1)).save(note);
    }

    @Test
    void update() {
        Long id = 1L;
        Note note = new Note();
        note.setId(id);
        note.setTitle("testTitle");
        note.setContent("testContent");
        Note mockNote = Mockito.mock(Note.class);
        Mockito.doReturn(Optional.of(mockNote)).when(noteRepository).findById(note.getId());

        noteService.update(note);

        Mockito.verify(noteRepository, Mockito.times(1)).findById(note.getId());
        Mockito.verify(mockNote, Mockito.times(1)).setTitle(note.getTitle());
        Mockito.verify(mockNote, Mockito.times(1)).setContent(note.getContent());
        Mockito.verify(noteRepository, Mockito.times(1)).save(mockNote);
    }

    @Test
    void delete() {
        Long id = 1L;

        noteService.delete(id);

        Mockito.verify(noteRepository, Mockito.times(1)).deleteById(id);
    }
}
