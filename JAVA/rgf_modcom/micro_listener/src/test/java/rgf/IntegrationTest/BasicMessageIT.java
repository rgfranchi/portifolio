package rgf.IntegrationTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.net.SocketException;
import java.net.UnknownHostException;
import javax.jms.JMSException;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.jms.core.JmsTemplate;
import lombok.extern.slf4j.Slf4j;
import rgf.IntegrationTest.helper.IntegrationActiveMQHelper;
import rgf.IntegrationTest.helper.UDPConnectHelper;
import rgf.IntegrationTest.helper.activeMQEmbedded.ActiveMQEmbeddedScanConfig;
import rgf.IntegrationTest.helper.activeMQEmbedded.ActiveMQEmbeddedServerHelper;

/**
 * Testa as Regras<br>
 * Regra I - Responde KEEP ALIVE<br>
 * Regra II - Responde TEXTO<br>
 * Regra III - Responde DATE TIME<br>
 */
@DisplayName("Simples (envio/resposta) NÃO interage com ActiveMQ")
@Slf4j
@SpringBootTest
@Import(ActiveMQEmbeddedScanConfig.class)
public class BasicMessageIT extends IntegrationActiveMQHelper {

    // private JmsTemplate jmsTemplate;

    // @AfterAll
    // public static void afterAll() throws Exception {
    //     ActiveMQEmbeddedServerHelper.activeMQServer().stop();
    // }

    @Disabled
    @Test
    @DisplayName("Simples inclusão de valor na fila.")
    void simpleActiveMQServerJMSTemplate() throws JMSException {
        // given
        jmsTemplate = new JmsTemplate(ActiveMQEmbeddedServerHelper.activeMQconnectionFactory());
        String str = "HELLO Active MQ Artemis";
        String queue = "QUEUE_TESTE";
        // when
        jmsTemplate.convertAndSend(queue, str);
        var get = (String) jmsTemplate.receiveAndConvert(queue);
        // then
        assertEquals(str, get);
    }

    @Disabled
    @Test
    @DisplayName("Teste de conexão UDP . Server: nc -u -l 9000")
    void simpleUDPTest() throws JMSException, SocketException, UnknownHostException {
        UDPConnectHelper udpConnect = new UDPConnectHelper();

        udpConnect.startClient();

        String resp = udpConnect.sendMessage("Hey HO!!\n", 9000);
        log.info(resp);

        assertNotNull(resp);

        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send not defined Message")
    void sendNotDefinedRule() throws SocketException, UnknownHostException {
        // given
        String send = "MESSAGE VII.RULE_NOT_DEFINED";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();

        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);

        // then
        assertEquals("RULE NOT DEFINED:" + send, response.trim());

        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send Keep Alive Message")
    void sendKeepAliveRule() throws SocketException, UnknownHostException {
        // given
        String send = "KEEP_ALIVE I-KEEP_ALIVE";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();

        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);

        // then
        assertEquals("$OK#", response.trim());

        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send Text Message")
    void sendTextRule() throws SocketException, UnknownHostException {
        // given
        String send = "TEXT_MESSAGE II-TEXT";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();

        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);
        // then
        assertEquals(42, response.length());
        String[] arrResp = response.split("!");
        assertEquals(send + "#", arrResp[1]); // PAYLOAD
        assertTrue(arrResp[0].matches("\\$\\d\\d\\d\\d\\-\\d\\d\\-\\d\\d\\ \\d\\d:\\d\\d:\\d\\d")); // DATE TIME

        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send Date Time Message")
    void sendDateTimeRule() throws SocketException, UnknownHostException {
        // given
        String send = "DATE_TIME_MESSAGE III-DATE TIME";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();
        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);
        // then
        assertEquals(16, response.length());
        assertTrue(response.matches("\\$\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d#")); // DATE TIME
        udpConnect.stopClient();
    }
}
