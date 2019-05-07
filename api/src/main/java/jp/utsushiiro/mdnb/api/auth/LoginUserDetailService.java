package jp.utsushiiro.mdnb.api.auth;

import jp.utsushiiro.mdnb.api.domain.Account;
import jp.utsushiiro.mdnb.api.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserDetailService implements UserDetailsService  {

    private final AccountService accountService;

    @Autowired
    public LoginUserDetailService(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountService.findOneByUsername(username);
        return new LoginUserDetails(account, null);
    }
}
