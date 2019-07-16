package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.resource.UserResource;
import jp.utsushiiro.sharenotes.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/user")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "")
    public UserResource find(@AuthenticationPrincipal(expression = "user") User user) {
        return new UserResource(user);
    }

    @DeleteMapping(path = "")
    public void delete(@AuthenticationPrincipal(expression = "user") User user) {
        userService.delete(user.getId());
    }
}
