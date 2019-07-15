package jp.utsushiiro.sharenotes.api.controller;

import jp.utsushiiro.sharenotes.api.dto.form.SignUpForm;
import jp.utsushiiro.sharenotes.api.dto.response.UserResponse;
import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Sql(scripts = "/create-test-data.sql")
@Sql(scripts = "/delete-test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class AuthControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ObjectMapper mapper;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    /**
     * TODO Using Mock
     * Since I don't know the way to mock HttpServletRequest#login,
     * this test uses UserService which is not mocked in order to create a user for login.
     */
    @Test
    void signUpTest() throws Exception {
        SignUpForm signUpForm = new SignUpForm();
        signUpForm.setUsername("test-user-2");
        signUpForm.setEmail("test-user-2@example.com");
        signUpForm.setPassword("password");

        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/api/sign_up")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(signUpForm)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        UserResponse userResponse = mapper.readValue(result.getResponse().getContentAsString(), UserResponse.class);
        assertThat(userResponse.getName()).isEqualTo("test-user-2");
    }
}
