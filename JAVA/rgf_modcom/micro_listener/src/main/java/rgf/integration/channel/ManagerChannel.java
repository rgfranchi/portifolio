package rgf.integration.channel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.Transformer;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import pojo.integration.RuleMessage;
import rgf.integration.service.ReceiverService;
import rgf.listener.service.SendMessageService;

/**
 * Mensagem de configuração enviada pelo módulo.<br>
 * Inclui mensagem de evento na fila pra o servidor Manager.<br>
 * 
 */
@Slf4j
@Service
public class ManagerChannel {

    @Autowired
    private ReceiverService receiveService;

    @Autowired
    private SendMessageService sendMessageService;

    /**
     * Envia mensagem para o servidor de configuração.
     * 
     * @param message
     * @return
     * @throws MessagingException
     */
    @Transformer(inputChannel = "channel.manager.receive", outputChannel = "config.route.findModule")
    public Message<String> receive(Message<String> message) throws MessagingException {
        log.info("###### SEND MANAGER ######"); 
        RuleMessage rule = receiveService.loadRuleMessage(message);

        // Inclui mensagem na fila de CONFIGURAÇÃO (Manager).
        sendMessageService.toManager(message.getPayload(), rule);

        return MessageBuilder.fromMessage(message)
                .setHeader("findModule", rule.getListenerMessage().getFindModule()) // utiliza rota para busca do
                .setHeader("ruleMessage", rule)
                .build();
    }
}
