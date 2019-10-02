package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SystemService {

    private final UserService userService;

    private final UserGroupService userGroupService;

    private final FolderRepository folderRepository;

    @Autowired
    public SystemService(
            UserService userService,
            UserGroupService userGroupService,
            FolderRepository folderRepository
    ) {
        this.userService = userService;
        this.userGroupService = userGroupService;
        this.folderRepository = folderRepository;
    }

    @Transactional
    public User install(String username, String email, String password) {
        UserGroup everyoneGroup = userGroupService.create(UserGroup.EVERYONE_USER_GROUP_NAME);
        UserGroup adminGroup = userGroupService.create(UserGroup.ADMIN_USER_GROUP_NAME);

        User user = userService.create(username, email, password);
        adminGroup.addUser(user);

        Folder rootFolder = new Folder();
        rootFolder.setName(Folder.ROOT_FOLDER_NAME);
        rootFolder.setGroupWithReadAuthority(everyoneGroup);
        rootFolder.setGroupWithReadWriteAuthority(everyoneGroup);
        rootFolder.setGroupWithAdminAuthority(adminGroup);
        rootFolder.setCreatedBy(user);
        rootFolder.setUpdatedBy(user);
        folderRepository.save(rootFolder);

        return user;
    }

    @Transactional
    public boolean isInstalled() {
        UserGroup userGroup = new UserGroup();
        userGroup.setName(UserGroup.ADMIN_USER_GROUP_NAME);
        return userGroupService.exists(userGroup);
    }
}
