package jp.utsushiiro.sharenotes.api.form;

import jp.utsushiiro.sharenotes.api.domain.Note;
import lombok.Data;

@Data
public class NoteForm {
    private String title;

    private String content;

    private Long userId;

    public Note toNote() {
        Note note = new Note();
        note.setTitle(title);
        note.setContent(content);
        return note;
    }
}
