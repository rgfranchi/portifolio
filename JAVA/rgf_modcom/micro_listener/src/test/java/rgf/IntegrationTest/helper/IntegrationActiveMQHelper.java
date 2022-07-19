package rgf.IntegrationTest.helper;

import java.util.UUID;
import org.apache.activemq.artemis.api.core.SimpleString;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import pojo.integration.IntegrationMessage;
import rgf.IntegrationTest.helper.activeMQEmbedded.ActiveMQEmbeddedServerHelper;

public class IntegrationActiveMQHelper {
    
    @Autowired
    public JmsTemplate jmsTemplate;

    @BeforeAll
    public static void beforeAll() throws Exception {
        if(ActiveMQEmbeddedServerHelper.activeMQServer() != null && !ActiveMQEmbeddedServerHelper.activeMQServer().isStarted()) {
            ActiveMQEmbeddedServerHelper.activeMQServer().start();
        }
    }

    @AfterAll
    public static void afterAll() throws Exception {
        ActiveMQEmbeddedServerHelper.activeMQServer().stop();
    }
    
    public Long activeMQQueueCount(String queueName) {
        Long ret = 0L;
        try {
            ret = ActiveMQEmbeddedServerHelper.activeMQServer().queueQuery(new SimpleString(queueName)).getMessageCount();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ret;
    }

    public void insertMessageToModule() {
        IntegrationMessage mi = new IntegrationMessage();
        mi.setUuid(UUID.randomUUID());
        mi.setMessage("MENSAGEM BOOTSTRAP TESTE");
        mi.setMessageSelector("4321"); 
        jmsTemplate.convertAndSend(JMSConfigHelper.MESSAGE_TO_MODULE, mi, object -> {
            object.setStringProperty("cod_modulo", mi.getMessageSelector());
            return object;
        }); 
    }

}
