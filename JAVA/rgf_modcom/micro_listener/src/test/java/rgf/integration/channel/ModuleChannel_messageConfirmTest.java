package rgf.integration.channel;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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

@DisplayName("Realiza a confirmação de Mensagem para o modulo por UUID.")
@ExtendWith(MockitoExtension.class)
public class ModuleChannel_messageConfirmTest extends MessageHelper {

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
        String message_response;
        String message_not_found;
        String message_error;

        String send_message;

        String uuid_confirm;
        Integer uuid_confirm_group;

        RuleMessage givenRuleMessage;
        ListenerMessage givenListenerMessage;

        String receive_payload;

        @BeforeEach
        void setUp() {

                receive_payload = "MENSAGEM DE RECEBIMENTO";

                givenRuleMessage = RuleMessage.builder().build();
                givenListenerMessage = ListenerMessage.builder().build();
                givenRuleMessage.setListenerMessage(givenListenerMessage);

                cod_modulo = "COD_FAKE_0001";
                regex = "(MODULE_SERVICE.)([0-9A-Z_]*)";
                send_message = "MODULE_CONFIRM UUID 2022-01-02: Mensagem Teste Confirmação";
                uuid_confirm = "MOCK_UUID";
                uuid_confirm_group = 7;

                message_response = "RESPONSE_MESSAGE";
                message_not_found = "NOT_FOUND_MESSAGE";
                message_error = "ERROR_MESSAGE";
        }

        /**
         * Retorna confirmação<br>
         * Não busca por nova mensagem.<br>
         * Configuração default, 
         * 
         * @throws JsonMappingException
         * @throws JsonProcessingException
         */
        @Test
        @DisplayName("Localiza confirmação, NÃO busca nova mensagem.")
        void testConfirm_default() throws JsonMappingException, JsonProcessingException {
                // given
                givenConfirm_message(true);
                // when
                Message<String> confirm = moduleChannel
                                .messageConfirm(createObjMessage(this.send_message, this.givenRuleMessage));
                // then
                RuleMessage thenRuleMessage = thenResponse(confirm);
                assertNull(thenRuleMessage.getListenerMessage().getMessageResponse());
                assertNull(thenRuleMessage.getListenerMessage().getMessageNotFound());
                assertNull(thenRuleMessage.getListenerMessage().getMessageError());
                assertEquals(cod_modulo, thenRuleMessage.getListenerMessage().getCodModulo());
                assertEquals(false, confirm.getHeaders().get("findModule"));
        }

        /**
         * Retorna confirmação<br>
         * Realiza busca por nova mensagem.
         * 
         * @throws JsonMappingException
         * @throws JsonProcessingException
         */
        @Test
        @DisplayName("Localiza confirmação, busca nova mensagem.")
        void testConfirm_found_find() throws JsonMappingException, JsonProcessingException {
                // given
                this.givenListenerMessage.setFindModule(true);
                givenConfirm_message(true);
                // when
                Message<String> confirm = this.moduleChannel
                                .messageConfirm(createObjMessage(this.send_message, this.givenRuleMessage));
                // then
                RuleMessage thenRuleMessage = thenResponse(confirm);
                assertNull(thenRuleMessage.getListenerMessage().getMessageResponse());
                assertNull(thenRuleMessage.getListenerMessage().getMessageNotFound());
                assertNull(thenRuleMessage.getListenerMessage().getMessageError());
                assertEquals(this.receive_payload, thenRuleMessage.getListenerMessage().getReplayPayload());
                assertEquals(this.cod_modulo, thenRuleMessage.getListenerMessage().getCodModulo());
                assertEquals(true, confirm.getHeaders().get("findModule"));
        }

        /**
         * NÃO retorna confirmação => messageResponse = messageNotFound<br>
         * Realiza busca por nova mensagem.
         * 
         * @throws JsonMappingException
         * @throws JsonProcessingException
         */
        @Test
        @DisplayName("NÃO localiza confirmação -> busca nova mensagem.")
        void testConfirm_NOTfound_find() throws JsonMappingException, JsonProcessingException {
                // given
                this.givenListenerMessage.setFindModule(true);
                this.givenListenerMessage.setMessageResponse(this.message_response);
                this.givenListenerMessage.setMessageNotFound(this.message_not_found);
                givenConfirm_message(false);
                // when
                Message<String> confirm = this.moduleChannel
                                .messageConfirm(createObjMessage(this.send_message, this.givenRuleMessage));
                // then
                RuleMessage thenRuleMessage = thenResponse(confirm);
                assertEquals(this.message_not_found,thenRuleMessage.getListenerMessage().getMessageResponse());
                assertEquals(this.message_not_found,thenRuleMessage.getListenerMessage().getMessageNotFound());
                assertNull(thenRuleMessage.getListenerMessage().getMessageError());
                assertEquals(cod_modulo, thenRuleMessage.getListenerMessage().getCodModulo());
                assertEquals(true, confirm.getHeaders().get("findModule"));
        }

        /**
         * Retorna confirmação<br>
         * Não realiza busca por nova mensagem.
         * 
         * @throws JsonMappingException
         * @throws JsonProcessingException
         */
        @Test
        @DisplayName("NÃO localiza confirmação -> resposta 'messageNotFound', busca nova mensagem.")
        void testConfirm_found_NOTfind() throws JsonMappingException, JsonProcessingException {
                // given
                this.givenListenerMessage.setFindModule(false);
                this.givenListenerMessage.setMessageResponse(this.message_response);

                givenConfirm_message(true);
                // when
                Message<String> confirm = moduleChannel
                                .messageConfirm(createObjMessage(this.send_message, this.givenRuleMessage));
                // then
                RuleMessage thenRuleMessage = thenResponse(confirm);
                assertEquals(this.message_response, thenRuleMessage.getListenerMessage().getMessageResponse());
                assertNull(thenRuleMessage.getListenerMessage().getMessageNotFound());
                assertNull(thenRuleMessage.getListenerMessage().getMessageError());
                assertEquals(this.cod_modulo, thenRuleMessage.getListenerMessage().getCodModulo());
                assertEquals(false, confirm.getHeaders().get("findModule"));
        }


        /**
         * Erro ao localizar o UUID da mensagem.
         * @throws Exception
         */
        @Test
        @DisplayName("Exceção ao localizar UUID -> resposta 'messageError', não busca nova mensagem.")
        void testConfirm_uuid_exception() throws Exception {
                // given
                String exceptionMessage = "UUID NAO LOCALIZADO";

                this.givenListenerMessage.setCodModulo(this.cod_modulo);
                this.givenListenerMessage.setUuidConfirmGroup(this.uuid_confirm_group);
                this.givenRuleMessage.setName("MOCK RULE -> " + this.regex);
                this.givenRuleMessage.setRegex(this.regex);
                when(regexService.loadByGroup(eq(this.send_message), eq(this.uuid_confirm_group))).thenThrow(new Exception(exceptionMessage));

                this.givenListenerMessage.setMessageResponse(this.message_response);
                this.givenListenerMessage.setMessageError(this.message_error);
                this.givenListenerMessage.setFindModule(true);

                // when
                Message<String> confirm = moduleChannel
                                .messageConfirm(createObjMessage(this.send_message, this.givenRuleMessage));

                // then
                RuleMessage thenRuleMessage = (RuleMessage) confirm.getHeaders().get("ruleMessage");
                // não executou busca pelo módulo.
                verify(this.receiveMessageService, never()).findToModule(anyString());
                assertEquals(this.message_error, thenRuleMessage.getListenerMessage().getMessageResponse());
                assertEquals(this.message_error, thenRuleMessage.getListenerMessage().getMessageError());
                assertNull(thenRuleMessage.getListenerMessage().getMessageNotFound());
                assertEquals("MESSAGE CONFIRM:" + exceptionMessage, thenRuleMessage.getException());
                assertEquals(exceptionMessage, thenRuleMessage.getListenerMessage().getReplayPayload());
                assertEquals(false, confirm.getHeaders().get("findModule"));
        }

        /**
         * Constrói objetos FAKE para teste.
         * Insere cod_modulo, uuidConfirmGroup, name e regex
         * @param findResponse -> se true responde com objeto na busca.
         */
        void givenConfirm_message(boolean findResponse) {
                // mensagem de resposta esperada.

                if (findResponse) {
                        IntegrationMessage fakeReturnMessage = IntegrationMessage.builder().message(this.receive_payload).ruleMessage(this.givenRuleMessage).build();
                        given(this.receiveMessageService.findToModule("uuid_confirm='" + this.uuid_confirm + "'"))
                                        .willReturn(fakeReturnMessage);
                } else {
                        given(this.receiveMessageService.findToModule("uuid_confirm='" + this.uuid_confirm + "'"))
                                        .willReturn(null);

                }
                try {
                        given(regexService.loadByGroup(this.send_message, this.uuid_confirm_group))
                                        .willReturn(this.uuid_confirm);
                } catch (Exception e) {
                        e.printStackTrace();
                }
                givenListenerMessage.setCodModulo(this.cod_modulo);
                givenListenerMessage.setUuidConfirmGroup(this.uuid_confirm_group);
                givenRuleMessage.setName("MOCK RULE -> " + this.regex);
                givenRuleMessage.setRegex(this.regex);
        }

        /**
         * Resposta default esperada.
         * 
         * @param response
         * @return
         */
        RuleMessage thenResponse(Message<String> response) {
                RuleMessage thenRule = (RuleMessage) response.getHeaders().get("ruleMessage");
                // executou busca pelo módulo.
                verify(receiveMessageService, times(1)).findToModule(anyString());
                verify(regexService, times(1)).regexPatter(regex);

                return thenRule;
        }

}
