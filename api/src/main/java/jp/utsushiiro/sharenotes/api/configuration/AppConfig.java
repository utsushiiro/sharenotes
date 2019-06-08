package jp.utsushiiro.sharenotes.api.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.StdDateFormat;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class AppConfig {
    /**
     * use ISO 8601 date format
     */
    @Bean
    ObjectMapper objectMapper() {
        return Jackson2ObjectMapperBuilder.json().dateFormat(new StdDateFormat()).build();
    }
}
