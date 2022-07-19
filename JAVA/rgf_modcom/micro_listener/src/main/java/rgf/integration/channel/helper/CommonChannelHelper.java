package rgf.integration.channel.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import pojo.integration.RuleMessage;
// import rgf.integration.domain.RuleMessage;
import rgf.integration.service.JsonService;

public class CommonChannelHelper {

    @Autowired
    protected JsonService jsonService;

    /**
     * Carrega chave ruleMessage do header da mensagem.
     * 
     * @param message Mensagem com header ruleMessage
     * @return RuleMessage preenchido.
     */
    public RuleMessage headerRuleMessage(Message<String> message) {
        return (RuleMessage) message.getHeaders().get("ruleMessage");
    }


    
}
