package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.error.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserDetailService implements UserDetailsService  {

    private final UserService userService;

    @Autowired
    public LoginUserDetailService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userService.findByName(username);
            return new LoginUserDetails(user);
        }catch (ResourceNotFoundException e) {
            throw new UsernameNotFoundException(String.format("User(username=%s) not found", username));
        }
    }
}
