package rgf.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rgf.integration.config.GatewayConfig;

@RestController
@RequestMapping("integration")
public class IntegrationController {

    @Autowired
    GatewayConfig gatewayConfig;

    @GetMapping(value = "{message}", produces = { "text/plain;charset=UTF-8" })
    public String getMessageForIntegrate(@PathVariable("message") String message) {
        System.out.println("#### getMessageForIntegrate #### : " + message);
        // integrationGateway.process(message);
        // System.out.println(integrationGateway.response());
        System.out.println("#### Response ####");
        return gatewayConfig.process(message);
    }

}
