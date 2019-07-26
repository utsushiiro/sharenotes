package jp.utsushiiro.sharenotes.api.dto.form.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class FolderPathValidator implements ConstraintValidator<FolderPath, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (!value.startsWith("/")) {
            return false;
        }

        FolderNameValidator folderNameValidator = new FolderNameValidator();
        String[] folderNames = value.substring(1).split("/");
        return Arrays.stream(folderNames).allMatch((folderName) -> folderNameValidator.isValid(folderName, null));
    }
}
