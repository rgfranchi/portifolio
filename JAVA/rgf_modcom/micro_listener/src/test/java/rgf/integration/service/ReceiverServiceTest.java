package rgf.integration.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import rgf.integration.helper_tests.MessageHelper;

@DisplayName("Serviço de recebimento e conversão")
@ExtendWith(MockitoExtension.class)
public class ReceiverServiceTest extends MessageHelper {

    @Mock
    private RegexService regexService;

    @InjectMocks
    private ReceiverService receiverService;

    String regex;
    Integer group;
    String send_message;
    RuleMessage givenRuleMessage;
    ListenerMessage givenListenerMessage;

    @BeforeEach
    void setUp() {
        givenRuleMessage = RuleMessage.builder().build();
        givenListenerMessage = ListenerMessage.builder().build();
        
        regex = "(MODULE_EVENT.)([0-9A-Z_]*)";
        group = 2;
        send_message = "MODULE_EVENT COD_MODULO 2022-01-02: Mensagem Teste de configuração";
        
        givenListenerMessage.setCodModuleGroup(this.group);
        givenRuleMessage.setName("MOCK RULE -> NAME");
        givenRuleMessage.setRegex(this.regex);
        givenRuleMessage.setListenerMessage(this.givenListenerMessage);        
    }


    @Test
    @DisplayName("Envia mensagem padrão e verifica resposta")
    void testLoadRuleMessage() throws Exception {
        //given
        String cod_modulo = "COD_FAKE_001";
        given(regexService.loadByGroup(eq(this.send_message), eq(this.group))).willReturn(cod_modulo);
        //when
        RuleMessage ruleMessage = receiverService.loadRuleMessage(
            createObjMessage(send_message, givenRuleMessage)
        );
        //then
        // Verifica métodos chamados
        verify(this.regexService, times(1)).regexPatter(this.regex);
        // responde mesmo cod_modulo de givenEvent_module
        assertEquals(cod_modulo, ruleMessage.getListenerMessage().getCodModulo());
    }

    @Test
    @DisplayName("Envia mensagem e responde com exceção na localização do cod_modulo")
    void testLoadRuleMessage_cod_module_exception() throws Exception {
        //given
        // código módulo default.
        String exceptionMessage = "EXCEPTION MESSAGE";
        givenListenerMessage.setMessageResponse("MESSAGE RESPONSE");
        givenListenerMessage.setMessageError("MESSAGE ERROR");
        String cod_modulo = givenListenerMessage.getCodModulo();
        when(regexService.loadByGroup(eq(this.send_message), eq(this.group))).thenThrow(new Exception(exceptionMessage));
        //when
        RuleMessage ruleMessage = receiverService.loadRuleMessage(
            createObjMessage(send_message, givenRuleMessage)
        );
        //then
        // Verifica métodos chamados
        verify(this.regexService, times(1)).regexPatter(this.regex);
        // responde mesmo cod_modulo de givenEvent_module
        
        assertEquals("RECEIVE RULE:"+exceptionMessage, ruleMessage.getException());
        assertEquals(cod_modulo, ruleMessage.getListenerMessage().getCodModulo());
        assertEquals(exceptionMessage,givenListenerMessage.getReplayPayload());
        assertFalse(ruleMessage.getListenerMessage().getFindModule());
    }


}
