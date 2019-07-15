package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "note_revision")
@EntityListeners(AuditingEntityListener.class)
public class NoteRevision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(
            name = "note_id",
            nullable = false
    )
    private Note note;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "user_group_with_read_authority_id",
            nullable = false
    )
    private UserGroup groupWithReadAuthority;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "user_group_with_read_write_authority_id",
            nullable = false
    )
    private UserGroup groupWithReadWriteAuthority;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "user_group_with_admin_authority_id",
            nullable = false
    )
    private UserGroup groupWithAdminAuthority;

    @CreatedDate
    @Column(name="created_at")
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
}
