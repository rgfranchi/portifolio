package jms;

import javax.jms.ConnectionFactory;
import org.apache.activemq.artemis.jms.client.ActiveMQConnectionFactory;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerEndpointRegistry;

/**
 * configurações do JMS.
 * inicializar servidor, verificar na pasta Documentos, projeto principal.
 * Obs: Incluir @Configuration e @EnableJms na classe que estende a configuração.
 */
public class JmsListenerBaseConfig  {

    public static final String ACCEPTOR = "tcp://localhost:61616"; // "vm://0";

    @Bean
    ActiveMQConnectionFactory connectionFactory() {
        System.out.println("------------- connectionFactory -------------");
        ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory(ACCEPTOR);
        activeMQConnectionFactory.setUser("xxxx");
        activeMQConnectionFactory.setPassword("xxxx");
        return activeMQConnectionFactory;
    }

    /**
     * Utiliza a conversão com objeto @Payload de @JmsListener.<br>
     * Conexão default
     * 
     * @param connectionFactory
     * @param configurer
     * @return
     */
    @Bean
    JmsListenerContainerFactory<?> jmsListenerContainerFactory(ConnectionFactory connectionFactory,
                            DefaultJmsListenerContainerFactoryConfigurer configurer) {
        System.out.println("------------- jmsListenerContainerFactory -------------");                                
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        configurer.configure(factory, connectionFactory);
        // You could still override some of Boot's default if necessary.
        return factory;
    }

    /**
     * NÃO realiza a conversão com objeto @Payload de @JmsListener.<br>
     * @param connectionFactory
     * @param configurer
     * @return
     */
    // @Bean
    // SimpleJmsListenerContainerFactory simpleJmsListenerContainerFactory() {
    //     System.out.println("------------- jmsListenerContainerFactory -------------"); 
    //     SimpleJmsListenerContainerFactory factory = new SimpleJmsListenerContainerFactory();
    //     factory.setConnectionFactory(connectionFactory());
    //     return factory;
    // }

    @Bean
    public JmsListenerEndpointRegistry jmsListenerEndpoint() {
        return new JmsListenerEndpointRegistry();
    }

    // @Override
    // public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
    //     registrar.setEndpointRegistry(jmsListenerEndpoint());
    // }
}
