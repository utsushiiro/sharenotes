package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.NoteRepository;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    private final UserGroupRepository userGroupRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserGroupRepository userGroupRepository) {
        this.noteRepository = noteRepository;
        this.userGroupRepository = userGroupRepository;
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#id, 'jp.utsushiiro.sharenotes.api.domain.Note', T(jp.utsushiiro.sharenotes.api.domain.Note$AuthorityType).READ)")
    @Transactional(readOnly = true)
    public Note findById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(Note.class, id));
    }

    @Transactional(readOnly = true)
    public Notes findAll() {
        Notes notes = new Notes();
        notes.setNotes(noteRepository.findAll());
        return notes;
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    public Note create(Note note, User user) {
        UserGroup ownerGroup = user.getSelfGroup();
        UserGroup everyoneGroup = userGroupRepository.findByName(UserGroup.EVERYONE_USER_GROUP_NAME);

        note.setGroupWithReadAuthority(everyoneGroup);
        note.setGroupWithReadWriteAuthority(everyoneGroup);
        note.setGroupWithAdminAuthority(ownerGroup);

        noteRepository.save(note);
        return note;
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#note.getId(), 'jp.utsushiiro.sharenotes.api.domain.Note', T(jp.utsushiiro.sharenotes.api.domain.Note$AuthorityType).READ_WRITE)")
    @Transactional
    public void update(Note note) {
        Note target = noteRepository.findById(note.getId())
                .orElseThrow(() -> new ResourceNotFoundException(Note.class, note.getId()));
        target.setTitle(note.getTitle());
        target.setContent(note.getContent());
        noteRepository.save(target);
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#id, 'jp.utsushiiro.sharenotes.api.domain.Note', T(jp.utsushiiro.sharenotes.api.domain.Note$AuthorityType).ADMIN)")
    @Transactional
    public void delete(Long id) {
        noteRepository.deleteById(id);
    }
}

