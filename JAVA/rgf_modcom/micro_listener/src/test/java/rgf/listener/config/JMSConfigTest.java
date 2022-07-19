package rgf.listener.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.jms.support.converter.MappingJackson2MessageConverter;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.jms.support.converter.MessageType;

import pojo.integration.IntegrationMessage;

//  @ExtendWith(MockitoExtension.class)
public class JMSConfigTest {
    @Test
    void testMessageConverter() throws JsonProcessingException {
        // given
        JMSConfig jmsConfig = new JMSConfig();
        IntegrationMessage messageIntegration = new IntegrationMessage();
        // messageIntegration.setCodModulo("COD_MAPPER");
        // messageIntegration.setMessage("MESSAGE_MAPPER");
        messageIntegration.setUuid(UUID.randomUUID());

        // constrói object mapper para conversão.
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValueAsString(messageIntegration);

        // objeto esperado de resposta.
        MappingJackson2MessageConverter expectedResponse = new MappingJackson2MessageConverter();
        expectedResponse.setTargetType(MessageType.TEXT);
        expectedResponse.setTypeIdPropertyName("_type");
        expectedResponse.setObjectMapper(objectMapper);

        // when
        // messageConverter = jmsConfig.messageConverter(objectMapper);
        MessageConverter response = jmsConfig.messageConverter(objectMapper);

        // then
        // verifica o tipo de classe
        assertThat(response).isExactlyInstanceOf(MappingJackson2MessageConverter.class);
        assertThat(response).usingRecursiveComparison().isEqualTo(expectedResponse);
    }
}
