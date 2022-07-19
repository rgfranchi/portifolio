package rgf.listener.service;

import javax.jms.JMSException;
import javax.jms.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import pojo.integration.IntegrationMessage;
import rgf.listener.config.JMSConfig;

@Slf4j
@Service
public class ReceiveMessageService {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    MessageConverter messageConverter;

    private Long jmsDeliveryTime;

    /**
     * Busca por mensagem para o módulo.
     * @param messageSelector
     * @return
     */
    public IntegrationMessage findToModule(String messageSelector) {
        try {
            jmsDeliveryTime = 0L;
            jmsTemplate.setReceiveTimeout(JmsTemplate.RECEIVE_TIMEOUT_NO_WAIT);
            Message message = jmsTemplate.receiveSelected(JMSConfig.MESSAGE_TO_MODULE, messageSelector);
            if (message != null) {
                jmsDeliveryTime = message.getJMSDeliveryTime();
                return (IntegrationMessage) messageConverter.fromMessage(message);
            }
        } catch (JMSException e) {
            log.error("### FALHA AO RECEBER MENSAGEM {}", e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public Long getDeliveryTimes() {
        return jmsDeliveryTime;
    }

}
