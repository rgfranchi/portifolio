package rgf.service;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.anyString;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.only;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pojo.integration.IntegrationMessage;
import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import rgf.document.OwnerModule;
import rgf.document.RuleEvent;
import rgf.document.RuleType;
import rgf.repository.OwnerModuleRepository;
import rgf.repository.RuleEventRepository;

@DisplayName("Serviço de execução do listener.")
@ExtendWith(MockitoExtension.class)
public class ListenerFromServiceTest {

    @Mock
    OwnerModuleRepository ownerModuleRepository;

    @Mock
    RuleEventRepository ruleEventRepository;

    @InjectMocks
    ListenerFromService listenerFromService;

    ListenerMessage givenListenerMessage;

    IntegrationMessage givenIntegrationMessage;    
    OwnerModule givenOwnerModule;
    RuleMessage givenRuleMessage;
    RuleEvent givenRuleEvent;
    RuleType givenRuleTypeDateTime;


    String givenMessage;

    String cod_module;
    String owner_module;
    String owner_id;
    String rule_name;
    String rule_version;

    LocalDateTime givenDateTime;

    @BeforeEach
    void setUp() {
        givenListenerMessage = ListenerMessage.builder().build();
        cod_module = "COD_MODULO_001";

        this.givenOwnerModule = OwnerModule.builder().build();
        this.owner_module = "OWNER_MODEL";
        this.owner_id = "OWNER_ID_001";
        this.rule_name = "TEST_RULE_001";
        this.rule_version = "0.0.1";

        this.givenRuleMessage = RuleMessage.builder().build();   
        this.givenIntegrationMessage = IntegrationMessage.builder().build();
        this.givenRuleEvent = RuleEvent.builder().build();

        this.givenListenerMessage.setCodModulo(this.cod_module);

        this.givenOwnerModule.setOwnerModel(this.owner_module);
        this.givenOwnerModule.setOwnerId(this.owner_id);
        this.givenRuleMessage.setOwnerModel(this.owner_module);
        this.givenRuleMessage.setOwnerId(this.owner_id);
        this.givenRuleMessage.setName(this.rule_name);
        this.givenRuleMessage.setVersion(this.rule_version);
        this.givenRuleMessage.setListenerMessage(this.givenListenerMessage);

        this.givenRuleEvent.setName("Rule Event I");
        this.givenRuleEvent.setVersion("Rule Version I");

        RuleType givenRuleType1 = RuleType.builder()
            .regex("(MENSAGEM)([\\s\\S]*)")
            .groups(new Integer[]{0, 1, 2})
            .typeEvent("MESSAGE_TEST")
            .build();
        this.givenRuleTypeDateTime = RuleType.builder()
            .regex("(\\d{2})(\\d{2,2})(\\d{4,4})(\\d{2,2})(\\d{2,2})(\\d{2,2})(\\d{3,3})")
            .groups(new Integer[]{3, 2, 1, 4, 5, 6, 7}) // 0 = "MENSAGEM"
            .typeEvent("date_time")
            .build();

        this.givenDateTime = LocalDateTime.of(2022,05,22,10,55,22, 999);

        this.givenRuleEvent.setRuleTypes(List.of(givenRuleType1, givenRuleTypeDateTime));

        this.givenMessage = "MENSAGEM DE TESTE RECEBIDA |22052022105522999|";
        this.givenIntegrationMessage.setMessage(this.givenMessage);
        this.givenIntegrationMessage.setRuleMessage(givenRuleMessage);
    }

    @Test
    @DisplayName("Passa por todas as funções de loadRuleEvent")
    void testLoadRuleEvent() {
        // given
        given(ownerModuleRepository.findFirstByOwnerModelAndOwnerId(givenRuleMessage.getOwnerModel(),givenRuleMessage.getOwnerId())).willReturn(Optional.of(givenOwnerModule));
        given(ruleEventRepository.findFirstByOwnerModuleAndNameAndVersion(givenOwnerModule, rule_name, rule_version)).willReturn(Optional.of(givenRuleEvent));
        // when
        RuleEvent resp = listenerFromService.loadRuleEvent(givenIntegrationMessage);
        // then
        verify(this.ownerModuleRepository, only()).findFirstByOwnerModelAndOwnerId(givenRuleMessage.getOwnerModel(),givenRuleMessage.getOwnerId());
        verify(this.ruleEventRepository, only()).findFirstByOwnerModuleAndNameAndVersion(givenOwnerModule, rule_name, rule_version);
        // verify(this.listenerFromService, only()).extractEventMessage(any(),anyString());
        assertEquals(givenRuleEvent, resp);
    }

    @Test
    @DisplayName("Não localiza o dono da regra loadRuleEvent")
    void testLoadRuleEvent_OwnerNotFound() {
        // given
        given(ownerModuleRepository.findFirstByOwnerModelAndOwnerId(givenRuleMessage.getOwnerModel(),givenRuleMessage.getOwnerId())).willReturn(Optional.empty());
        // when
        RuleEvent resp = listenerFromService.loadRuleEvent(givenIntegrationMessage);
        // then
        verify(this.ownerModuleRepository, only()).findFirstByOwnerModelAndOwnerId(givenRuleMessage.getOwnerModel(),givenRuleMessage.getOwnerId());
        verify(this.ruleEventRepository, never()).findFirstByOwnerModuleAndNameAndVersion(givenOwnerModule, rule_name, rule_version);
        assertNull(resp);
    }

    @Test
    @DisplayName("Não localiza o regra e consequentemente o dono loadRuleEvent")    
    void testLoadRuleEvent_RuleNotFound() {
        // given
        given(ownerModuleRepository.findFirstByOwnerModelAndOwnerId(givenRuleMessage.getOwnerModel(),givenRuleMessage.getOwnerId())).willReturn(Optional.of(givenOwnerModule));
        given(ruleEventRepository.findFirstByOwnerModuleAndNameAndVersion(givenOwnerModule, rule_name, rule_version)).willReturn(Optional.empty());
        // when
        RuleEvent resp = listenerFromService.loadRuleEvent(givenIntegrationMessage);
        // then
        verify(this.ownerModuleRepository, only()).findFirstByOwnerModelAndOwnerId(givenRuleMessage.getOwnerModel(),givenRuleMessage.getOwnerId());
        verify(this.ruleEventRepository, only()).findFirstByOwnerModuleAndNameAndVersion(givenOwnerModule, rule_name, rule_version);
        assertNull(resp);
    }

    @Test
    @DisplayName("Testa a regra date_time event")
    void testRegexDateTime() {
        // given
        // when
        var resp = listenerFromService.regexDateTime(this.givenMessage, this.givenRuleTypeDateTime);
        // then
        assertEquals(givenDateTime, resp);
    }    


    @Test
    @DisplayName("Valor inválido de data_hora")
    void testRegexDateTime_invalid_date() {
        // given
        // altera dia 10 para dia 33 (inválido).
        this.givenMessage = this.givenMessage.replace("10", "33");
        // when
        var resp = listenerFromService.regexDateTime(this.givenMessage, this.givenRuleTypeDateTime);
        // then

finalizar teste de data inválida.


        assertEquals(givenDateTime, resp);
    }    

criar teste dos outros eventos... 
Criar testes primeiro, depois implementar.


}
