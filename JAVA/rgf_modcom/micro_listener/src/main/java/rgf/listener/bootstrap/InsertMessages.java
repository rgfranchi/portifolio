package rgf.listener.bootstrap;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import pojo.integration.IntegrationMessage;
import rgf.listener.config.JMSConfig;

@Component
public class InsertMessages implements ApplicationRunner {

    @Autowired
    private JmsTemplate jmsTemplate;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        // insere uma mensagem para busca.
        IntegrationMessage mi1 = new IntegrationMessage();
        mi1.setUuid(UUID.randomUUID());
        mi1.setMessage("MENSAGEM TO MODULE 5432");
        mi1.getRuleMessage().getListenerMessage().setCodModulo("5432");
        jmsTemplate.convertAndSend(JMSConfig.MESSAGE_TO_MODULE, mi1, object -> {
            object.setStringProperty("cod_modulo", mi1.getRuleMessage().getListenerMessage().getCodModulo());
            return object;
        }); 

        // IntegrationMessage mi2 = new IntegrationMessage();
        // mi2.setUuid(UUID.randomUUID());
        // mi2.setMessage("MENSAGEM BOOTSTRAP TESTE");
        // mi2.setMessageSelector("4321"); 
        // jmsTemplate.convertAndSend(JMSConfig.MESSAGE_TO_MODULE, mi2, object -> {
        //     object.setStringProperty("cod_modulo", mi2.getMessageSelector());
        //     return object;
        // });

        // IntegrationMessage mi3 = new IntegrationMessage();
        // mi3.setUuid(UUID.randomUUID());
        // mi3.getRuleMessage().getListenerMessage().setCodModulo("123_TESTE");
        // mi3.getRuleMessage().getListenerMessage().setMessageResponse("MENSAGEM DE TESTE");
        // jmsTemplate.setExplicitQosEnabled(true);
        // jmsTemplate.setPriority(1); // Quanto maior a prioridade primeiro será consumido.
        // jmsTemplate.convertAndSend(JMSConfig.MESSAGE_TO_MODULE, mi3, object -> {
        //     object.setStringProperty("cod_modulo", "1234");
        //     object.setStringProperty("uuid_confirm", "a1b2");
        //     return object;
        // });
        // jmsTemplate.setPriority(Message.DEFAULT_PRIORITY);
        // jmsTemplate.setExplicitQosEnabled(false);
    }

}
