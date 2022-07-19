package rgf.integration.config;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.integration.router.HeaderValueRouter;

import pojo.integration.TypeListenerMessage;

public class RouteConfigTest {

    RouteConfig routeConfig;

    @BeforeEach
    void setUp() {
        routeConfig = new RouteConfig();
    }

    /**
     * Variável configurada no parâmetro 'action' do arquivo json.
     */
    @Test
    @DisplayName("Verifica as possíveis rotas do sistema para o header 'actionMessage'")
    void testActionMessage() {
        // given
        // when
        HeaderValueRouter hvr = routeConfig.actionMessage();
        Map<String, String> mapRules = hvr.getChannelMappings();
        // then
        assertEquals("channel.response.keep_alive", mapRules.get(TypeListenerMessage.KEEP_ALIVE.toString()));
        assertEquals("channel.response.date_time", mapRules.get(TypeListenerMessage.DATE_TIME.toString()));
        assertEquals("channel.response.text", mapRules.get(TypeListenerMessage.TEXT.toString()));
        assertEquals("channel.response.not_defined", mapRules.get(TypeListenerMessage.NOT_DEFINED.toString()));
        assertEquals("channel.event.receive", mapRules.get(TypeListenerMessage.EVENT.toString()));
        assertEquals("channel.module.confirm", mapRules.get(TypeListenerMessage.CONFIRM.toString()));
        assertEquals("channel.manager.receive", mapRules.get(TypeListenerMessage.CONFIG.toString()));
    }

    /**
     * Variável configurada no parâmetro 'process: { find_module:true/false }' do
     * arquivo json.
     */
    @Test
    void testFindModule() {
        // given
        // when
        HeaderValueRouter hvr = routeConfig.findModule();
        Map<String, String> mapRules = hvr.getChannelMappings();
        // then
        assertEquals("channel.module.find", mapRules.get("true"));
        assertEquals("channel.response.text", mapRules.get("false"));
    }
}
