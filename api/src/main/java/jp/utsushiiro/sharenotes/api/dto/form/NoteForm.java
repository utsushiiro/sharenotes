package jp.utsushiiro.sharenotes.api.dto.form;

import jp.utsushiiro.sharenotes.api.dto.form.validator.ExtendedNotBlank;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class NoteForm {

    @ExtendedNotBlank
    private String title;

    @NotNull
    private String content;
}
