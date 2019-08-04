package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "note")
@EntityListeners(AuditingEntityListener.class)
public class Note{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @OneToOne(
            mappedBy = "note",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private LatestNoteRevisionMapping latestNoteRevisionMapping;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CreatedBy
    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "created_by",
            nullable = false
    )
    private User createdBy;

    @Version
    @Column(name = "version")
    private Long version;

    public enum AuthorityType {
        READ,
        READ_WRITE,
        ADMIN
    }

    public void initRevision(NoteRevision revision) {
        latestNoteRevisionMapping = new LatestNoteRevisionMapping(this, revision);
        revision.setCreatedAt(this.createdAt);
    }

    public NoteRevision getLatestRevision() {
        return latestNoteRevisionMapping.getNoteRevision();
    }

    public void updateLatestRevision(NoteRevision revision) {
        revision.setNote(this);
        latestNoteRevisionMapping.setNoteRevision(revision);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Note{");
        sb.append("id=").append(id);
        sb.append('}');
        return sb.toString();
    }
}
