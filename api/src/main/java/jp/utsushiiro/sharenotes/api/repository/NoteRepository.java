package jp.utsushiiro.sharenotes.api.repository;

import jp.utsushiiro.sharenotes.api.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
}
