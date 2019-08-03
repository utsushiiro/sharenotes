package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.resource.UserResource;
import jp.utsushiiro.sharenotes.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public UserResource find(@AuthenticationPrincipal(expression = "user") User user) {
        return new UserResource(user);
    }

    @DeleteMapping("/user")
    public void delete(@AuthenticationPrincipal(expression = "user") User user) {
        userService.delete(user.getId());
    }
}
