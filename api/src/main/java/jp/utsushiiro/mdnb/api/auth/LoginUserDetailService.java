package jp.utsushiiro.mdnb.api.auth;

import jp.utsushiiro.mdnb.api.domain.User;
import jp.utsushiiro.mdnb.api.service.UserService;
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
        User user = userService.findOneByUsername(username);
        return new LoginUserDetails(user);
    }
}
