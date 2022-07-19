package rgf.integration.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.router.HeaderValueRouter;

import lombok.extern.slf4j.Slf4j;
// import rgf.integration.domain.TypeListenerMessage;
import pojo.integration.TypeListenerMessage;

@Slf4j
@Configuration
public class RouteConfig {
    /**
     * verifica o tipo de evento e direciona para rota especifica.
     * 
     * @return§§
     */
    @Bean
    @ServiceActivator(inputChannel = "config.route.typeMessage")
    public HeaderValueRouter actionMessage() {
        log.info("###### routerMessage ROUTER MESSAGE ######");
        HeaderValueRouter router = new HeaderValueRouter("typeMessage");

        // rotas de resposta direta
        router.setChannelMapping(TypeListenerMessage.KEEP_ALIVE.toString(), "channel.response.keep_alive");
        router.setChannelMapping(TypeListenerMessage.DATE_TIME.toString(), "channel.response.date_time");
        router.setChannelMapping(TypeListenerMessage.TEXT.toString(), "channel.response.text");
        // se não for definido uma rota.
        router.setChannelMapping(TypeListenerMessage.NOT_DEFINED.toString(), "channel.response.not_defined");
        // se a mensagem enviada depender serviço.
        router.setChannelMapping(TypeListenerMessage.EVENT.toString(), "channel.event.receive");
        router.setChannelMapping(TypeListenerMessage.CONFIRM.toString(), "channel.module.confirm");
        router.setChannelMapping(TypeListenerMessage.CONFIG.toString(), "channel.manager.receive");

        return router;
    }

    /**
     * Busca ou não resposta para o módulo.
     * 
     * @return
     */
    @Bean
    @ServiceActivator(inputChannel = "config.route.findModule")
    public HeaderValueRouter findModule() {
        HeaderValueRouter router = new HeaderValueRouter("findModule");

        router.setChannelMapping("true", "channel.module.find");
        router.setChannelMapping("false", "channel.response.text");

        return router;
    }
}
