package jp.utsushiiro.sharenotes.api.repository;

import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    List<UserGroup> findByName(String name);
}
