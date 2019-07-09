package jp.utsushiiro.sharenotes.api.configuration;

import jp.utsushiiro.sharenotes.api.auth.UserGroupBasedPermissionEvaluator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthorizationConfig extends GlobalMethodSecurityConfiguration {

    private MethodSecurityExpressionHandler defaultMethodSecurityExpressionHandler;

    @Autowired
    public AuthorizationConfig(MethodSecurityExpressionHandler defaultMethodSecurityExpressionHandler) {
        this.defaultMethodSecurityExpressionHandler = defaultMethodSecurityExpressionHandler;
    }

    @Override
    protected MethodSecurityExpressionHandler createExpressionHandler() {
        return defaultMethodSecurityExpressionHandler;
    }

    @Bean
    public MethodSecurityExpressionHandler defaultMethodSecurityExpressionHandler() {
        DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
        expressionHandler.setPermissionEvaluator(new UserGroupBasedPermissionEvaluator());
        return expressionHandler;
    }
}
