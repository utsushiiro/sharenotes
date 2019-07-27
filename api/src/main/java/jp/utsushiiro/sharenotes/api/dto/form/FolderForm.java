package jp.utsushiiro.sharenotes.api.dto.form;

import jp.utsushiiro.sharenotes.api.dto.form.validator.FolderPath;
import lombok.Data;

@Data
public class FolderForm {

    @FolderPath
    private String folderPath;

    public String[] getFolderNames() {
        return folderPath.substring(1).split("/");
    }
}
