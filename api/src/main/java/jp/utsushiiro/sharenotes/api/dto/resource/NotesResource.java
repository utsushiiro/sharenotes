package jp.utsushiiro.sharenotes.api.dto.resource;

import jp.utsushiiro.sharenotes.api.domain.Note;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class NotesResource {

    private List<NoteResource> notes = new ArrayList<>();

    public NotesResource(List<Note> notes) {
        for (Note note : notes) {
            this.notes.add(new NoteResource(note));
        }
    }
}
