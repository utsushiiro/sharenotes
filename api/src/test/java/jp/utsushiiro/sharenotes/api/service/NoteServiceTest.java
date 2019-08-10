package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.NoteRevision;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.dto.form.CreateNoteForm;
import jp.utsushiiro.sharenotes.api.dto.form.UpdateNoteForm;
import jp.utsushiiro.sharenotes.api.repository.NoteRepository;
import jp.utsushiiro.sharenotes.api.repository.NoteRevisionRepository;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
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

    @Mock
    private NoteRevisionRepository noteRevisionRepository;

    @Mock
    private UserGroupRepository userGroupRepository;

    @Test
    void findById() {
        // setup
        Long id = 1L;
        Note expected = new Note();
        Mockito.doReturn(Optional.of(expected)).when(noteRepository).findById(id);

        // do
        Note result = noteService.findById(id);

        // check
        assertThat(result).isEqualTo(expected);
        Mockito.verify(noteRepository, Mockito.times(1)).findById(id);
    }

    @Test
    void findAll() {
        // setup
        List<Note> expected = new ArrayList<>();
        Mockito.doReturn(expected).when(noteRepository).findAll();

        // do
        List<Note> result = noteService.findAll();

        // check
        assertThat(result).isEqualTo(expected);
        Mockito.verify(noteRepository, Mockito.times(1)).findAll();
    }

    @Test
    void create() {
        // setup
        CreateNoteForm createNoteForm = new CreateNoteForm();
        createNoteForm.setTitle("test-title");
        createNoteForm.setContent("test-content");

        User user = new User();
        user.setSelfGroup(new UserGroup());

        UserGroup everyoneGroup = new UserGroup();
        Mockito.doReturn(everyoneGroup).when(userGroupRepository).findByName(UserGroup.EVERYONE_USER_GROUP_NAME);

        // do
        Note result = noteService.create(createNoteForm, user);

        // check
        NoteRevision revision = result.getLatestRevision();
        assertThat(revision.getTitle()).isEqualTo(createNoteForm.getTitle());
        assertThat(revision.getContent()).isEqualTo(createNoteForm.getContent());
        assertThat(revision.getGroupWithReadAuthority()).isEqualTo(everyoneGroup);
        assertThat(revision.getGroupWithReadWriteAuthority()).isEqualTo(everyoneGroup);
        assertThat(revision.getGroupWithAdminAuthority()).isEqualTo(user.getSelfGroup());

        Mockito.verify(noteRepository, Mockito.times(2)).save(ArgumentMatchers.any(Note.class));
        Mockito.verify(noteRevisionRepository, Mockito.times(1)).save(ArgumentMatchers.any(NoteRevision.class));
        Mockito.verify(userGroupRepository, Mockito.times(1)).findByName(UserGroup.EVERYONE_USER_GROUP_NAME);
    }

    @Test
    void update() {
        // setup
        Long id = 1L;
        Note mockNote = Mockito.mock(Note.class);
        Mockito.doReturn(Optional.of(mockNote)).when(noteRepository).findById(id);

        NoteRevision mockNoteRevision = Mockito.mock(NoteRevision.class);
        Mockito.doReturn(mockNoteRevision).when(mockNote).getLatestRevision();
        UserGroup userGroupWithReadAuthority = new UserGroup();
        UserGroup userGroupWithReadWriteAuthority = new UserGroup();
        UserGroup userGroupWithAdminAuthority = new UserGroup();
        Mockito.doReturn(userGroupWithReadAuthority).when(mockNoteRevision).getGroupWithReadAuthority();
        Mockito.doReturn(userGroupWithReadWriteAuthority).when(mockNoteRevision).getGroupWithReadWriteAuthority();
        Mockito.doReturn(userGroupWithAdminAuthority).when(mockNoteRevision).getGroupWithAdminAuthority();

        UpdateNoteForm updateNoteForm = new UpdateNoteForm();
        updateNoteForm.setTitle("test-title");
        updateNoteForm.setContent("test-content");

        // do
        noteService.update(id, updateNoteForm);

        // check
        Mockito.verify(noteRepository, Mockito.times(1)).findById(id);
        Mockito.verify(noteRevisionRepository, Mockito.times(1)).save(Mockito.argThat(
                noteRevision -> noteRevision.getTitle().equals(updateNoteForm.getTitle()) &&
                            noteRevision.getContent().equals(updateNoteForm.getContent()) &&
                            noteRevision.getGroupWithReadAuthority().equals(userGroupWithReadAuthority) &&
                            noteRevision.getGroupWithReadWriteAuthority().equals(userGroupWithReadWriteAuthority) &&
                            noteRevision.getGroupWithAdminAuthority().equals(userGroupWithAdminAuthority) &&
                            noteRevision.getNote().equals(mockNote)
        ));
        Mockito.verify(mockNote, Mockito.times(1)).updateLatestRevision(ArgumentMatchers.any(NoteRevision.class));
        Mockito.verify(noteRepository, Mockito.times(1)).save(mockNote);
    }

    @Test
    void delete() {
        // setup
        Long id = 1L;

        // do
        noteService.delete(id);

        // check
        Mockito.verify(noteRepository, Mockito.times(1)).deleteById(id);
    }
}
