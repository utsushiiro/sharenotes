package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "latest_note_revision_mapping")
@NoArgsConstructor
public class LatestNoteRevisionMapping {
    @Id
    @Column(name="note_id")
    private Long noteId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Note note;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "note_revision_id")
    private NoteRevision noteRevision;

    @Version
    @Column(name = "version")
    private Long version;

    public LatestNoteRevisionMapping(Note note, NoteRevision noteRevision) {
        this.note = note;
        this.noteRevision = noteRevision;
    }
}
