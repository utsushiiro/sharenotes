package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@Table(name = "user_group")
@EntityListeners(AuditingEntityListener.class)
public class UserGroup {

    public static final String EVERYONE_USER_GROUP_NAME = "__everyone";

    public static final String ADMIN_USER_GROUP_NAME = "__administrators";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(
            mappedBy = "userGroup",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<UserGroupMapping> userGroupMappings = new ArrayList<>();

    @LastModifiedDate
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @CreatedDate
    @Column(name="created_at")
    private LocalDateTime createdAt;

    public void addUser(User user, boolean isAdmin) {
        UserGroupMapping userGroupMapping = new UserGroupMapping(user, this, isAdmin);
        userGroupMappings.add(userGroupMapping);
        user.getUserGroupMappings().add(userGroupMapping);
    }

    public void addUser(User user) {
        this.addUser(user, false);
    }

    public boolean hasUser(User user) {
        for (UserGroupMapping userGroupMapping: userGroupMappings) {
            if (userGroupMapping.getId().getUserId().equals(user.getId())) {
                return true;
            }
        }
        return false;
    }

    public void removeUser(User user) {
        Iterator<UserGroupMapping> iterator = userGroupMappings.iterator();
        while(iterator.hasNext()) {
            UserGroupMapping mapping = iterator.next();
            if (mapping.getUserGroup().equals(this) && mapping.getUser().equals(user)) {
                iterator.remove();
                mapping.getUser().getUserGroupMappings().remove(mapping);
                mapping.setUserGroup(null);
                mapping.setUser(null);
            }
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserGroup userGroup = (UserGroup) o;
        return Objects.equals(name, userGroup.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("UserGroup{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
