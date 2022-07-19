package rgf.integration.channel;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.Message;
import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import rgf.integration.helper_tests.MessageHelper;
import rgf.integration.service.ReceiverService;
import rgf.listener.service.SendMessageService;

@DisplayName("Insere mensagens na fila de eventos 'sendMessageService'")
@ExtendWith(MockitoExtension.class)
public class EventChannelTest extends MessageHelper {

    @Mock
    private SendMessageService sendMessageService;

    @Mock
    ReceiverService receiveService;

    @InjectMocks
    EventChannel eventChannel;

    Message<String> message;
    String cod_modulo;
    String regex;
    Integer group;
    String send_message;
    RuleMessage givenRuleMessage;
    ListenerMessage givenListenerMessage;

    @BeforeEach
    void setUp() {
        givenRuleMessage = RuleMessage.builder().build();
        givenListenerMessage = ListenerMessage.builder().build();
        cod_modulo = "COD_FAKE_001";
        regex = "(MODULE_EVENT.)([0-9A-Z_]*)";
        group = 2;
        send_message = "MODULE_EVENT COD_MODULO 2022-01-02: Mensagem Teste de configuração";
    }

    @Test
    @DisplayName("Insere mensagem na fila de eventos e NÃO prepara busca por mensagem")
    void testReceive_default() {
        // give
        givenEvent_module();
        // when
        Message<String> message = eventChannel.receive(this.message);
        // then
        assertEquals(false, message.getHeaders().get("findModule"));
        thenResponse(message);
    }

    @Test
    @DisplayName("Insere mensagem na fila de eventos e prepara busca por mensagem")
    void testReceive_findModule() {
        // give
        this.givenListenerMessage.setFindModule(true);
        givenEvent_module();
        // when
        Message<String> message = eventChannel.receive(this.message);
        // then
        assertEquals(true, message.getHeaders().get("findModule"));
        thenResponse(message);
    }

    void givenEvent_module() {
        this.message = createObjMessage(send_message, givenRuleMessage);

        this.givenListenerMessage.setCodModuleGroup(this.group);
        this.givenListenerMessage.setCodModulo(this.cod_modulo);

        this.givenRuleMessage.setName("MOCK RULE -> NAME");
        this.givenRuleMessage.setRegex(this.regex);
        this.givenRuleMessage.setListenerMessage(this.givenListenerMessage);

        given(receiveService.loadRuleMessage(this.message)).willReturn(this.givenRuleMessage);
    }

    void thenResponse(Message<String> response) {
        RuleMessage thenRule = (RuleMessage) response.getHeaders().get("ruleMessage");
        // Verifica métodos chamados
        verify(this.sendMessageService, times(1)).toReceiver(this.send_message, thenRule);
        verify(this.receiveService, times(1)).loadRuleMessage(this.message);
        
        // verify(this.regexService, times(1)).regexPatter(this.regex);

        // mensagem no payload mesma da inserida.
        assertEquals(this.send_message, response.getPayload().toString());
        // responde mesmo cod_modulo de givenEvent_module
        assertEquals(this.cod_modulo, thenRule.getListenerMessage().getCodModulo());
    }

}
