package jp.utsushiiro.mdnb.api.repository.mybatis;

import jp.utsushiiro.mdnb.api.domain.Note;

import java.util.List;

public interface NoteMapper {
    List<Note> findAll();
    Note findOne();
}
