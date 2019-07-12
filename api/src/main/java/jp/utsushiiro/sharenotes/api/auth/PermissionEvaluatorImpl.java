package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class PermissionEvaluatorImpl implements PermissionEvaluator {

    private final NotePermissionEvaluator notePermissionEvaluator;

    @Autowired
    public PermissionEvaluatorImpl(NotePermissionEvaluator notePermissionEvaluator) {
        this.notePermissionEvaluator = notePermissionEvaluator;
    }

    @Override
    public boolean hasPermission(
            Authentication authentication,
            Object targetDomainObject,
            Object permission
    ) {
        LoginUserDetails loginUserDetails = (LoginUserDetails) authentication.getPrincipal();
        User user = loginUserDetails.getUser();

        if (targetDomainObject instanceof Note) {
            return notePermissionEvaluator.hasPermission(user, (Note) targetDomainObject, permission);
        }

        return false;
    }

    @Override
    public boolean hasPermission(
            Authentication authentication,
            Serializable targetId,
            String targetType,
            Object permission
    ) {
        throw new UnsupportedOperationException();
    }
}
