package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.domain.Workspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SystemService {

    private final UserService userService;

    private final UserGroupService userGroupService;

    private final WorkspaceService workspaceService;

    @Autowired
    public SystemService(
            UserService userService,
            UserGroupService userGroupService,
            WorkspaceService workspaceService
    ) {
        this.userService = userService;
        this.userGroupService = userGroupService;
        this.workspaceService = workspaceService;
    }

    @Transactional
    public User install(String username, String email, String password) {
        // create user groups
        UserGroup everyoneGroup = userGroupService.create(UserGroup.EVERYONE_USER_GROUP_NAME);
        UserGroup adminGroup = userGroupService.create(UserGroup.ADMIN_USER_GROUP_NAME);

        // create admin user
        User adminUser = userService.create(username, email, password);
        adminGroup.addUser(adminUser);

        // create general workspace
        Workspace generalWorkspace = workspaceService.createPublicWorkspace("general", "everything ok", adminUser);

        return adminUser;
    }

    @Transactional
    public boolean isInstalled() {
        UserGroup userGroup = new UserGroup();
        userGroup.setName(UserGroup.ADMIN_USER_GROUP_NAME);
        return userGroupService.exists(userGroup);
    }
}
