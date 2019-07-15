package jp.utsushiiro.sharenotes.api.utils;

import jp.utsushiiro.sharenotes.api.auth.LoginUserDetails;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class TestDataFactory {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public TestDataFactory(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public UsernamePasswordAuthenticationToken createUsernamePasswordAuthenticationToken() {
        User user = new User();
        user.setId(1L);
        user.setPassword(passwordEncoder.encode("password"));
        user.setName("test-user");
        user.setEmail("test@example.com");

        UserGroup selfGroup = new UserGroup();
        selfGroup.setId(10L);
        selfGroup.setName(UserGroup.getSelfUserGroupName(user));
        selfGroup.addUser(user);

        return new UsernamePasswordAuthenticationToken(
                new LoginUserDetails(user),
                "NONE",
                AuthorityUtils.createAuthorityList("ROLE_NONE")
        );
    }
}
