package rgf.listener.service;

import java.util.UUID;

import javax.jms.JMSException;
import javax.jms.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessagePostProcessor;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import pojo.integration.IntegrationMessage;
import pojo.integration.RuleMessage;
import rgf.listener.config.JMSConfig;

@Slf4j
@Service
public class SendMessageService {

    @Autowired
    private JmsTemplate jmsTemplate;

    /**
     * Envia mensagem para a fila de RECEBIMENTO DO EVENTO.
     * 
     * @param cod_modulo
     * @param message
     */
    public void toReceiver(String payload_message, RuleMessage ruleMessage) {
        sendTo(JMSConfig.MESSAGE_TO_RECEIVER, payload_message, ruleMessage);
    }

    /**
     * Envia mensagem para a fila de RECEBIMENTO DA CONFIGURAÇÃO.
     * 
     * @param cod_modulo
     * @param message
     */
    public void toManager(String payload_message, RuleMessage ruleMessage) {
        sendTo(JMSConfig.MESSAGE_TO_MANAGER, payload_message, ruleMessage);
    }

    /**
     * Envia mensagem para fila.
     * 
     * @param queue
     * @param cod_modulo
     * @param message
     */
    public void sendTo(String queue, String payload_message, RuleMessage ruleMessage) {
        try {
            IntegrationMessage messageIntegration = new IntegrationMessage();
            messageIntegration.setUuid(UUID.randomUUID());
            messageIntegration.setMessage(payload_message);
            messageIntegration.setRuleMessage(ruleMessage);
            jmsTemplate.convertAndSend(queue, messageIntegration);
        } catch (Exception e) {
            log.error("### FALHA AO ADICIONAR MENSAGEM NA FILA {}", e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Confirma o recebimento da mensagem reincluindo a mensagem com menor
     * prioridade.
     * Adiciona 1 a quantidade de tentativas.
     * 
     * @param messageIntegration mensagem a ser confirmada.
     * @param deliveryTime       tentativas de entregas.
     * @param uuid_confirm       do codigo de confirmação da mensagem uuid
     *                           aleatório.
     */
    public void confirmFromModule(IntegrationMessage messageIntegration, Long deliveryTime, String uuid_confirm) {
        try {
            jmsTemplate.setExplicitQosEnabled(true);
            jmsTemplate.setPriority(1); // Quanto maior a prioridade primeiro será consumido.
            jmsTemplate.convertAndSend(JMSConfig.MESSAGE_TO_MODULE, messageIntegration, new MessagePostProcessor() {
                @Override
                public Message postProcessMessage(Message message) throws JMSException {
                    message.setJMSDeliveryTime(deliveryTime + 1);
                    // message.setJMSPriority(1);
                    message.setStringProperty("cod_modulo", messageIntegration.getRuleMessage().getListenerMessage().getCodModulo());
                    message.setStringProperty("uuid_confirm", uuid_confirm);
                    return message;
                }
            });
        } catch (Exception e) {
            log.error("### FALHA AO ADICIONAR MENSAGEM A FILA DE CONFIRMAÇÃO {}", e.getMessage());
            e.printStackTrace();
        } finally {
            jmsTemplate.setPriority(Message.DEFAULT_PRIORITY);
            jmsTemplate.setExplicitQosEnabled(false);
        }
    }

    /**
     * Inclui mensagem na fila de expirados.
     * 
     * @param messageIntegration
     */
    public void toExpire(IntegrationMessage messageIntegration) {
        try {
            jmsTemplate.convertAndSend(JMSConfig.DEFAULT_EXPIRE, messageIntegration);
        } catch (Exception e) {
            log.error("### FALHA AO ADICIONAR MENSAGEM A FILA DE EXPIRADA {}", e.getMessage());
            e.printStackTrace();
        }
    }

}
