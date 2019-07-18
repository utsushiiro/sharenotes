package jp.utsushiiro.sharenotes.api.dto.form.validator;

import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ExtendedNotBlankValidator implements ConstraintValidator<ExtendedNotBlank, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !StringUtils.isBlank(value);
    }
}
