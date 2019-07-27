package jp.utsushiiro.sharenotes.api.dto.resource;

import jp.utsushiiro.sharenotes.api.domain.Folder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class FolderResource {

    private Long id;

    private String name;

    private LocalDateTime updatedAt;

    private String updatedBy;

    private LocalDateTime createdAt;

    private String createdBy;

    public FolderResource(Folder folder) {
        this.id = folder.getId();
        this.name = folder.getName();
        this.updatedAt = folder.getUpdatedAt();
        this.updatedBy = folder.getUpdatedBy().getName();
        this.createdAt = folder.getCreatedAt();
        this.createdBy = folder.getCreatedBy().getName();
    }
}
