package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.utils.TestDataFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders;
import org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;

@SpringBootTest
@ActiveProfiles("test")
public class AuthTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private TestDataFactory testDataFactory;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @AfterEach
    void teardown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    @Disabled
    void loginTest() throws Exception {
        this.mockMvc.perform(
                SecurityMockMvcRequestBuilders.formLogin()
                        .user("username", "test-user")
                        .password("password")
                        .loginProcessingUrl("/api/login"))
                .andExpect(SecurityMockMvcResultMatchers.authenticated())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void logoutTest() throws Exception {
        // setup
        Authentication authentication = testDataFactory.createUsernamePasswordAuthenticationToken();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // do && check
        this.mockMvc.perform(
                SecurityMockMvcRequestBuilders.logout().logoutUrl("/api/logout"))
                .andExpect(SecurityMockMvcResultMatchers.unauthenticated())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
