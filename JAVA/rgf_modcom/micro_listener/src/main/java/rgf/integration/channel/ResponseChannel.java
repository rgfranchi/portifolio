package rgf.integration.channel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.MessageEndpoint;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;

import lombok.extern.slf4j.Slf4j;
import pojo.integration.RuleMessage;
import rgf.integration.channel.helper.CommonChannelHelper;
import rgf.integration.service.ReplaceServices;

/**
 * Verificar regras no arquivo config/IntegrationConfig.java "headerRouter()"
 */
@Slf4j
@MessageEndpoint
public class ResponseChannel extends CommonChannelHelper {

    @Autowired
    private ReplaceServices replaceServices;

    /**
     * Responde com valor de confirmação.
     * Chave: text
     * 
     * @param message
     * @return
     * @throws MessagingException
     */
    @ServiceActivator(inputChannel = "channel.response.keep_alive")
    public String keepAlive(Message<String> message) throws MessagingException {
        RuleMessage rule = headerRuleMessage(message);
        String newMessage = rule.getListenerMessage().getMessageResponse();
        log.info(">>> Response keepAlive: {} -> {}", message.getPayload(), newMessage);
        return newMessage;
    }

    /**
     * Reponde data e hora atual do servidor.
     * Formato da data_hora:
     * https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/format/DateTimeFormatter.html
     * Obs: Utiliza objeto com valores da data.
     * 
     * @param message
     * @return
     * @throws MessagingException
     */
    @ServiceActivator(inputChannel = "channel.response.date_time")
    public String dateTime(Message<String> message) throws MessagingException {
        RuleMessage rule = headerRuleMessage(message);
        String newMessage = replaceServices.dateTime(rule.getListenerMessage().getMessageResponse(),
                rule.getListenerMessage());
        log.info(">>> Response dateTime: {} -> {}", message.getPayload(), newMessage);
        return newMessage;
    }

    /**
     * Substitui TAGS nas string text.
     * 
     * @param message
     * @return
     * @throws MessagingException
     */
    @ServiceActivator(inputChannel = "channel.response.text")
    public String text(Message<String> message) throws MessagingException {
        RuleMessage rule = headerRuleMessage(message);
        String newMessage = replaceServices.verifyReplaces(rule.getListenerMessage(), message.getPayload().toString());
        log.info(">>> Response text: {} -> {}", message.getPayload(), newMessage);
        return newMessage;
    }

    /**
     * Responde a uma mensagem não definida.
     * 
     * @param message
     * @return
     * @throws MessagingException
     */
    @ServiceActivator(inputChannel = "channel.response.not_defined")
    public String notDefined(Message<String> message) throws MessagingException {
        log.info(">>> Response notDefined: {}", message.getPayload().toString());
        return String.format("RULE NOT DEFINED:%s", message.getPayload().toString());
    }
}
