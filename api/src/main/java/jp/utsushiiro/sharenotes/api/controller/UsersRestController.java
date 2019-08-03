package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.dto.resource.UserResource;
import jp.utsushiiro.sharenotes.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1")
public class UsersRestController {

    private final UserService userService;

    @Autowired
    public UsersRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{id}")
    public UserResource find(@PathVariable Long id) {
        return new UserResource(userService.findById(id));
    }

    @PostMapping("/users")
    public UserResource create(
            HttpServletRequest request,
            @RequestBody @Validated  SignUpForm signUpForm
    ) throws ServletException {
        User createdUser = this.userService.create(
                signUpForm.getUsername(),
                signUpForm.getEmail(),
                signUpForm.getPassword()
        );

        // TODO catch ServletException and return a response that says sign up succeeded but log in failed
        request.login(signUpForm.getUsername(), signUpForm.getPassword());
        return new UserResource(createdUser);
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
