package rgf.listener.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.BDDMockito.given;

import javax.jms.JMSException;
import javax.jms.Message;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.support.converter.MessageConversionException;
import org.springframework.jms.support.converter.MessageConverter;

import pojo.integration.IntegrationMessage;
import rgf.listener.config.JMSConfig;

@DisplayName("Recebe mensagem da fila.")
@ExtendWith(MockitoExtension.class)
public class ReceiveMessageServiceTest {

    IntegrationMessage messageIntegration;

    @Mock
    Message message;

    @Mock
    JmsTemplate jmsTemplate;

    @Mock
    MessageConverter messageConverter;

    @InjectMocks
    ReceiveMessageService receiveMessageService;

    @BeforeEach
    void setUp() throws JMSException {
        messageIntegration = new IntegrationMessage();
    }

    @Test
    @DisplayName("Mensagem localizada e PRIMEIRA tentativa de entrega.")
    void testFindToModule_found() throws MessageConversionException, JMSException {
        // given
        String findQuery = "cod_modulo='XPTO123'";
        given(jmsTemplate.receiveSelected(JMSConfig.MESSAGE_TO_MODULE, findQuery)).willReturn(message);
        given(messageConverter.fromMessage(message)).willReturn(messageIntegration);
        // when
        IntegrationMessage resp = receiveMessageService.findToModule(findQuery);
        // then
        assertEquals(messageIntegration, resp);
        assertEquals(0L, receiveMessageService.getDeliveryTimes());
    }

    @Test
    @DisplayName("Mensagem NÃO localizada e PRIMEIRA tentativa de entrega.")
    void testFindToModule_not_found() throws MessageConversionException, JMSException {
        // given
        String findQuery = "cod_modulo='XPTO123'";
        // messageIntegration.setMessage("RESPONSE MESSAGE NOT FIND");

        given(jmsTemplate.receiveSelected(JMSConfig.MESSAGE_TO_MODULE, findQuery)).willReturn(null);
        // when
        IntegrationMessage resp = receiveMessageService.findToModule(findQuery);
        // then
        assertNull(resp);
        assertEquals(0L, receiveMessageService.getDeliveryTimes());
    }

    @Test
    @DisplayName("Mensagem localizada e PRIMEIRA tentativa de entrega.")
    void testFindToModule_found_deliveryTime() throws MessageConversionException, JMSException {
        // given
        String findQuery = "cod_modulo='XPTO123'";
        // messageIntegration.setMessage("RESPONSE MESSAGE OK");
        given(message.getJMSDeliveryTime()).willReturn(10L);
        given(jmsTemplate.receiveSelected(JMSConfig.MESSAGE_TO_MODULE, findQuery)).willReturn(message);
        given(messageConverter.fromMessage(message)).willReturn(messageIntegration);
        // when
        IntegrationMessage resp = receiveMessageService.findToModule(findQuery);
        // then
        assertEquals(messageIntegration, resp);
        assertEquals(10L, receiveMessageService.getDeliveryTimes());
    }

}
