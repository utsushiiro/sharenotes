package jp.utsushiiro.sharenotes.api.dto.form.validator;

import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class FolderNameValidator implements ConstraintValidator<FolderName, String> {
    public final static Pattern FOLDER_NAME_PATTERN = Pattern.compile("^[^/]+$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !StringUtils.isBlank(value) && FOLDER_NAME_PATTERN.matcher(value).find();
    }
}
