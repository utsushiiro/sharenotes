package jp.utsushiiro.sharenotes.api.dto.response;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.NoteRevision;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoteResponse {
    private Long id;

    private String title;

    private String content;

    private LocalDateTime updatedAt;

    private String updatedBy;

    private LocalDateTime createdAt;

    private String createdBy;

    public NoteResponse(Note note) {
        this.id = note.getId();

        NoteRevision latestRevision = note.getLatestRevision();
        this.title = latestRevision.getTitle();
        this.content = latestRevision.getContent();

        this.updatedAt = latestRevision.getCreatedAt();
        this.updatedBy = latestRevision.getCreatedBy().getName();
        this.createdAt = note.getCreatedAt();
        this.createdBy = note.getCreatedBy().getName();
    }
}
