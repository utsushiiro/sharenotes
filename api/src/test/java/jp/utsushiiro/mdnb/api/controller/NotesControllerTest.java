package jp.utsushiiro.mdnb.api.controller;

import jp.utsushiiro.mdnb.api.MarkdownNotebookAPIServer;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@SpringBootTest(classes = MarkdownNotebookAPIServer.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Sql(scripts = "/create-test-data.sql")
@Sql(scripts = "/delete-test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class NotesControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    private RestTemplate restTemplate;

    @BeforeEach
    public void setUp() {
        // create RestTemplate with Apache HttpClient which manages cookie
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        restTemplate = restTemplateBuilder.build();
        restTemplate.setRequestFactory(requestFactory);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("username", "test-user");
        body.add("password", "password");
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        URI uri = UriComponentsBuilder.fromUriString(String.format("http://localhost:%s/api/login", port)).build().toUri();
        ResponseEntity<Void> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.POST,
                entity,
                Void.class
        );
        System.out.println(responseEntity);
    }

    @Test
    public void login() {

    }
}

