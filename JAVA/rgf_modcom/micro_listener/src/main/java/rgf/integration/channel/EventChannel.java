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
 * Recebe a mensagem de evento e inclui na fila de recebimento.
 */
@Slf4j
@Service
public class EventChannel {

    // @Autowired
    // private RegexService regexService;
    @Autowired
    private ReceiverService receiveService;

    @Autowired
    private SendMessageService sendMessageService;

    /**
     * Mensagem de evento enviado pelo módulo.<br>
     * Inclui mensagem de evento na fila pra o Receive.<br>
     * Inclui no header se busca por mensagem se find_module="true".
     * 
     * @param message
     * @return MessageBuilder com cabeçalho alterado.
     * @throws MessagingException
     */
    @Transformer(inputChannel = "channel.event.receive", outputChannel = "config.route.findModule")
    public Message<String> receive(Message<String> message) throws MessagingException {
        log.info("###### SEND EVENT ######");
        RuleMessage rule = receiveService.loadRuleMessage(message);
        // Inclui mensagem na fila de EVENTOS.
        sendMessageService.toReceiver(message.getPayload(),rule); 
        // Substitui regras da mensagem.
        return MessageBuilder.fromMessage(message)
                .setHeader("findModule", rule.getListenerMessage().getFindModule())
                .setHeader("ruleMessage", rule).build();
    }
}
