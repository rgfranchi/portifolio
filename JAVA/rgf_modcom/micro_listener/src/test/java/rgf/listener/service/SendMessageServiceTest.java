package rgf.listener.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.UUID;

import javax.jms.JMSException;
import javax.jms.Message;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessagePostProcessor;

import pojo.integration.IntegrationMessage;
import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import rgf.listener.config.JMSConfig;

@DisplayName("Envia mensagem para a fila.")
@ExtendWith(MockitoExtension.class)
public class SendMessageServiceTest {

    IntegrationMessage messageIntegration;

    @Captor
    ArgumentCaptor<MessagePostProcessor> captorPostProcessor;

    @Captor
    ArgumentCaptor<IntegrationMessage> captorMessageIntegration;

    @Spy
    Message spySendMessage;

    @Mock
    JmsTemplate jmsTemplate;

    @InjectMocks
    SendMessageService sendMessageService;

    @BeforeEach
    void setUp() {
        messageIntegration = new IntegrationMessage();
        // messageIntegration.setCodModulo("COD_SEND");
        // messageIntegration.setMessage("MESSAGE SEND");
        messageIntegration.setUuid(UUID.fromString("237e9877-e79b-12d4-a765-321741963000"));
    }

    @Test
    @DisplayName("Verifica mensagem de confirmação para o módulo, utilizando o UUID")
    void testConfirmFromModule() throws JMSException {
        // given
        String uuidConfirm = "237e9877-e79b-12d4-a765-321741963001";
        // when
        sendMessageService.confirmFromModule(messageIntegration, 0L, uuidConfirm);
        // Recupera classe MessagePostProcessor para verificar o método
        // postProcessMessage
        verify(jmsTemplate).convertAndSend(eq(JMSConfig.MESSAGE_TO_MODULE), eq(messageIntegration),
                captorPostProcessor.capture());
        captorPostProcessor.getValue().postProcessMessage(spySendMessage);
        // then
        verify(jmsTemplate, times(1)).setExplicitQosEnabled(true);
        verify(jmsTemplate, times(1)).setExplicitQosEnabled(false);
        verify(jmsTemplate, times(1)).setPriority(1);
        verify(jmsTemplate, times(1)).setPriority(Message.DEFAULT_PRIORITY);

        // verify(spySendMessage).setStringProperty("cod_modulo", messageIntegration.getCodModulo());
        verify(spySendMessage).setStringProperty("uuid_confirm", uuidConfirm);
        verify(spySendMessage).setJMSDeliveryTime(1);
    }

    @Test
    @DisplayName("Envia mensagem para fila escolhida")
    void testSendTo() {
        // given
        String queue = "FILA_MOCK_SEND_TO";
        String message = "MOCK_MESSAGE";
        String cod_modulo = "SEND_COD_MODULO";
        ListenerMessage listenerMessage = ListenerMessage.builder().codModulo(cod_modulo).build();
        RuleMessage ruleMessage = RuleMessage.builder().listenerMessage(listenerMessage).build();

        // when
        sendMessageService.sendTo(queue, message, ruleMessage);
        // then
        defaultAssertSendTo(queue, cod_modulo, message);
    }

    @Test
    @DisplayName("Envia mensagem para fila de quantidades expiradas")
    void testToExpire() {
        // given
        // when
        sendMessageService.toExpire(messageIntegration);
        // then
        verify(jmsTemplate).convertAndSend(eq(JMSConfig.DEFAULT_EXPIRE), captorMessageIntegration.capture());
        assertEquals(messageIntegration, captorMessageIntegration.getValue());
    }

    @Test
    @DisplayName("Envia mensagem para fila MANAGER (configuração)")
    void testToManager() {
        // given
        String message = "MOCK_MANAGER_MESSAGE";
        String cod_modulo = "MANAGER_COD_MODULO";
        ListenerMessage listenerMessage = ListenerMessage.builder().codModulo(cod_modulo).build();
        RuleMessage ruleMessage = RuleMessage.builder().listenerMessage(listenerMessage).build();

        // when
        sendMessageService.toManager(message, ruleMessage);
        // then
        defaultAssertSendTo(JMSConfig.MESSAGE_TO_MANAGER, cod_modulo, message);
    }

    @Test
    @DisplayName("Envia mensagem para fila RECEIVE (ventos)")
    void testToReceiver() {
        // given
        String message = "MOCK_RECEIVE_MESSAGE";
        String cod_modulo = "RECEIVE_COD_MODULO";
        ListenerMessage listenerMessage = ListenerMessage.builder().codModulo(cod_modulo).build();
        RuleMessage ruleMessage = RuleMessage.builder().listenerMessage(listenerMessage).build();

        // when
        sendMessageService.toReceiver(message, ruleMessage);
        // then
        defaultAssertSendTo(JMSConfig.MESSAGE_TO_RECEIVER, cod_modulo, message);
    }

    void defaultAssertSendTo(String queue, String cod_modulo, String message) {
        verify(jmsTemplate).convertAndSend(eq(queue), captorMessageIntegration.capture());
        IntegrationMessage resp = captorMessageIntegration.getValue();
        assertEquals(36, resp.getUuid().toString().length());
        assertEquals(cod_modulo, resp.getRuleMessage().getListenerMessage().getCodModulo());
        assertEquals(message, resp.getMessage());
    }

}
