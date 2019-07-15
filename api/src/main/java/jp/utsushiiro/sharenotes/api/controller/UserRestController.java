package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.dto.response.UserResponse;
import jp.utsushiiro.sharenotes.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api/user")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "")
    public UserResponse find(@AuthenticationPrincipal(expression = "user") User user) {
        return new UserResponse(user);
    }

    @PostMapping(path = "")
    public UserResponse create(HttpServletRequest request, @RequestBody SignUpForm signUpForm) throws ServletException {
        User createdUser = this.userService.create(signUpForm);

        // TODO catch ServletException and return a response that says sign up succeeded but log in failed
        request.login(signUpForm.getUsername(), signUpForm.getPassword());
        return new UserResponse(createdUser);
    }

    @DeleteMapping(path = "")
    public void delete(@AuthenticationPrincipal(expression = "user") User user) {
        userService.delete(user.getId());
    }
}
