package rgf.integration.channel;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.Transformer;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import pojo.integration.IntegrationMessage;
import pojo.integration.RuleMessage;
import rgf.integration.channel.helper.CommonChannelHelper;
import rgf.integration.service.RegexService;
import rgf.listener.service.ReceiveMessageService;
import rgf.listener.service.SendMessageService;

/**
 * Realiza buscas na fila por mensagem para o módulo nova ou confirmação.
 */
@Slf4j
@Service
public class ModuleChannel extends CommonChannelHelper {

    @Autowired
    private RegexService regexService;

    @Autowired
    private ReceiveMessageService receiveMessageService;

    @Autowired
    private SendMessageService sendMessageService;

    /**
     * Type: TypeListenerMessage.CONFIRM
     * Confirma recebimento da mensagem utilizando uuid (uuid_confirm)<br>
     * Inclui no header a busca por mensagem SE find_module="true".<br>
     * Se confirmada a mensagem retorna no header: codModulo e messageResponse
     * Se não confirmada a mensagem retorna no header: messageNotFound
     * 
     * @param message
     * @return
     * @throws MessagingException
     */
    @Transformer(inputChannel = "channel.module.confirm", outputChannel = "config.route.findModule")
    public Message<String> messageConfirm(Message<String> message) throws MessagingException {
        // Recebe Mensagem
        String payload = message.getPayload();
        // carrega regras do processo
        RuleMessage rule = headerRuleMessage(message);
        // busca código UUID de confirmação.
        regexService.regexPatter(rule.getRegex());
        String uuid_confirm = "";
        try {
            uuid_confirm = regexService.loadByGroup(payload, rule.getListenerMessage().getUuidConfirmGroup());
            
            String messageSelector = String.format("uuid_confirm='%s'", uuid_confirm);
            // Consome mensagem de confirmação.
            IntegrationMessage messagePayload = receiveMessageService.findToModule(messageSelector);
            // Não localizou confirmação responde com MessageNotFound.
            if (messagePayload == null) {
                rule.getListenerMessage().setMessageResponse(rule.getListenerMessage().getMessageNotFound());
            } else {
                rule.getListenerMessage().setReplayPayload(messagePayload.getMessage()); 
            }            
        } catch (Exception e) {
            log.error("ERROR:{}", e.getMessage());
            rule.getListenerMessage().setMessageResponse(rule.getListenerMessage().getMessageError());
            rule.getListenerMessage().setReplayPayload(e.getMessage());
            rule.getListenerMessage().setFindModule(false);        
            rule.setException("MESSAGE CONFIRM:" + e.getMessage());   
        }

        return MessageBuilder.fromMessage(message)
                .setHeader("findModule", rule.getListenerMessage().getFindModule())
                .setHeader("ruleMessage", rule)
                .build();
    }

    /**
     * Busca mensagem na fila do modulo para resposta.<br>
     * Mensagem para confirmação Process "confirm_times" maior que zero.<br>
     * Executa operação Regex para localizar cod_modulo
     * 
     * @param message
     * @return
     * @throws MessagingException
     */
    @Transformer(inputChannel = "channel.module.find", outputChannel = "channel.response.text")
    public Message<String> eventFind(Message<String> message) throws MessagingException {
        log.info("###### FIND EVENT ######");
        // carrega regras do processo
        RuleMessage rule = headerRuleMessage(message);
        String messageSelector = String.format("cod_modulo='%s'", rule.getListenerMessage().getCodModulo());
        Long confirmTimes = rule.getListenerMessage().getConfirmTimes();

        String uuid_confirm = UUID.randomUUID().toString();
        if (rule.getListenerMessage().getUuidLength() > 0) {
            uuid_confirm = uuid_confirm.substring(uuid_confirm.length() - rule.getListenerMessage().getUuidLength());
        }
        rule.getListenerMessage().setUuidConfirm(uuid_confirm);

        // Busca mensagem para o módulo.
        IntegrationMessage messageIntegration = receiveMessageService.findToModule(messageSelector);
        if (messageIntegration != null) {
            // inclui mensagem nas regras para resposta.
            rule.getListenerMessage().setReplayPayload(messageIntegration.getMessage());
            // verifica limite de confirmações da mensagem
            if (confirmTimes != 0) {
                Long deliveryTime = receiveMessageService.getDeliveryTimes();
                if (deliveryTime <= confirmTimes) {
                    sendMessageService.confirmFromModule(messageIntegration, deliveryTime, uuid_confirm);
                } else {
                    sendMessageService.toExpire(messageIntegration);
                }
            }
        } else {
            // mensagem não localizada.
            rule.getListenerMessage().setMessageResponse(rule.getListenerMessage().getMessageNotFound());
        }

        // Retorna mensagem original com as regras alteradas.
        return MessageBuilder.fromMessage(message)
                .setHeader("ruleMessage", rule)
                .build();
    }

}
