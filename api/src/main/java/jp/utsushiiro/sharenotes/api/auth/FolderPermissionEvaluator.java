package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.exception.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class FolderPermissionEvaluator {

    private final FolderRepository FolderRepository;

    @Autowired
    public FolderPermissionEvaluator(FolderRepository FolderRepository) {
        this.FolderRepository = FolderRepository;
    }

    boolean hasPermission(User user, Folder note, Object permission) {
        if (!(permission instanceof Folder.AuthorityType)) {
            throw new IllegalArgumentException("permission should be an instance of Folder.AuthorityType");
        }

        return _hasPermission(user, note, (Folder.AuthorityType) permission);
    }

    boolean hasPermission(User user, Serializable targetId, Object permission) {
        if (!(targetId instanceof Long)) {
            throw new IllegalArgumentException("targetId should be an instance of Long");
        }

        if (!(permission instanceof Folder.AuthorityType)) {
            throw new IllegalArgumentException("permission should be an instance of Folder.AuthorityType");
        }

        Long targetFolderId = (Long) targetId;
        Folder targetFolder = FolderRepository.findById(targetFolderId)
                .orElseThrow(() -> new ResourceNotFoundException(Folder.class, targetFolderId));

        return _hasPermission(user, targetFolder, (Folder.AuthorityType) permission);
    }

    private boolean _hasPermission(User user, Folder target, Folder.AuthorityType authorityType) {
        switch (authorityType) {
            case READ: {
                return target.getGroupWithReadAuthority().hasUser(user);
            }

            case READ_WRITE: {
                return target.getGroupWithReadWriteAuthority().hasUser(user);
            }

            case ADMIN: {
                return target.getGroupWithAdminAuthority().hasUser(user);
            }
            default: {
                throw new IllegalArgumentException();
            }
        }
    }
}
