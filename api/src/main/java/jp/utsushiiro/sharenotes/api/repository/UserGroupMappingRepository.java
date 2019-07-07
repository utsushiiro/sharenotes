package jp.utsushiiro.sharenotes.api.repository;

import jp.utsushiiro.sharenotes.api.domain.UserGroupMapping;
import jp.utsushiiro.sharenotes.api.domain.UserGroupMappingId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupMappingRepository extends JpaRepository<UserGroupMapping, UserGroupMappingId> {
}
