package jp.utsushiiro.mdnb.api.auth;

import jp.utsushiiro.mdnb.api.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class LoginUserDetails extends User {

    private final Account account;

    @Autowired
    LoginUserDetails(Account account) {
        super(
                account.getUsername(),
                account.getPassword(),
                AuthorityUtils.createAuthorityList("ROLE_" + account.getAccountRole().name())
        );
        this.account = account;
    }
}
