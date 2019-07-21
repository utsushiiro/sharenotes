package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "folder")
@Data
public class Folder {
    public static final String ROOT_FOLDER_NAME = "__root";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

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

    public void addSubFolder(Folder folder) {
        subFolders.add(folder);
        folder.setParentFolder(this);
    }

    public void addNote(Note note) {
        notes.add(note);
        note.setFolder(this);
    }
}
