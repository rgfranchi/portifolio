package rgf.integration.channel;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;

import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import rgf.integration.helper_tests.MessageHelper;
import rgf.integration.service.JsonService;
import rgf.integration.service.ReplaceServices;

@Description("Responde mensagem para o módulo Xª parte do processo")
@ExtendWith(MockitoExtension.class)
public class ResponseChannelTest extends MessageHelper {

    @Mock
    JsonService jsonService;

    @Spy
    ReplaceServices replaceServices;

    @InjectMocks
    @Autowired
    ResponseChannel responseChannel;

    RuleMessage givenRuleMessage;
    ListenerMessage givenListenerMessage;

    @BeforeEach
    void setUp() {
        givenRuleMessage = RuleMessage.builder().build();
        givenListenerMessage = ListenerMessage.builder().build();
        givenRuleMessage.setListenerMessage(givenListenerMessage);
    }

    @Description("Responde mensagem da configuração KEEP_ALIVE")
    @Test
    void testKeepAlive() {
        // given
        givenListenerMessage.setMessageResponse("_OK_");
        // when
        String res = responseChannel.keepAlive(createObjMessage("KEEP_ALIVE:Responde __OK__.", givenRuleMessage));
        // then
        assertEquals("_OK_", res);
    }

    @Description("Responde mensagem DEFAULT da configuração KEEP_ALIVE")
    @Test
    void testKeepAlive_default() {
        // given
        // when
        String res = responseChannel.keepAlive(createObjMessage("KEEP_ALIVE:Responde __OK__.", givenRuleMessage));
        // then
        assertNull(res);
    }

    @Description("Responde data hora local, compara tamanho da string.")
    @Test
    void testDateTime() {
        // given
        String fakeMessageResponse = "$_DATE_TIME_=data hora#";
        String fakeDateFormat = "ddMMYYYY:HHmmss";
        givenListenerMessage.setMessageResponse(fakeMessageResponse);
        givenListenerMessage.setFormatDateTime(fakeDateFormat);
        // when
        String res = responseChannel
                .dateTime(createObjMessage("DATE_TIME_MESSAGE:Teste de data hora", givenRuleMessage));
        // then
        assertEquals(27, res.length());

    }

    @Description("Responde 'setMessageResponse' substituindo palavras chave")
    @Test
    void testText() {
        // given
        String fakeMessageResponse = "$_COD_MODULO_,_DATE_TIME_,_UUID_CONFIRM_#";
        givenListenerMessage.setMessageResponse(fakeMessageResponse);
        givenListenerMessage.setCodModulo("MOD_0001");
        givenListenerMessage.setUuidConfirm("UUID_CONFIRM");
        givenListenerMessage.setFormatDateTime("YYYY MM dd HH mm ss");
        Map<String, Object> mapHeader = new HashMap<>();
        mapHeader.put("ruleMessage", "{FAKE_JSON_OBJECT_TEXT}");
        // when
        String res = responseChannel.text(createObjMessage("TEXT_MESSAGE:Teste com texto fixo", givenRuleMessage));
        // then
        assertEquals(43, res.length());
        String[] arrRes = res.split(",");
        assertEquals(arrRes[0], "$MOD_0001");
        assertEquals(arrRes[2], "UUID_CONFIRM#");
        assertEquals(arrRes[1].length(), "YYYY-MM-dd HH:mm:ss".length());

    }

    @Test
    void testNotDefined() {
        // given
        String fakePayload = "MESSAGE não definida";
        // when
        String res = responseChannel.notDefined(createObjMessage(fakePayload, givenRuleMessage));
        // then
        assertEquals(String.format("RULE NOT DEFINED:%s", fakePayload), res);
    }
}
