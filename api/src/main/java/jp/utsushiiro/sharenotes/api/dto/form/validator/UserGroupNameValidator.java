package jp.utsushiiro.sharenotes.api.dto.form.validator;

import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class UserGroupNameValidator implements ConstraintValidator<UserGroupName, String> {

    private final static Pattern USER_GROUP_NAME_PATTERN = Pattern.compile("^[a-zA-Z][a-zA-Z0-9]+$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !StringUtils.isBlank(value) && USER_GROUP_NAME_PATTERN.matcher(value).find();
    }
}
