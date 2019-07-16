package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class UserPermissionEvaluator {
    private final UserRepository userRepository;

    @Autowired
    public UserPermissionEvaluator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    boolean hasPermission(User user, User target, Object permission) {
        if (!(permission instanceof User.AuthorityType)) {
            throw new IllegalArgumentException("permission should be an instance of User.AuthorityType");
        }

        return _hasPermission(user, target, (User.AuthorityType) permission);
    }

    boolean hasPermission(User user, Serializable targetId, Object permission) {
        if (!(targetId instanceof Long)) {
            throw new IllegalArgumentException("targetId should be an instance of Long");
        }

        if (!(permission instanceof User.AuthorityType)) {
            throw new IllegalArgumentException("permission should be an instance of User.AuthorityType");
        }

        Long targetUserId = (Long) targetId;
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResourceNotFoundException(User.class, targetUserId));

        return _hasPermission(user, targetUser, (User.AuthorityType) permission);
    }

    private boolean _hasPermission(User user, User target, User.AuthorityType authorityType) {
        switch (authorityType) {
            case READ: {
                return true;
            }

            case READ_WRITE:
            case ADMIN: {
                return target.equals(user);
            }
            default: {
                throw new IllegalArgumentException();
            }
        }
    }
}
