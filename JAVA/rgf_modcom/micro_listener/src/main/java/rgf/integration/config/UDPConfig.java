package rgf.integration.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.annotation.Transformer;
import org.springframework.integration.ip.udp.UnicastReceivingChannelAdapter;
import org.springframework.integration.ip.udp.UnicastSendingMessageHandler;
import org.springframework.integration.transformer.HeaderEnricher;
import org.springframework.integration.transformer.support.HeaderValueMessageProcessor;
import org.springframework.integration.transformer.support.StaticHeaderValueMessageProcessor;
import org.springframework.messaging.Message;

/**
 * Exemplo de configuração UDP.
 * A configuração de conexão deve definir o arquivo que será utilizado como
 * regra e inserir no cabeçalho da mensagem .
 */
@Configuration
public class UDPConfig {

    Integer udpPort = 9000;
    String fileJsonRules = "";

    /**
     * Define no Header qual o arquivo estão as regras do processo.<br>
     * Utiliza a porta como padrão.
     * 
     * @return
     */
    @Bean
    public UnicastReceivingChannelAdapter unicastReceivingChannelAdapter() {
        System.out.println("------------------------------ LOAD: unicastReceivingChannelAdapter");
        UnicastReceivingChannelAdapter adapter = new UnicastReceivingChannelAdapter(udpPort);
        adapter.setOutputChannelName("config.udp.process");
        fileJsonRules = Integer.toString(adapter.getPort());
        // adapter.setErrorChannelName("service.error");
        return adapter;
    }

    /**
     * Resposta UDP.
     * Inclui nome do arquivo com as regras.
     */
    @Bean
    @Transformer(inputChannel = "config.udp.process", outputChannel = "channel.collect.process")
    public HeaderEnricher configTypeReply() {
        Map<String, HeaderValueMessageProcessor<String>> headersAdd = new HashMap<>();
        headersAdd.put("replyChannel",
                new StaticHeaderValueMessageProcessor<String>("config.udp.replay"));
        headersAdd.put("fileJsonRules",
                new StaticHeaderValueMessageProcessor<String>(fileJsonRules));
        HeaderEnricher enricher = new HeaderEnricher(headersAdd);
        return enricher;
    }

    @Bean
    public UnicastSendingMessageHandler unicastSendingMessageHandler() {
        UnicastSendingMessageHandler handler = new UnicastSendingMessageHandler("headers['ip_packetAddress']");
        handler.setSocketExpressionString("@unicastReceivingChannelAdapter.socket");
        return handler;
    }

    @ServiceActivator(inputChannel = "config.udp.replay")
    public void replay(Message<String> message) {
        unicastSendingMessageHandler().handleMessage(message);
    }

}
