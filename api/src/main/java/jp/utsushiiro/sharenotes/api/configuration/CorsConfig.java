package jp.utsushiiro.sharenotes.api.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig {
    @Profile("dev")
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Value("${client.origin}")
            private String clientOrigin;

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedMethods(
                                Arrays.stream(HttpMethod.class.getEnumConstants())
                                        .map(Enum::name)
                                        .toArray(String[]::new)
                        )
                        .allowedOrigins(clientOrigin)
                        .allowCredentials(true);
            }
        };
    }
}
