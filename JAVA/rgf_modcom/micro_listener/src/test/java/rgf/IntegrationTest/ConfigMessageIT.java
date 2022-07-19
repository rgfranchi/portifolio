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
 * Regra V - INCLUI MENSAGEM NA FILA DE CONFIGURAÇÃO<br>
 * Regra VI - CONFIRMA O RECEBIMENTO DA MENSAGEM (Parcial)<br>
 * 
 */
@DisplayName("Config (envio/resposta) interage com ActiveMQ")
@Slf4j
@SpringBootTest
@Import(ActiveMQEmbeddedScanConfig.class)
public class ConfigMessageIT extends IntegrationActiveMQHelper {

    @Test
    @DisplayName("Send Event Message - Resposta do arquivo de configuração")
    void sendConfigRule_default_response() throws SocketException, UnknownHostException {
        // given
        Long countMQ = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MANAGER);
        String send = "CONFIG 1234 V-NOT MESSAGE IN QUEUE";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();
        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);
        // then
        String[] res = response.split(":");
        // MENSAGEM DE RESPOSTA NÃO ENCONTRADA e Cod_modulo
        assertEquals("CONFIG_NOT_FOUND$1234", res[0]);
        // UUID Aleatório com 4 dígitos
        assertTrue(res[1].matches("\\w\\w\\w\\w\\w\\w\\w\\#"));
        // verifica se tem uma mensagem a mais na fila
        assertEquals(countMQ + 1, activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MANAGER));
        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send Config - Consome da fila MESSAGE_TO_MODULE e Confirma recebimento")
    void sendConfigRule_receive_response_confirm() throws SocketException, UnknownHostException {
        // given
        insertMessageToModule();
        // verifica se possui 1 mensagem na fila para consumo. (Bootstrap.InsertMessages)
        Long countMQToModule = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MODULE);
        assertTrue(countMQToModule >= 1);
        // verifica se fila de recebimento está vazia.
        Long countMQToManager = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MANAGER);
        
        String send = "CONFIG 4321 V-GET MESSAGE IN QUEUE";
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
        assertEquals(countMQToManager + 1, activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MANAGER));
        udpConnect.stopClient();
    }

    @Test
    @DisplayName("Send Config Message - Falha ao localizar cod_modulo.")
    void sendConfigRule_invalid_codModulo() throws SocketException, UnknownHostException {
        // given
        Long countMQToManager = activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MANAGER);

        String send = "CONFIG_FAIL K9DB";
        UDPConnectHelper udpConnect = new UDPConnectHelper();
        udpConnect.startClient();
        // when
        String response = udpConnect.sendMessage(send, 9000);
        log.info(response);
        String[] res = response.split(":");
        // then
        // Mensagem de não encontrado.
        assertEquals("$CONFIG_FAIL", res[0]);
        assertEquals("No group 5#", res[1]);
        // UUID Gerado na resposta.

        assertEquals(countMQToManager + 1, activeMQQueueCount(JMSConfigHelper.MESSAGE_TO_MANAGER));
        udpConnect.stopClient();
    }
}
