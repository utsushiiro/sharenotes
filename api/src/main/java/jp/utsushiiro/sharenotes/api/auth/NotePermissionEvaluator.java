package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.exception.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class NotePermissionEvaluator {

    private final NoteRepository noteRepository;

    @Autowired
    public NotePermissionEvaluator(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    boolean hasPermission(User user, Note note, Object permission) {
        if (!(permission instanceof Note.AuthorityType)) {
            throw new IllegalArgumentException("permission should be an instance of Note.AuthorityType");
        }

        return _hasPermission(user, note, (Note.AuthorityType) permission);
    }

    boolean hasPermission(User user, Serializable targetId, Object permission) {
        if (!(targetId instanceof Long)) {
            throw new IllegalArgumentException("targetId should be an instance of Long");
        }

        if (!(permission instanceof Note.AuthorityType)) {
            throw new IllegalArgumentException("permission should be an instance of Note.AuthorityType");
        }

        Long targetNoteId = (Long) targetId;
        Note targetNote = noteRepository.findById(targetNoteId)
                .orElseThrow(() -> new ResourceNotFoundException(Note.class, targetNoteId));

        return _hasPermission(user, targetNote, (Note.AuthorityType) permission);
    }

    private boolean _hasPermission(User user, Note target, Note.AuthorityType authorityType) {
        switch (authorityType) {
            case WRITE: {
                return target.getLatestRevision().getGroupWithWriteAuthority().hasUser(user);
            }

            case ADMIN: {
                return target.getLatestRevision().getGroupWithAdminAuthority().hasUser(user);
            }
            default: {
                throw new IllegalArgumentException();
            }
        }
    }
}
