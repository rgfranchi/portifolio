package rgf.integration.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Description;

import pojo.integration.ListenerMessage;

public class ReplaceServicesTest {

    private ReplaceServices replaceServices;
    private ListenerMessage listenerMessage;

    @BeforeEach
    public void setUp() {
        replaceServices = new ReplaceServices();
        listenerMessage = ListenerMessage.builder().build();
    }

    @Test
    @Description("Substitui palavra chave _COD_MODULO_")
    void testCodModulo() {
        String text = "$_COD_MODULO_#";
        listenerMessage.setCodModulo("1234");
        assertEquals("$1234#", replaceServices.codModulo(text, listenerMessage));
    }

    @Test
    @Description("Substitui palavra chave _DATE_TIME_")
    void testDateTime() {
        String text = "$_DATE_TIME_#";
        listenerMessage.setFormatDateTime("dd/MM/yyyy HH:mm:ss");
        listenerMessage.setPlusHour(-3);
        text = replaceServices.dateTime(text, listenerMessage);
        // verifica formato valido.
        assertTrue(text.matches("\\$\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d \\d\\d:\\d\\d:\\d\\d#"));
    }

    @Test
    @Description("Substitui palavra chave _UUID_CONFIRM_")
    void testUuidConfirm() {
        String text = "$_UUID_CONFIRM_#";
        listenerMessage.setUuidConfirm("g564g");
        assertEquals("$g564g#", replaceServices.uuidConfirm(text, listenerMessage));
    }

    @Test
    @Description("Substitui palavras chaves _COD_MODULO_, _UUID_CONFIRM_, _SEND_PAYLOAD_, _REPLAY_PAYLOAD_ e _ERROR_")
    void testVerityReplaces() {
        String payload = "MESSAGE PAYLOAD";
        listenerMessage.setMessageResponse("$_COD_MODULO_@_UUID_CONFIRM_:_SEND_PAYLOAD_!_REPLAY_PAYLOAD_?_ERROR_$");
        
        listenerMessage.setCodModulo("1234");
        listenerMessage.setUuidConfirm("g564g");
        listenerMessage.setReplayPayload("MENSAGEM_OU_ERRO");
        
        assertEquals("$1234@g564g:MESSAGE PAYLOAD!MENSAGEM_OU_ERRO?MENSAGEM_OU_ERRO$",
                replaceServices.verifyReplaces(listenerMessage, payload));
    }
}
