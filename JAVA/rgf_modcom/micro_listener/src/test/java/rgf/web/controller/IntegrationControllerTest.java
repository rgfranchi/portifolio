package rgf.web.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import rgf.integration.config.GatewayConfig;

@ExtendWith(MockitoExtension.class)
public class IntegrationControllerTest {

    String messageSend = "MESSAGE_STRING";
    String messageReturn = "FAKE_RETURN";

    @Mock
    GatewayConfig gatewayConfig;

    @InjectMocks
    IntegrationController integrationController;

    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(integrationController).build();
    }

    @Test
    void testGetMessageForIntegrate() throws Exception {
        // given
        given(gatewayConfig.process(messageSend)).willReturn(messageReturn);
        // when

        MvcResult result = mockMvc.perform(get("/integration/" + messageSend).characterEncoding("UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.valueOf("text/plain;charset=UTF-8")))
                .andReturn();
        // then
        assertEquals(messageReturn, result.getResponse().getContentAsString());
    }
}
