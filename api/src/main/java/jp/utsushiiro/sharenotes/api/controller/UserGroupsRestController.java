package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.dto.form.UserGroupForm;
import jp.utsushiiro.sharenotes.api.dto.resource.UserGroupResource;
import jp.utsushiiro.sharenotes.api.service.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserGroupsRestController {
    private final UserGroupService userGroupService;

    @Autowired
    public UserGroupsRestController(UserGroupService userGroupService) {
        this.userGroupService = userGroupService;
    }

    @PostMapping("/user_groups")
    public UserGroupResource create(@RequestBody @Validated UserGroupForm userGroupForm) {
        return new UserGroupResource(userGroupService.create(userGroupForm.getName()));
    }
}
