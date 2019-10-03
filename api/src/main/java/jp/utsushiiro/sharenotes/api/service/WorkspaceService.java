package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.domain.Workspace;
import jp.utsushiiro.sharenotes.api.repository.FolderRepository;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import jp.utsushiiro.sharenotes.api.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;

    private final UserGroupRepository userGroupRepository;

    private final FolderRepository folderRepository;

    @Autowired
    public WorkspaceService(
            WorkspaceRepository workspaceRepository,
            UserGroupRepository userGroupRepository, FolderRepository folderRepository) {
        this.workspaceRepository = workspaceRepository;
        this.userGroupRepository = userGroupRepository;
        this.folderRepository = folderRepository;
    }

    public Workspace createPublicWorkspace(String name, String description, User adminUser) {
        UserGroup everyoneGroup = userGroupRepository.findByName(UserGroup.EVERYONE_USER_GROUP_NAME);
        return this.create(name, description, adminUser, everyoneGroup);
    }

    public Workspace create(String name, String description, User adminUser, UserGroup workspaceUserGroup) {
        Workspace workspace = new Workspace();
        UserGroup ownerGroup = adminUser.getSelfGroup();

        workspace.setName(name);
        workspace.setDescription(description);
        workspace.setWorkspaceUserGroup(workspaceUserGroup);
        workspace.setWorkspaceAdminGroup(ownerGroup);
        workspaceRepository.save(workspace);

        Folder rootFolder = new Folder();
        rootFolder.setWorkspace(workspace);
        rootFolder.setName(Folder.ROOT_FOLDER_NAME);
        rootFolder.setGroupWithWriteAuthority(workspaceUserGroup);
        rootFolder.setGroupWithAdminAuthority(ownerGroup);
        rootFolder.setCreatedBy(adminUser);
        rootFolder.setUpdatedBy(adminUser);
        folderRepository.save(rootFolder);

        return workspaceRepository.save(workspace);
    }
}
