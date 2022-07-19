package rgf.receive;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.only;
import static org.mockito.Mockito.verify;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.MessageHeaders;
import pojo.integration.IntegrationMessage;
import rgf.document.RuleEvent;
import rgf.service.ListenerFromService;

@DisplayName("Recebe mensagem do receive.")
@ExtendWith(MockitoExtension.class)
public class ListenerJMSTest {
    
    @Mock
    ListenerFromService listenerFromService;
    
    @InjectMocks
    ListenerJMS listenerJMS;


    private RuleEvent givenRuleEvent;
    private IntegrationMessage givenIntegrationMessage;
    private MessageHeaders givenMessageHeaders;

    @BeforeEach
    public void setUp() {
        givenRuleEvent = RuleEvent.builder().build();
        givenIntegrationMessage = IntegrationMessage.builder().build();
        givenMessageHeaders = new MessageHeaders(Map.of("TESTE", new Object()));
    }

    @Test
    @DisplayName("Recebe mensagem e verifica execução")
    void testFromListener() {
        // given
        given(listenerFromService.loadRuleEvent(givenIntegrationMessage)).willReturn(givenRuleEvent);
        // when 
        listenerJMS.fromListener(givenIntegrationMessage, givenMessageHeaders);
        // then
        verify(listenerFromService,only()).loadRuleEvent(givenIntegrationMessage);
    }
}
