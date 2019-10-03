package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import jp.utsushiiro.sharenotes.api.domain.Workspace;
import jp.utsushiiro.sharenotes.api.exception.exceptions.ResourceNotFoundException;
import jp.utsushiiro.sharenotes.api.repository.FolderRepository;
import jp.utsushiiro.sharenotes.api.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FolderService {
    private final FolderRepository folderRepository;

    private final UserGroupRepository userGroupRepository;

    @Autowired
    public FolderService(FolderRepository folderRepository, UserGroupRepository userGroupRepository) {
        this.folderRepository = folderRepository;
        this.userGroupRepository = userGroupRepository;
    }

    @PreAuthorize("isAuthenticated() and hasPermission(#id, 'jp.utsushiiro.sharenotes.api.domain.Folder', T(jp.utsushiiro.sharenotes.api.domain.Folder$AuthorityType).READ)")
    @Transactional(readOnly = true)
    public Folder findById(Long id) {
        return folderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(Folder.class, id));
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    public Folder create(Workspace workspace, String[] folderNames, User user) {
        UserGroup ownerGroup = user.getSelfGroup();
        UserGroup everyoneGroup = userGroupRepository.findByName(UserGroup.EVERYONE_USER_GROUP_NAME);

        Folder parentFolder = folderRepository.findByName(Folder.ROOT_FOLDER_NAME);
        for (String folderName : folderNames) {
            Folder folder = folderRepository.findByName(folderName);
            if (folder == null) {
                folder = new Folder();
                folder.setWorkspace(workspace);
                folder.setName(folderName);
                folder.setParentFolder(parentFolder);
                folder.setGroupWithWriteAuthority(everyoneGroup);
                folder.setGroupWithAdminAuthority(ownerGroup);
                folderRepository.saveAndFlush(folder);
            }
            parentFolder = folder;
        }
        return parentFolder;
    }
}
