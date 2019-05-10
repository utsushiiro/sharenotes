package jp.utsushiiro.mdnb.api.controller;

import jp.utsushiiro.mdnb.api.domain.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/user")
public class UserRestController {
    @GetMapping(path = "/")
    public User find(@AuthenticationPrincipal(expression = "user") User user) {
        return user;
    }
}
