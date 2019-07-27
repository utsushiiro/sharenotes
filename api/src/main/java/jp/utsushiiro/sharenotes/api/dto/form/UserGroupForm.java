package jp.utsushiiro.sharenotes.api.dto.form;

import jp.utsushiiro.sharenotes.api.dto.form.validator.UserGroupName;
import lombok.Data;

@Data
public class UserGroupForm {

    @UserGroupName
    private String name;
}
