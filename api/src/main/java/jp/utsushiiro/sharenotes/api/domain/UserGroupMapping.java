package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "user_group_mapping")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class UserGroupMapping {
    @EmbeddedId
    private UserGroupMappingId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userGroupId")
    private UserGroup userGroup;

    @Column(name = "is_admin")
    private boolean isAdmin;

    @LastModifiedDate
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @CreatedDate
    @Column(name="created_at")
    private LocalDateTime createdAt;

    public UserGroupMapping(User user, UserGroup userGroup, boolean isAdmin) {
        this.user = user;
        this.userGroup = userGroup;
        this.isAdmin = isAdmin;
        this.id = new UserGroupMappingId(user.getId(), userGroup.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserGroupMapping that = (UserGroupMapping) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(userGroup, that.userGroup);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, userGroup);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("UserGroupMapping{");
        sb.append("userId=").append(id.getUserId());
        sb.append(", userGroupId=").append(id.getUserGroupId());
        sb.append('}');
        return sb.toString();
    }
}
