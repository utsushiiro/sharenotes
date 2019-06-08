package jp.utsushiiro.sharenotes.api.repository.mapper;

import jp.utsushiiro.sharenotes.api.domain.Note;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface NoteMapper {
    List<Note> findAll();

    Note findOne(int id);

    void insert(Note note);

    int update(Note note);

    int delete(int id);
}
