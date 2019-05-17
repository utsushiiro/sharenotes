package jp.utsushiiro.mdnb.api.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Note{
    private int id;

    private String title;

    private String content;

    private int userId;

    private LocalDateTime updatedAt;

    private LocalDateTime createdAt;
}
