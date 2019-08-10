package jp.utsushiiro.sharenotes.api.dto.form;

import jp.utsushiiro.sharenotes.api.dto.form.validator.ExtendedNotBlank;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateNoteForm {

    @ExtendedNotBlank
    private String title;

    @NotNull
    private String content;

    @NotNull
    private Long version;
}
