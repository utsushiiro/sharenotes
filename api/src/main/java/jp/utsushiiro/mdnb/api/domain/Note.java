package jp.utsushiiro.mdnb.api.domain;

import lombok.Data;

@Data
public class Note {
    private int id;

    private String title;

    private String body;
}
