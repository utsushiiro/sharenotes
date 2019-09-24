package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.Folder;
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

    private final UserPermissionEvaluator userPermissionEvaluator;

    private final FolderPermissionEvaluator folderPermissionEvaluator;

    @Autowired
    public PermissionEvaluatorImpl(
            NotePermissionEvaluator notePermissionEvaluator,
            UserPermissionEvaluator userPermissionEvaluator,
            FolderPermissionEvaluator folderPermissionEvaluator
    ) {
        this.notePermissionEvaluator = notePermissionEvaluator;
        this.userPermissionEvaluator = userPermissionEvaluator;
        this.folderPermissionEvaluator = folderPermissionEvaluator;
    }

    @Override
    public boolean hasPermission(
            Authentication authentication,
            Object targetDomainObject,
            Object permission
    ) {
        SpringSecurityUser springSecurityUser = (SpringSecurityUser) authentication.getPrincipal();
        User user = springSecurityUser.getUser();

        if (targetDomainObject instanceof Note) {
            return notePermissionEvaluator.hasPermission(user, (Note) targetDomainObject, permission);
        }

        if (targetDomainObject instanceof User) {
            return userPermissionEvaluator.hasPermission(user, (User) targetDomainObject, permission);
        }

        if (targetDomainObject instanceof Folder) {
            return folderPermissionEvaluator.hasPermission(user, (Folder) targetDomainObject, permission);
        }

        throw new RuntimeException(
                String.format("%s is a unsupported targetDomainObject type", targetDomainObject.getClass().getName())
        );
    }

    @Override
    public boolean hasPermission(
            Authentication authentication,
            Serializable targetId,
            String targetType,
            Object permission
    ) {
        SpringSecurityUser springSecurityUser = (SpringSecurityUser) authentication.getPrincipal();
        User user = springSecurityUser.getUser();

        if (targetType.equals(Note.class.getName())) {
            return notePermissionEvaluator.hasPermission(user, targetId, permission);
        }

        if (targetType.equals(User.class.getName())) {
            return userPermissionEvaluator.hasPermission(user, targetId, permission);
        }

        if (targetType.equals(Folder.class.getName())) {
            return folderPermissionEvaluator.hasPermission(user, targetId, permission);
        }

        throw new RuntimeException(String.format("%s is a unsupported target type", targetType));
    }
}
