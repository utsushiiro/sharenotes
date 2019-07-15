package jp.utsushiiro.sharenotes.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jp.utsushiiro.sharenotes.api.domain.Note;
import jp.utsushiiro.sharenotes.api.domain.NoteRevision;
import jp.utsushiiro.sharenotes.api.domain.User;
import jp.utsushiiro.sharenotes.api.dto.form.NoteForm;
import jp.utsushiiro.sharenotes.api.dto.response.NoteResponse;
import jp.utsushiiro.sharenotes.api.dto.response.NotesResponse;
import jp.utsushiiro.sharenotes.api.service.NoteService;
import jp.utsushiiro.sharenotes.api.utils.TestDataFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class NotesRestControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private TestDataFactory testDataFactory;

    @MockBean
    private NoteService noteService;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();

        Authentication authentication = testDataFactory.createUsernamePasswordAuthenticationToken();
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @AfterEach
    void teardown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void findAllTest() throws Exception {
        // setup
        List<Note> notes = new ArrayList<>();
        Long noteId = 1L;
        notes.add(createMockNote(noteId));
        Mockito.doReturn(notes).when(noteService).findAll();

        // do
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/notes"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        NotesResponse response = mapper.readValue(result.getResponse().getContentAsString(), NotesResponse.class);
        assertThat(response.getNotes().get(0).getId()).isEqualTo(noteId);
        Mockito.verify(noteService, Mockito.times(1)).findAll();
    }

    @Test
    void findTest() throws Exception {
        // setup
        Long noteId = 1L;
        Mockito.doReturn(createMockNote(noteId)).when(noteService).findById(noteId);

        // do
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.get(String.format("/api/notes/%s", noteId)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        // check
        NoteResponse response = mapper.readValue(result.getResponse().getContentAsString(), NoteResponse.class);
        assertThat(response.getId()).isEqualTo(noteId);
        Mockito.verify(noteService, Mockito.times(1)).findById(noteId);
    }

    @Test
    void createTest() throws Exception {
        // setup
        NoteForm noteForm = new NoteForm();

        Long noteId = 1L;
        Mockito.doReturn(createMockNote(noteId)).when(noteService).create(
                ArgumentMatchers.any(NoteForm.class),
                ArgumentMatchers.any(User.class)
        );

        // do
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders
                .post("/api/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(noteForm)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        // check
        NoteResponse response = mapper.readValue(result.getResponse().getContentAsString(), NoteResponse.class);
        assertThat(response.getId()).isEqualTo(noteId);
        Mockito.verify(noteService, Mockito.times(1)).create(
                ArgumentMatchers.any(NoteForm.class),
                ArgumentMatchers.any(User.class)
        );
    }

    @Test
    @Disabled
    void updateTest() throws Exception{
        // setup
        Long noteId = 1L;
        NoteForm noteForm = new NoteForm();

        // do
        this.mockMvc.perform(MockMvcRequestBuilders
                .patch(String.format("/api/notes/%s", noteId))
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(noteForm)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Mockito.verify(noteService, Mockito.times(1)).update(
                ArgumentMatchers.anyLong(),
                ArgumentMatchers.any(NoteForm.class)
        );
    }

    @Test
    @Disabled
    void deleteTest() {}

    private Note createMockNote(Long noteId) {
        Note mockNote = Mockito.mock(Note.class);
        Mockito.doReturn(noteId).when(mockNote).getId();

        NoteRevision mockRevision = Mockito.mock(NoteRevision.class);
        Mockito.doReturn(mockRevision).when(mockNote).getLatestRevision();

        User mockUser = Mockito.mock(User.class);
        Mockito.doReturn(mockUser).when(mockNote).getCreatedBy();
        Mockito.doReturn(mockUser).when(mockRevision).getCreatedBy();

        return mockNote;
    }
}
