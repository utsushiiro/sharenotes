package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.dto.resource.UserResource;
import jp.utsushiiro.sharenotes.api.error.exceptions.ForbiddenOperationException;
import jp.utsushiiro.sharenotes.api.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system")
public class SystemRestController {

    private final SystemService systemService;

    @Autowired
    public SystemRestController(SystemService systemService) {
        this.systemService = systemService;
    }

    @PostMapping(path = "/install")
    public UserResource install(@RequestBody @Validated SignUpForm signUpForm) {
        if (systemService.isInstalled()) {
            throw new ForbiddenOperationException("The application has already been installed");
        }
        return new UserResource(
                systemService.install(
                        signUpForm.getUsername(),
                        signUpForm.getEmail(),
                        signUpForm.getPassword()
                )
        );
    }
}
