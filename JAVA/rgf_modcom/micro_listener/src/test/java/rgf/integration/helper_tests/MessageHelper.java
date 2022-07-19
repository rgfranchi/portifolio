package rgf.integration.helper_tests;

import java.util.HashMap;
import java.util.Map;

import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.Message;

import pojo.integration.RuleMessage;

public class MessageHelper {
    public Message<String> createObjMessage(String strMessage, Map<String, Object> mapHeader) {
        return MessageBuilder.withPayload(strMessage).copyHeaders(mapHeader).build();
    }

    public Message<String> createObjMessage(String strMessage, RuleMessage ruleMessage) {
        return MessageBuilder.withPayload(strMessage).copyHeaders(new HashMap<String, Object>() {
            {
                put("ruleMessage", ruleMessage);
            }
        }).build();
    }
}
