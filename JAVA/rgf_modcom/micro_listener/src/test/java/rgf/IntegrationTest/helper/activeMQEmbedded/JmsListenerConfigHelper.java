package rgf.IntegrationTest.helper.activeMQEmbedded;

import org.apache.activemq.artemis.jms.client.ActiveMQConnectionFactory;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.annotation.JmsListenerConfigurer;
import org.springframework.jms.config.JmsListenerEndpointRegistrar;
import org.springframework.jms.config.JmsListenerEndpointRegistry;
import org.springframework.jms.config.SimpleJmsListenerContainerFactory;

/**
 * Configura o JMSListener para conexão com ActiveMQEmbedded<br>
 * É necessário uma conexão ativa<br>
 * Este exemplo deve instanciar o ActiveMQServerTest.class ANTES.
 * Utilizar -> @SpringJUnitConfig(classes = { JmsListenerFactoryHelper.class })
 * --- Referência de configuração do JMS
 * https://codenotfound.com/spring-jms-listener-example.html
 * https://github.com/code-not-found/spring-jms/tree/master/spring-jms-listener
 */
@TestConfiguration
@EnableJms
public class JmsListenerConfigHelper implements JmsListenerConfigurer {

    /**
     * Realiza conexão com servidor.
     * 
     * @return
     */
    @Bean
    @Primary
    public ActiveMQConnectionFactory connectionFactoryEmbeddedMQ() {
        ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory(
                ActiveMQEmbeddedServerHelper.ACCEPTOR);
        return activeMQConnectionFactory;
    }

    /**
     * Construtor da conexão simplificada<br>
     * Utilizar o jmsListenerContainerFactory como padrão<br>
     * ou incluir no @JmsListener containerFactory = "nomeDoConteinerFactory")
     * 
     * @return
     */
    @Bean
    @Primary
    public SimpleJmsListenerContainerFactory jmsListenerContainerFactoryEmbeddedMQ() {
        SimpleJmsListenerContainerFactory factory = new SimpleJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactoryEmbeddedMQ());
        return factory;
    }

    @Bean
    public JmsListenerEndpointRegistry jmsListenerEndpoint() {
        return new JmsListenerEndpointRegistry();
    }

    @Override
    public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
        registrar.setEndpointRegistry(jmsListenerEndpoint());
    }

    // @Bean
    // public DefaultJmsListenerContainerFactory jmsListenerContainerFactory() {
    // DefaultJmsListenerContainerFactory factory = new
    // DefaultJmsListenerContainerFactory();
    // factory.setConnectionFactory(activeMQconnectionFactory());
    // factory.setConcurrency("3-10");
    // return factory;
    // }

}
