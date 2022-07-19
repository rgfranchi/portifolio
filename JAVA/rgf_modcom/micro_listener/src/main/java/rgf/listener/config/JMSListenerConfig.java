package rgf.listener.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.annotation.JmsListenerConfigurer;
import org.springframework.jms.config.JmsListenerEndpointRegistrar;
import jms.JmsListenerBaseConfig;

/**
 * configurações do JMS.
 * inicializar servidor, verificar na pasta Documentos, projeto principal.<br>
 * Deve utilizar o implements JmsListenerConfigurer<br>
 */
@Configuration
@EnableJms
public class JMSListenerConfig extends JmsListenerBaseConfig implements JmsListenerConfigurer {
    @Override
    public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
        registrar.setEndpointRegistry(jmsListenerEndpoint());
    }    
}