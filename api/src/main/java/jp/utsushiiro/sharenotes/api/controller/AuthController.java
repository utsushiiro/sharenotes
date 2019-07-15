package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.dto.response.UserResponse;
import jp.utsushiiro.sharenotes.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

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

    @PostMapping(path = "/sign_up")
    public UserResponse signUp(HttpServletRequest request,  @RequestBody SignUpForm signUpForm) throws ServletException {
        User user = signUpForm.toUser();
        user.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
        User createdUser = this.userService.create(user);

        // TODO catch ServletException and return a response that says sign up succeeded but log in failed
        request.login(signUpForm.getUsername(), signUpForm.getPassword());
        return new UserResponse(createdUser);
    }
}
