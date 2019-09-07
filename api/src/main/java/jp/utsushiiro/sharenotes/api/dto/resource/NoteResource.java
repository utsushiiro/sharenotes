package jp.utsushiiro.sharenotes.api.dto.resource;

import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.NoteRevision;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NoteResource {

    private String id;

    private String title;

    private String content;

    private LocalDateTime updatedAt;

    private String updatedBy;

    private LocalDateTime createdAt;

    private String createdBy;

    private String version;

    public NoteResource(Note note) {
        this.id = note.getId().toString();

        NoteRevision latestRevision = note.getLatestRevision();
        this.title = latestRevision.getTitle();
        this.content = latestRevision.getContent();

        this.updatedAt = latestRevision.getCreatedAt();
        this.updatedBy = latestRevision.getCreatedBy().getName();
        this.createdAt = note.getCreatedAt();
        this.createdBy = note.getCreatedBy().getName();
        this.version = note.getLatestRevisionVersion().toString();
    }
}
