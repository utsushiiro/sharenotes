package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "folder")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Folder {

    public static final String ROOT_FOLDER_NAME = "__root";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_folder_id")
    private Folder parentFolder;

    @OneToMany(
            mappedBy = "parentFolder",
            fetch = FetchType.LAZY,
            cascade= CascadeType.ALL
    )
    private List<Folder> subFolders = new ArrayList<>();

    @OneToMany(
            mappedBy = "folder",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<Note> notes = new ArrayList<>();

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @LastModifiedBy
    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "updated_by",
            nullable = false
    )
    private User updatedBy;

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

    public void addSubFolder(Folder folder) {
        subFolders.add(folder);
        folder.setParentFolder(this);
    }

    public void addNote(Note note) {
        notes.add(note);
        note.setFolder(this);
    }
}
