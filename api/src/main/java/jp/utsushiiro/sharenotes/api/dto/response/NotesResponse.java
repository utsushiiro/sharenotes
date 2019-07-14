package jp.utsushiiro.sharenotes.api.dto.response;

import jp.utsushiiro.sharenotes.api.domain.Note;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class NotesResponse {
    List<NoteResponse> notes = new ArrayList<>();

    public NotesResponse(List<Note> notes) {
        for (Note note : notes) {
            this.notes.add(new NoteResponse(note));
        }
    }
}
