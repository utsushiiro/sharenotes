package jp.utsushiiro.sharenotes.api.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthorizationConfig extends GlobalMethodSecurityConfiguration {
    @Bean
    public PermissionEvaluator permissionEvaluator() {
        return null;
    }
}
