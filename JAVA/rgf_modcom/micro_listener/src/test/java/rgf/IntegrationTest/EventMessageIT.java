package rgf.IntegrationTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.net.SocketException;
import java.net.UnknownHostException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import lombok.extern.slf4j.Slf4j;
import rgf.IntegrationTest.helper.IntegrationActiveMQHelper;
import rgf.IntegrationTest.helper.JMSConfigHelper;
import rgf.IntegrationTest.helper.UDPConnectHelper;
import rgf.IntegrationTest.helper.activeMQEmbedded.ActiveMQEmbeddedScanConfig;

/**
 * Testa a Regras<br>
 * Regra IV - INCLUI MENSAGEM NA FILA DE EVENTO<br>
 * Regra VI - CONFIRMA O RECEBIMENTO DA MENSAGEM (Parcial)<br>
 * 
 */
@DisplayName("Evento (envio/resposta) interage com ActiveMQ")
@Slf4j
@SpringBootTest
@Import(ActiveMQEmbeddedScanConfig.class)
public class EventMessageIT extends IntegrationActiveMQHelper {

    // @AfterAll
    // public static void afterAll() throws Exception {
    //     ActiveMQEmbeddedServerHelper.activeMQServer().stop();
    // }

    @Test
    @DisplayName("Send Event Message - Resposta do arquivo de configuração")
    void sendEventRule_default_response() throws SocketException, UnknownHostException {
        // given
        Long countMQ = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_RECEIVER);
        String send = "EVENT 1234 IV-NOT MESSAGE IN QUEUE";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();
        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);
        // then
        String[] res = response.split(":");
        // MENSAGEM DE RESPOSTA NÃO ENCONTRADA e Cod_modulo
        assertEquals("EVENT_NOT_FOUND$1234", res[0]);
        // UUID Aleatório com 4 dígitos
        assertTrue(res[1].matches("\\w\\w\\w\\w\\#"));
        // verifica se tem uma mensagem a mais na fila
        assertEquals(countMQ + 1, activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_RECEIVER));
        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send Event - Consome da fila MESSAGE_TO_MODULE e Confirma recebimento")
    void sendEventRule_receive_response_confirm() throws SocketException, UnknownHostException {
        // given
        insertMessageToModule();
        // verifica se possui 1 mensagem na fila para consumo. (Bootstrap.InsertMessages)
        Long countMQToModule = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MODULE);
        assertTrue(countMQToModule >= 1);
        // verifica se fila de recebimento está vazia.
        Long countMQToReceive = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_RECEIVER);
        
        String send = "EVENT 4321 IV-GET MESSAGE IN QUEUE";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();
        // when
        // envia mensagem de evento
        String response = udpConnect.sendMessage(send, 9000);
        // recupera UUID enviado
        String uuidConfirm = response.split("#")[1];
        // Cria mensagem de confirmação
        String confirmMessage = "UUID_CONFIRM"+uuidConfirm;
        // Envia mensagem de confirmação
        String response_confirm = udpConnect.sendMessage(confirmMessage, 9000);
        // then
        // verifica mensagem recebida.
        assertEquals("$4321:MENSAGEM BOOTSTRAP TESTE#"+uuidConfirm, response);
        // Verifica confirmação (não possui nova mensagem).
        assertEquals("NOT FOUND$"+confirmMessage+"#", response_confirm);
        // verifica se consumiu da mensagem para para o modulo e confirmou a mesma mensagem (1 a menos).
        assertEquals(countMQToModule - 1, activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MODULE));
        // verifica se tem uma mensagem de evento a mais na fila.
        assertEquals(countMQToReceive + 1, activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_RECEIVER));
        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send Event Message - Falha ao localizar cod_modulo.")
    void sendEventRule_invalid_codModulo() throws SocketException, UnknownHostException {
        // given
        Long countMQToReceive = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_RECEIVER);
        assertTrue(countMQToReceive == 0);

        String send = "EVENT_FAIL K9DB";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();
        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);
        String[] res = response.split(":");
        // then
        // Mensagem de não encontrado.
        assertEquals("$EVENT_FAIL", res[0]);
        assertEquals("No group 3#", res[1]);
        // UUID Gerado na resposta.

        assertEquals(countMQToReceive + 1, activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_RECEIVER));
        udpConnect.stopClient();
    }


    // private Long activeMQQueueCount(String queueName) {
    //     Long ret = 0L;
    //     try {
    //         ret = ActiveMQEmbeddedServerHelper.activeMQServer().queueQuery(new SimpleString(queueName)).getMessageCount();
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    //     return ret;
    // }

}
