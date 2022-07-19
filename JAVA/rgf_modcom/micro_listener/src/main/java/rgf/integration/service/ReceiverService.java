package rgf.integration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import pojo.integration.RuleMessage;
import rgf.integration.channel.helper.CommonChannelHelper;

@Slf4j
@Service
public class ReceiverService extends CommonChannelHelper {
    
    @Autowired
    private RegexService regexService;    

    public RuleMessage loadRuleMessage(Message<String> message) {
        // Recebe Mensagem
        String payload_message = message.getPayload();
        // Regras do processo.
        RuleMessage rule = headerRuleMessage(message);
        // busca cod_modulo na mensagem pela expressão regular.
        regexService.regexPatter(rule.getRegex());
        String cod_modulo = rule.getListenerMessage().getCodModulo();
        try {
            cod_modulo = regexService.loadByGroup(payload_message,
                    rule.getListenerMessage().getCodModuleGroup());
        } catch (Exception e) {
            log.error("ERROR:{}", e.getMessage());
            rule.getListenerMessage().setMessageResponse(rule.getListenerMessage().getMessageError());
            rule.getListenerMessage().setReplayPayload(e.getMessage());
            rule.setException("RECEIVE RULE:" + e.getMessage());                    
            rule.getListenerMessage().setFindModule(false);        
        }
        // cod_modulo retirado da mensagem.
        rule.getListenerMessage().setCodModulo(cod_modulo);
        return rule;
    }
}
