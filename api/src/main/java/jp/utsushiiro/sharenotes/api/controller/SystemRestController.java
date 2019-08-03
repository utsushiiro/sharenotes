package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.dto.resource.UserResource;
import jp.utsushiiro.sharenotes.api.exception.exceptions.ForbiddenOperationException;
import jp.utsushiiro.sharenotes.api.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1")
public class SystemRestController {

    private final SystemService systemService;

    @Autowired
    public SystemRestController(SystemService systemService) {
        this.systemService = systemService;
    }

    @PostMapping(path = "/system:install")
    public UserResource install(
            @RequestBody @Validated SignUpForm signUpForm,
            HttpServletRequest request
    ) throws ServletException {
        if (systemService.isInstalled()) {
            throw new ForbiddenOperationException("The application has already been installed");
        }

        UserResource userResource = new UserResource(
                systemService.install(
                        signUpForm.getUsername(),
                        signUpForm.getEmail(),
                        signUpForm.getPassword()
                )
        );

        request.login(signUpForm.getUsername(), signUpForm.getPassword());

        return userResource;
    }
}
