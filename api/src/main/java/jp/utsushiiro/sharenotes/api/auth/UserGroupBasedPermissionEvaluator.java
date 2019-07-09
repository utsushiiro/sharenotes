package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.User;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class UserGroupBasedPermissionEvaluator implements PermissionEvaluator {
    @Override
    public boolean hasPermission(
            Authentication authentication,
            Object targetDomainObject,
            Object permission
    ) {
        LoginUserDetails loginUserDetails = (LoginUserDetails) authentication.getPrincipal();
        User user = loginUserDetails.getUser();

        return true;
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
