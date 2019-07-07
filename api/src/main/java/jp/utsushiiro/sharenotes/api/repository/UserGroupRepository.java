package jp.utsushiiro.sharenotes.api.repository;

import jp.utsushiiro.sharenotes.api.domain.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
}
