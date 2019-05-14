package jp.utsushiiro.mdnb.api.controller;

import jp.utsushiiro.mdnb.api.domain.User;
import jp.utsushiiro.mdnb.api.domain.UserRole;
import jp.utsushiiro.mdnb.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * TODO create a new domain for response
     */
    @PostMapping(path = "/sign_up")
    public User signUp(@RequestBody User user) {
        user.setUserRole(UserRole.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return this.userService.create(user);
    }
}
