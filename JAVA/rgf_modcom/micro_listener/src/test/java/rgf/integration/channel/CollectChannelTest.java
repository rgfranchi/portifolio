package rgf.integration.channel;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.BDDMockito.given;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.Message;

import pojo.integration.RuleMessage;
import pojo.integration.TypeListenerMessage;
import rgf.integration.helper_tests.MessageHelper;
import rgf.integration.service.JsonService;
import rgf.integration.service.RegexService;

@DisplayName("Serviço de recebimento da mensagem 2ª parte do processo")
@ExtendWith(MockitoExtension.class)
public class CollectChannelTest extends MessageHelper {

    @Mock
    JsonService jsonService;

    @Mock
    RegexService regexService;

    @InjectMocks
    @Autowired
    CollectChannel receiveService;

    private Map<String, Object> headerMap = new HashMap<>();

    @Test
    @DisplayName("Primeiro acesso a mensagem e verifica qual o arquivo de regras json")
    void testProcessMessage() {
        // given
        headerMap.put("fileJsonRules", "9000");
        // when
        Message<String> newMessage = receiveService
                .process(createObjMessage("Minha\nmensagem\r de\nteste\r\n ", headerMap));
        // then
        assertEquals("Minha\nmensagem\r de\nteste\r\n ", newMessage.getPayload());
        assertEquals("9000", newMessage.getHeaders().get("fileJsonRules"));
    }

    @Test
    @DisplayName("Executa o clean sem alteração da mensagem.")
    void testCleanMessage() {
        // given
        String str = "Minha mensagem de teste";
        // when
        Message<String> newMessage = receiveService.clean(createObjMessage(str, headerMap));
        // then
        assertEquals("Minha mensagem de teste", newMessage.getPayload().toString());
    }

    @Test
    @DisplayName("Retira caracteres indesejados da mensagem.")
    void testCleanMessage_delete_chars() {
        // given
        String str = "  Minha\nmensagem\rde\nteste\r\n  ";
        // when
        Message<String> newMessage = receiveService.clean(createObjMessage(str, headerMap));
        // then
        assertEquals("Minha mensagem de teste", newMessage.getPayload().toString());
    }

    @Test
    @DisplayName("Mensagem TYPE KEEP_ALIVE")
    void testTypeMessage_KEEP_ALIVE() throws IOException {
        // given
        String strMessage = "KEEP_ALIVE:Responde __OK__.";
        mockListJsonRule(strMessage, "KEEP_ALIVE.", TypeListenerMessage.KEEP_ALIVE, false);
        // when
        Message<String> objMessage = receiveService.type(createObjMessage(strMessage,
                new HashMap<>()));
        // then
        assertEquals(4, objMessage.getHeaders().size());
        assertEquals("KEEP_ALIVE", objMessage.getHeaders().get("typeMessage"));
        assertNotNull(objMessage.getHeaders().get("ruleMessage"));
        assertEquals(strMessage, objMessage.getPayload());
    }

    @Test
    @DisplayName("Mensagem TYPE DATE_TIME")
    void testTypeMessage_DATE_TIME() throws IOException {
        // given
        String strMessage = "DATE_TIME_MESSAGE:Teste de data hora";
        mockListJsonRule(strMessage, "DATE_TIME_MESSAGE.", TypeListenerMessage.DATE_TIME, false);
        // when
        Message<String> objMessage = receiveService.type(createObjMessage(strMessage,
                new HashMap<>()));
        // then
        assertEquals(4, objMessage.getHeaders().size());
        assertEquals("DATE_TIME", objMessage.getHeaders().get("typeMessage"));
        assertEquals(strMessage, objMessage.getPayload());
    }

    @Test
    @DisplayName("Mensagem TYPE TEXT")
    void testTypeMessage_TEXT_MESSAGE() throws IOException {
        // given
        String strMessage = "TEXT_MESSAGE:Teste com texto fixo e replace de TAG";
        mockListJsonRule(strMessage, "TEXT_MESSAGE.", TypeListenerMessage.TEXT, false);
        // when
        receiveService.process(createObjMessage(strMessage, new HashMap<>()));
        Message<String> objMessage = receiveService.type(createObjMessage(strMessage,
                new HashMap<>()));
        // then
        assertEquals(4, objMessage.getHeaders().size());
        assertEquals("TEXT", objMessage.getHeaders().get("typeMessage"));
        assertEquals(strMessage, objMessage.getPayload());
    }

    @Test
    @DisplayName("Mensagem TYPE EVENT")
    void testTypeMessage_EVENT() throws IOException {
        // given
        String strMessage = "RULE_EVENT:Mensagem de evento";
        mockListJsonRule(strMessage, "(RULE_EVENT.)([0-9]*)", TypeListenerMessage.EVENT, false);
        // when
        Message<String> objMessage = receiveService.type(createObjMessage(strMessage,
                new HashMap<>()));
        // then
        assertEquals(4, objMessage.getHeaders().size());
        assertEquals("EVENT", objMessage.getHeaders().get("typeMessage"));
        assertEquals(strMessage, objMessage.getPayload());
    }

    @Test
    @DisplayName("Mensagem TYPE CONFIRM")
    void testTypeMessage_CONFIRM() throws IOException {
        // given
        String strMessage = "CONFIRM_EVENT_FIND a1b2 2022-01-02 10:Teste de confirmação de evento";
        mockListJsonRule(strMessage, "(CONFIRM_EVENT_FIND.)([\\w]*)", TypeListenerMessage.CONFIRM, false);
        // when
        Message<String> objMessage = receiveService.type(createObjMessage(strMessage,
                new HashMap<>()));
        // then
        assertEquals(4, objMessage.getHeaders().size());
        assertEquals("CONFIRM", objMessage.getHeaders().get("typeMessage"));
        assertEquals(strMessage, objMessage.getPayload());
    }

    @Test
    @DisplayName("Mensagem TYPE CONFIG EXACT")
    void testTypeMessage_CONFIG() {
        // given
        String strMessage = "EXACT_CONFIG;1234";
        mockListJsonRule(strMessage, "(EXACT_CONFIG);([1-4]*)", TypeListenerMessage.CONFIG, true);
        // when
        Message<String> objMessage = receiveService.type(createObjMessage(strMessage,
                new HashMap<>()));
        // then
        assertEquals(4, objMessage.getHeaders().size());
        assertEquals("CONFIG", objMessage.getHeaders().get("typeMessage"));
        assertEquals(strMessage, objMessage.getPayload());
    }

    @Test
    @DisplayName("Mensagem TYPE NOT_DEFINED")
    void testTypeMessage_NOT_DEFINED() throws IOException {
        // given
        String strMessage = "Não Definida Regra;1234";
        List<RuleMessage> list = new ArrayList<>();

        RuleMessage jsonRule = RuleMessage.builder()
                .name("MOCK NOT FOUND")
                .regex("FAKE")
                .build();
        list.add(jsonRule);

        given(jsonService.rulesFile("default_rules")).willReturn(list);

        // when
        Message<String> objMessage = receiveService.type(createObjMessage(strMessage,
                new HashMap<>()));
        // then
        assertEquals(4, objMessage.getHeaders().size());
        assertEquals("NOT_DEFINED", objMessage.getHeaders().get("typeMessage"));
        assertEquals(strMessage, objMessage.getPayload());
    }

    private List<RuleMessage> mockListJsonRule(String message, String regex, TypeListenerMessage ruleAction,
            Boolean exact) {
        List<RuleMessage> list = new ArrayList<>();

        RuleMessage jsonRule = RuleMessage.builder().build();
        jsonRule.setName("MOCK EVENT '" + message + "' -> '" + regex);
        jsonRule.setRegex(regex);
        jsonRule.getListenerMessage().setTypeMessageListener(ruleAction);

        jsonRule.getListenerMessage().setExact(exact);
        list.add(jsonRule);

        try {
            given(jsonService.rulesFile("default_rules")).willReturn(list);
            // given(jsonService.ruleMessageToString(jsonRule)).willReturn(ruleAction.toString());
            if (exact) {
                given(regexService.matches(message)).willReturn(true);
            } else {
                given(regexService.lookingAt(message)).willReturn(true);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return list;
    }

}
