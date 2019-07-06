package jp.utsushiiro.sharenotes.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.Notes;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.form.NoteForm;
import jp.utsushiiro.sharenotes.api.service.NoteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Sql(scripts = "/create-test-data.sql")
@Sql(scripts = "/delete-test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class NotesRestControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private NoteService noteService;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    @WithMockUser
    void findAllTest() throws Exception {
        Notes expected = new Notes();
        Mockito.doReturn(expected).when(noteService).findAll();

        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/notes"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Notes actual = mapper.readValue(result.getResponse().getContentAsString(), Notes.class);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @WithMockUser
    void findTest() throws Exception {
        int noteId = 1;
        Note expected = new Note();
        Mockito.doReturn(Optional.of(expected)).when(noteService).findById(noteId);

        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.get(String.format("/api/notes/%s", noteId)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Note actual = mapper.readValue(result.getResponse().getContentAsString(), Note.class);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @WithUserDetails(value = "test-user")
    void createTest() throws Exception {
        NoteForm noteForm = createNoteForm();
        Note note = noteForm.toNote();
        int userId = 1;
        note.setId(userId);
        Mockito.doReturn(note).when(noteService).create(ArgumentMatchers.any(Note.class), ArgumentMatchers.any(User.class));

        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/api/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(noteForm)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Note actual = mapper.readValue(result.getResponse().getContentAsString(), Note.class);
        assertThat(actual.getId()).isEqualTo(userId);
        assertThat(actual.getTitle()).isEqualTo(noteForm.getTitle());
        assertThat(actual.getContent()).isEqualTo(noteForm.getContent());
    }

    @Test
    @Disabled
    void updateTest() {

    }

    @Test
    @Disabled
    void deleteTest() {
    }

    private NoteForm createNoteForm() {
        NoteForm noteForm = new NoteForm();
        noteForm.setTitle("test-title");
        noteForm.setContent("test-content");
        return noteForm;
    }
}
