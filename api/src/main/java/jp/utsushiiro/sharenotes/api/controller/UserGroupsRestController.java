package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.dto.form.UserGroupForm;
import jp.utsushiiro.sharenotes.api.dto.resource.UserGroupResource;
import jp.utsushiiro.sharenotes.api.service.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user_groups")
public class UserGroupsRestController {
    private final UserGroupService userGroupService;

    @Autowired
    public UserGroupsRestController(UserGroupService userGroupService) {
        this.userGroupService = userGroupService;
    }

    @PostMapping(path = "")
    public UserGroupResource create(@RequestBody @Validated UserGroupForm userGroupForm) {
        return new UserGroupResource(userGroupService.create(userGroupForm.getName()));
    }
}
