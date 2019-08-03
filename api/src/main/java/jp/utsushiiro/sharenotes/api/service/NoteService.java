package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.*;
import jp.utsushiiro.sharenotes.api.dto.form.NoteForm;
import jp.utsushiiro.sharenotes.api.exception.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.FolderRepository;
import jp.utsushiiro.sharenotes.api.repository.NoteRepository;
import jp.utsushiiro.sharenotes.api.repository.NoteRevisionRepository;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    private final UserGroupRepository userGroupRepository;

    private final NoteRevisionRepository noteRevisionRepository;

    private final FolderRepository folderRepository;

    @Autowired
    public NoteService(
            NoteRepository noteRepository,
            UserGroupRepository userGroupRepository,
            NoteRevisionRepository noteRevisionRepository,
            FolderRepository folderRepository
    ) {
        this.noteRepository = noteRepository;
        this.userGroupRepository = userGroupRepository;
        this.noteRevisionRepository = noteRevisionRepository;
        this.folderRepository = folderRepository;
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#id, 'jp.utsushiiro.sharenotes.api.domain.Note', T(jp.utsushiiro.sharenotes.api.domain.Note$AuthorityType).READ)")
    @Transactional(readOnly = true)
    public Note findById(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(Note.class, id));
    }

    // TODO check each note authority
    @PreAuthorize("isAuthenticated()")
    @Transactional(readOnly = true)
    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    public Note create(NoteForm form, User user) {
        Folder root = folderRepository.findByName(Folder.ROOT_FOLDER_NAME);
        Note note = new Note();
        root.addNote(note);
        noteRepository.save(note);

        NoteRevision revision = new NoteRevision();
        revision.setNote(note);
        revision.setTitle(form.getTitle());
        revision.setContent(form.getContent());
        UserGroup ownerGroup = user.getSelfGroup();
        UserGroup everyoneGroup = userGroupRepository.findByName(UserGroup.EVERYONE_USER_GROUP_NAME);
        revision.setGroupWithReadAuthority(everyoneGroup);
        revision.setGroupWithReadWriteAuthority(everyoneGroup);
        revision.setGroupWithAdminAuthority(ownerGroup);
        noteRevisionRepository.save(revision);

        note.initRevision(revision);
        noteRepository.save(note);

        return note;
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#noteId, 'jp.utsushiiro.sharenotes.api.domain.Note', T(jp.utsushiiro.sharenotes.api.domain.Note$AuthorityType).READ_WRITE)")
    @Transactional
    public void update(Long noteId, NoteForm form) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException(Note.class, noteId));
        NoteRevision prev = note.getLatestRevision();

        NoteRevision next = new NoteRevision();
        next.setNote(note);
        next.setTitle(form.getTitle());
        next.setContent(form.getContent());
        next.setGroupWithReadAuthority(prev.getGroupWithReadAuthority());
        next.setGroupWithReadWriteAuthority(prev.getGroupWithReadWriteAuthority());
        next.setGroupWithAdminAuthority(prev.getGroupWithAdminAuthority());
        noteRevisionRepository.save(next);

        note.updateLatestRevision(next);
        noteRepository.save(note);
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#id, 'jp.utsushiiro.sharenotes.api.domain.Note', T(jp.utsushiiro.sharenotes.api.domain.Note$AuthorityType).ADMIN)")
    @Transactional
    public void delete(Long id) {
        noteRepository.deleteById(id);
    }
}

