package rgf.micro.manage.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

@WebMvcTest
public class IndexControllerIT extends BaseIT {

    @Test
    void indexAccessNotLogin() throws Exception {
        mockMvc.perform(get("/api/v0/index")).andExpect(status().isOk()).andExpect(content().string("WORKING"));
    }

}
