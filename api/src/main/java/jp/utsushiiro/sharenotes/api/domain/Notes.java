package jp.utsushiiro.sharenotes.api.domain;

import lombok.Data;

import java.util.List;

@Data
public class Notes {
    List<Note> notes;
}
