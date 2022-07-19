package rgf.integration.channel;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.Message;
import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import rgf.integration.helper_tests.MessageHelper;
import rgf.integration.service.ReceiverService;
import rgf.listener.service.SendMessageService;

@DisplayName("Insere mensagens na fila de configuração 'sendMessageService'")
@ExtendWith(MockitoExtension.class)
public class ManagerChannelTest extends MessageHelper {

        @Mock
        SendMessageService sendMessageService;

        @Mock
        ReceiverService receiveService;

        @InjectMocks
        ManagerChannel managerChannel;

        Message<String> message;
        String cod_modulo;
        String regex;
        Integer group;        
        String rule_send;
        String rule_return;
        String send_message;
        RuleMessage givenRuleMessage;
        ListenerMessage givenListenerMessage;

        Map<String, Object> setProcess;

        @BeforeEach
        void setUp() {
                givenRuleMessage = RuleMessage.builder().build();
                givenListenerMessage = ListenerMessage.builder().build();
                cod_modulo = "COD_FAKE_0001";
                regex = "(CONFIG.)([0-9A-Z_]*)";
                group = 2;
                send_message = "CONFIG COD_MODULO 2022-01-02: Mensagem Teste de configuração";
        }

        @Test
        @DisplayName("Receive NÃO busca resposta e retorna cod_modulo")
        void testReceive_default() {
                // given
                this.givenListenerMessage.setFindModule(false); // default is false.
                givenFind_module();
                // when
                Message<String> response = managerChannel.receive(this.message);
                // then
                thenResponse(response);
                // resposta esperada de busca "false"
                assertEquals(false, response.getHeaders().get("findModule"));
        }

        @Test
        @DisplayName("Receive busca resposta e retorna cod_modulo")
        void testReceive_find_module_true() {
                // given
                this.givenListenerMessage.setFindModule(true); // default is false.
                givenFind_module();
                // when
                Message<String> response = managerChannel.receive(this.message);
                // then
                thenResponse(response);
                // resposta esperada de busca "true"
                assertEquals(true, response.getHeaders().get("findModule"));
        }

        /**
         * Constrói objetos FAKE para teste.
         * 
         * @param setProcess -> Map<String, Objeto> insere no parâmetro 'process' das
         *                   regras.
         */
        private void givenFind_module() {
                this.message = createObjMessage(send_message, givenRuleMessage);

                this.givenListenerMessage.setCodModuleGroup(this.group);
                this.givenListenerMessage.setCodModulo(this.cod_modulo);

                this.givenRuleMessage.setName("MOCK RULE -> NAME");
                this.givenRuleMessage.setRegex(this.regex);
                this.givenRuleMessage.setListenerMessage(this.givenListenerMessage);

                given(receiveService.loadRuleMessage(this.message)).willReturn(this.givenRuleMessage);                
        }

        /**
         * Executa validações iguais para os métodos.
         * 
         * @param response
         */
        void thenResponse(Message<String> response) {
                RuleMessage thenRule = (RuleMessage) response.getHeaders().get("ruleMessage");
                // Verifica métodos chamados
                verify(this.receiveService, times(1)).loadRuleMessage(this.message);
                verify(this.sendMessageService, times(1)).toManager(this.send_message, thenRule);

                // mensagem no payload mesma da inserida.
                assertEquals(this.send_message, response.getPayload().toString());
                // responde mesmo cod_modulo de givenFind_module
                assertEquals(this.cod_modulo, thenRule.getListenerMessage().getCodModulo());
        }

}
