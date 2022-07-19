package rgf.integration.config;

import org.springframework.integration.annotation.Gateway;
import org.springframework.integration.annotation.MessagingGateway;

@MessagingGateway
public interface GatewayConfig {
    @Gateway(requestChannel = "channel.collect.process")
    public String process(String message);
}
