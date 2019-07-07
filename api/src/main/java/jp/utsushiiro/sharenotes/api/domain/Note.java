package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
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
    @Column(name="id")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @LastModifiedDate
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @CreatedDate
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "userId",
            nullable = false
    )
    private User user;
}
