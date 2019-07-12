package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.User;
import org.springframework.stereotype.Component;

@Component
public class NotePermissionEvaluator {
    boolean hasPermission(User user, Note note, Object permission) {
        if (!(permission instanceof Note.AuthorityType)) {
            throw new IllegalArgumentException("permission should be an instance of Note.AuthorityType");
        }

        switch ((Note.AuthorityType) permission) {
            case READ: {
                return note.getGroupWithReadAuthority().hasUser(user);
            }

            case EDIT: {
                return note.getGroupWithEditAuthority().hasUser(user);
            }

            case ADMIN: {
                return note.getGroupWithAdminAuthority().hasUser(user);
            }
            default: {
                throw new IllegalArgumentException();
            }
        }
    }
}
