package jp.utsushiiro.sharenotes.api.service;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FolderService {
    private final FolderRepository folderRepository;

    @Autowired
    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    public Folder create(String[] folderNames, User user) {
        Folder parentFolder = folderRepository.findByName(Folder.ROOT_FOLDER_NAME);
        for (String folderName : folderNames) {
            Folder folder = folderRepository.findByName(folderName);
            if (folder == null) {
                folder = new Folder();
                folder.setName(folderName);
                folder.setParentFolder(parentFolder);
                folderRepository.saveAndFlush(folder);
            }
            parentFolder = folder;
        }
        return parentFolder;
    }
}
