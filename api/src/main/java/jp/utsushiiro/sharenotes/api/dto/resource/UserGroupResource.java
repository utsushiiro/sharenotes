package jp.utsushiiro.sharenotes.api.dto.resource;

import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserGroupResource {

    private Long id;

    private String name;

    private LocalDateTime updatedAt;

    private LocalDateTime createdAt;

    public UserGroupResource(UserGroup userGroup) {
        this.id = userGroup.getId();
        this.name = userGroup.getName();
        this.updatedAt = userGroup.getUpdatedAt();
        this.createdAt = userGroup.getCreatedAt();
    }
}
