package jp.utsushiiro.sharenotes.api.auth;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SpringSecurityAuditorAware implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof LoginUserDetails) {
            LoginUserDetails loginUserDetails = (LoginUserDetails) principal;
            return Optional.of(loginUserDetails.getUsername());
        }else if (principal instanceof String && ((String) principal).equals("anonymousUser")){
            return Optional.of("anonymousUser");
        }else{
            return Optional.empty();
        }
    }
}
