package jp.utsushiiro.sharenotes.api.dto.resource;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class FolderResource {

    private String id;

    private String name;

    private LocalDateTime updatedAt;

    private UserResource updatedBy;

    private LocalDateTime createdAt;

    private UserResource createdBy;

    public FolderResource(Folder folder) {
        this.id = folder.getId().toString();
        this.name = folder.getName();
        this.updatedAt = folder.getUpdatedAt();
        this.updatedBy = new UserResource(folder.getUpdatedBy());
        this.createdAt = folder.getCreatedAt();
        this.createdBy = new UserResource(folder.getCreatedBy());
    }
}
