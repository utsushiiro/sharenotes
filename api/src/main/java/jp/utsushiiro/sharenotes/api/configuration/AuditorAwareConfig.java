package jp.utsushiiro.sharenotes.api.configuration;

import jp.utsushiiro.sharenotes.api.auth.SpringSecurityAuditorAware;
import jp.utsushiiro.sharenotes.api.domain.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class AuditorAwareConfig {
    @Bean
    public AuditorAware<User> auditorProvider() {
        return new SpringSecurityAuditorAware();
    }
}
