package rgf.integration.channel;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.Message;

import pojo.integration.IntegrationMessage;
import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import rgf.integration.helper_tests.MessageHelper;
import rgf.integration.service.JsonService;
import rgf.integration.service.RegexService;
import rgf.listener.service.ReceiveMessageService;
import rgf.listener.service.SendMessageService;

@DisplayName("Busca por mensagem para o modulo pelo codModulo.")
@ExtendWith(MockitoExtension.class)
public class ModuleChannel_eventFindTest extends MessageHelper {

        @Mock
        JsonService jsonService;

        @Mock
        RegexService regexService;

        @Mock
        ReceiveMessageService receiveMessageService;

        @Mock
        SendMessageService sendMessageService;

        @Captor
        ArgumentCaptor<RuleMessage> jsonRuleCaptor;

        @InjectMocks
        ModuleChannel moduleChannel;

        String cod_modulo;
        String regex;
        // String rule_send;
        String payload_replay;
        String payload_send;
        String message_response;
        String message_not_found;
        String message_error;
        // Map<String, Object> setProcess;
        RuleMessage givenRuleMessage;
        ListenerMessage givenListenerMessage;

        @BeforeEach
        void setUp() {
                givenRuleMessage = RuleMessage.builder().build();
                givenListenerMessage = ListenerMessage.builder().build();
                // setProcess = new HashMap<>();
                cod_modulo = "COD_FAKE_0001";
                regex = "(MODULE_SERVICE.)([0-9A-Z_]*)";
                // rule_send = "{FAKE_JSON_RULE_SEND}";
                // rule_return = "{FAKE_JSON_RULE_RETURN}";
                payload_send = "MODULE_SERVICE COD_MODULO 2022-01-02: Mensagem Teste de configuração";
                payload_replay = "MODULE_SERVICE_RETURN COD_MODULO : Mensagem Teste de retorno";
                message_response = "SENTENCE RESPONSE";
                message_not_found = "SENTENCE NOT_FOUND";
                message_error = "SENTENCE ERROR";

                givenListenerMessage.setMessageResponse(message_response);
                givenListenerMessage.setMessageNotFound(message_not_found);
                givenListenerMessage.setMessageError(message_error);

        }

        @Test
        @DisplayName("NÃO confirma recebimento (default), Localiza resposta")
        void testEventFind_not_confirm() throws JsonMappingException, JsonProcessingException {
               
                // given
                // codigo do modulo que busca pela resposta
                givenListenerMessage.setCodModulo(this.cod_modulo);
                givenEventFind();

                // when
                Message<String> response = moduleChannel.eventFind(createObjMessage(payload_send, givenRuleMessage));

                // then
                RuleMessage thenRule = thenResponse(response);

                assertEquals(36, thenRule.getListenerMessage().getUuidConfirm().length());
                assertEquals(message_response, thenRule.getListenerMessage().getMessageResponse());
                assertEquals(0L, thenRule.getListenerMessage().getConfirmTimes());

                verify(sendMessageService, never()).confirmFromModule(any(), anyLong(), anyString());
                verify(sendMessageService, never()).toExpire(any());
        }

        /**
         * Teste:<br>
         * - confirm_times = 2<br>
         * - uuid_length = 4<br>
         * 
         * @throws JsonMappingException
         * @throws JsonProcessingException
         */
        @Test
        @DisplayName("Insere mensagem na fila de confirmação.")
        void testEventFind_confirm() throws JsonMappingException, JsonProcessingException {
                // given
                // codigo do modulo que busca pela resposta
                givenListenerMessage.setCodModulo(this.cod_modulo);
                givenListenerMessage.setConfirmTimes(2L);
                givenListenerMessage.setUuidLength(4);
                givenEventFind();

                // when
                Message<String> response = moduleChannel
                                .eventFind(createObjMessage(this.payload_send, this.givenRuleMessage));

                // then
                RuleMessage thenRule = thenResponse(response);

                // verifica variáveis
                assertEquals(4, thenRule.getListenerMessage().getUuidConfirm().length());
                assertEquals(message_response, thenRule.getListenerMessage().getMessageResponse());
                assertEquals(2L, thenRule.getListenerMessage().getConfirmTimes());

                // Recebeu mensagem em confirmação
                verify(sendMessageService, times(1)).confirmFromModule(any(), anyLong(), anyString());
                verify(sendMessageService, never()).toExpire(any());
        }

        /**
         * Teste:<br>
         * - confirm_times = 2<br>
         * - uuid_length = 4<br>
         * - getDeliveryTimes = (confirm_times + 1)
         * 
         * @throws JsonMappingException
         * @throws JsonProcessingException
         */
        @Test
        @DisplayName("Expira tentativas de confirmação.")
        void testEventFind_confirm_expire() throws JsonMappingException, JsonProcessingException {
                // given
                Long confirm_times = 2L;
                givenListenerMessage.setCodModulo(this.cod_modulo);
                givenListenerMessage.setConfirmTimes(confirm_times);
                givenListenerMessage.setUuidLength(7);
                givenEventFind();
                // acima do limite de vezes máximo de confirmação.
                given(receiveMessageService.getDeliveryTimes()).willReturn(confirm_times + 1);

                // when
                Message<String> response = moduleChannel
                                .eventFind(createObjMessage(this.payload_send, this.givenRuleMessage));
                // then
                RuleMessage thenRule = thenResponse(response);

                // verifica variáveis
                assertEquals(7, thenRule.getListenerMessage().getUuidConfirm().length());
                assertEquals(message_response, thenRule.getListenerMessage().getMessageResponse());
                assertEquals(2L, thenRule.getListenerMessage().getConfirmTimes());

                // Recebeu mensagem em expirado
                verify(sendMessageService, never()).confirmFromModule(any(), anyLong(), anyString());
                verify(sendMessageService, times(1)).toExpire(any());
        }

        /**
         * Teste:<br>
         * - cod_modulo = 'codModulo_notFound' para não localizar mensagem<br>
         * - messageNotFound = texto de retorno quando não localizado (default null)
         */
        @Test
        @DisplayName("NÃO encontra mensagem -> reponde 'listenerMessage.messageNotFound'")
        void testEventFind_not_found_response() {
                // given
                String codModulo_notFound = "99999_COD_NOT_FIND";
                givenListenerMessage.setCodModulo(codModulo_notFound);
                givenEventFind();
                this.payload_replay = "";
                this.message_response = this.message_not_found;

                // when
                Message<String> response = moduleChannel.eventFind(createObjMessage(payload_send, givenRuleMessage));

                // then
                this.cod_modulo = codModulo_notFound; // alterar para o teste.
                RuleMessage thenRule = thenResponse(response);

                // verifica variáveis.
                assertEquals(codModulo_notFound, thenRule.getListenerMessage().getCodModulo());
                assertEquals(36, thenRule.getListenerMessage().getUuidConfirm().length());

                // Não executa métodos.
                verify(receiveMessageService, never()).getDeliveryTimes();
                verify(sendMessageService, never()).toExpire(any());
                verify(sendMessageService, never()).confirmFromModule(any(), anyLong(), anyString());
        }

        /**
         * Constrói objetos FAKE para teste.
         */
        void givenEventFind() {
                // resposta do servidor para o módulo.
                if (givenListenerMessage.getCodModulo().equals(this.cod_modulo)) {

                        IntegrationMessage fakeReturnMessage = IntegrationMessage.builder()
                                .message(this.payload_replay)
                                .ruleMessage(this.givenRuleMessage)
                                .build();
                        given(receiveMessageService.findToModule("cod_modulo='" + this.cod_modulo + "'"))
                                        .willReturn(fakeReturnMessage);
                }

                givenRuleMessage.setName("MOCK RULE -> " + this.regex);
                givenRuleMessage.setRegex(this.regex);
                givenRuleMessage.setListenerMessage(givenListenerMessage);
        }

        /**
         * Resposta default esperada.
         * Carrega valores RuleMessage que seria incluído em "ruleMessage" no header
         * 
         * @param response
         * @return
         */
        RuleMessage thenResponse(Message<String> response) {
                // captura valores inseridos nas regras de resposta
                // verify(jsonService).ruleMessageToString(jsonRuleCaptor.capture());
                // RuleMessage jsonRule = jsonRuleCaptor.getValue();
                assertEquals(this.payload_send, response.getPayload().toString());

                RuleMessage thenRule = (RuleMessage) response.getHeaders().get("ruleMessage");
                assertEquals(this.payload_replay, thenRule.getListenerMessage().getReplayPayload());
                assertEquals(this.message_response, thenRule.getListenerMessage().getMessageResponse());
                assertEquals(this.message_not_found, thenRule.getListenerMessage().getMessageNotFound());
                assertEquals(this.message_error, thenRule.getListenerMessage().getMessageError());
                assertEquals(this.cod_modulo, thenRule.getListenerMessage().getCodModulo());

                verify(this.receiveMessageService, times(1)).findToModule(anyString());

                return thenRule;
        }

}
