package rgf.receive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import pojo.integration.IntegrationMessage;
import rgf.config.JMSConfig;
import rgf.service.ListenerFromService;

@Slf4j
@Component
public class ListenerJMS {
    
    @Autowired
    ListenerFromService listenerFromService;

    @JmsListener(destination = JMSConfig.MESSAGE_TO_RECEIVER)
    public void fromListener(@Payload IntegrationMessage integrationMessage, @Headers MessageHeaders messageHeaders) {

        listenerFromService.loadRuleEvent(integrationMessage);

        log.info(integrationMessage.toString());
    }

}
