package jp.utsushiiro.sharenotes.api.dto.resource;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.exception.exceptions.ForbiddenOperationException;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class FolderResource {

    private String id;

    private String name;

    private List<FolderIdentifierResource> parentFolders = new ArrayList<>();

    private List<FolderIdentifierResource> subFolders = new ArrayList<>();

    private List<NoteResource> notes = new ArrayList<>();

    private LocalDateTime updatedAt;

    private UserResource updatedBy;

    private LocalDateTime createdAt;

    private UserResource createdBy;

    @Data
    @NoArgsConstructor
    static public class FolderIdentifierResource {

        private String id;

        private String name;

        FolderIdentifierResource(Folder folder) {
            this.id = folder.getId().toString();
            this.name = folder.getName();
        }
    }

    public FolderResource(Folder folder, User accessUser) {
        // check user can access folder itself
        if (!folder.getGroupWithReadAuthority().hasUser(accessUser)) {
            throw new ForbiddenOperationException();
        }

        this.id = folder.getId().toString();
        this.name = folder.getName();

        // check user can access parent folders
        Folder parentFolder = folder.getParentFolder();
        while (parentFolder != null) {
            if (!parentFolder.getGroupWithReadAuthority().hasUser(accessUser)) {
                throw new ForbiddenOperationException();
            }
            this.parentFolders.add(new FolderIdentifierResource(parentFolder));
            parentFolder = parentFolder.getParentFolder();
        }

        // collect readable sub folders
        for (Folder subFolder: folder.getSubFolders()) {
            if (subFolder.getGroupWithReadAuthority().hasUser(accessUser)) {
                this.subFolders.add(new FolderIdentifierResource(subFolder));
            }
        }

        // collect readable notes in a folder
        for (Note note: folder.getNotes()) {
            if (note.getLatestRevision().getGroupWithReadAuthority().hasUser(accessUser)){
                this.notes.add(new NoteResource(note));
            }
        }

        this.updatedAt = folder.getUpdatedAt();
        this.updatedBy = new UserResource(folder.getUpdatedBy());
        this.createdAt = folder.getCreatedAt();
        this.createdBy = new UserResource(folder.getCreatedBy());
    }
}
