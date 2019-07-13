package jp.utsushiiro.sharenotes.api.repository;

import jp.utsushiiro.sharenotes.api.domain.LatestNoteRevisionMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LatestNoteRevisionMappingRepository extends JpaRepository<LatestNoteRevisionMapping, Long> {
}
