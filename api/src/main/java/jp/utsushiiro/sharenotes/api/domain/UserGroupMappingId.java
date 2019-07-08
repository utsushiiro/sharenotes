package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
public class UserGroupMappingId implements Serializable {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_group_id")
    private Long userGroupId;

    public UserGroupMappingId(Long userId, Long userGroupId) {
        this.userId = userId;
        this.userGroupId = userGroupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserGroupMappingId that = (UserGroupMappingId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(userGroupId, that.userGroupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, userGroupId);
    }
}
