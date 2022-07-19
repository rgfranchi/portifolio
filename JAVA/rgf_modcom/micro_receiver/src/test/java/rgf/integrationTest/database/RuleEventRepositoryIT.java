package rgf.integrationTest.database;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.test.context.ActiveProfiles;
import rgf.document.RuleEvent;
import rgf.document.RuleType;
import rgf.repository.RuleEventRepository;

/**
 * DataMongoTest:
 * - Carrega '@Document' e 'MongoRepository'
 * - Não carrega outros contextos da aplicação.
 */
@DisplayName("Test Document RuleEvent")
@DataMongoTest
@ActiveProfiles("test")
public class RuleEventRepositoryIT {

    // @Autowired
    // private MongoTemplate mongoTemplate;

    @Autowired
    private RuleEventRepository ruleEventRepository;

    private RuleEvent ruleEvent;
    private List<RuleEvent> ruleEvents;

    private List<RuleType> ruleTypes;

    @BeforeEach
    void setUp() {
        ruleTypes = List.of(
            RuleType.builder()
                .typeEvent("EVENT_0")
                .regex(".")
                .groups(new Integer[]{1,2})
                .build(),
            RuleType.builder()
                .typeEvent("EVENT_1")
                .regex(".EVENT1")
                .groups(new Integer[]{0,2})
                .build(),
            RuleType.builder()
                .typeEvent("EVENT_2")
                .regex(".EVENT2")
                .groups(new Integer[]{0,2})
                .build()
        );


        ruleEvent = RuleEvent.builder()
            .id("SET_RULE_EVENT_ID")
            .name("RULE_EVENT_NAME")
            .version("0.0.0")
            .ruleTypes(ruleTypes)
            .build();
        ruleEvents = List.of(
            RuleEvent.builder()
                .id("SET_RULE_EVENT_ID_1")
                .name("RULE_EVENT_NAME_1")
                .version("0.0.1")
                .ruleTypes(ruleTypes)
                .build(),
            RuleEvent.builder()
                .id("SET_RULE_EVENT_ID_2")
                .name("RULE_EVENT_NAME_2")
                .version("0.0.2")
                .ruleTypes(ruleTypes)
                .build(),
            RuleEvent.builder()
                .id("SET_RULE_EVENT_ID_3")
                .name("RULE_EVENT_NAME_3")
                .version("0.0.3")
                .ruleTypes(ruleTypes)
                .build()
        );
        ruleEventRepository.saveAll(ruleEvents);
    }


    @AfterEach
    void afterEach() {
        ruleEventRepository.deleteAll();
    }

    @Test
    @DisplayName("Insere 1 'RuleEvent' no banco de dados.")
    void testCreateRuleEvent() {
        // given
        List<RuleEvent> listRuleEvent = ruleEventRepository.findAll();
        assertEquals(3, listRuleEvent.size());
        // when
        ruleEventRepository.save(ruleEvent);
        // then
        listRuleEvent = ruleEventRepository.findAll();
        assertEquals(4, listRuleEvent.size());
        assertEquals(ruleEvent.getId(), listRuleEvent.get(3).getId());
        assertEquals(ruleEvent.getRuleTypes(), listRuleEvent.get(3).getRuleTypes());
        assertEquals(ruleEvent.getName(), listRuleEvent.get(3).getName());
        assertEquals(ruleEvent.getVersion(), listRuleEvent.get(3).getVersion());
    }


    @Test
    @DisplayName("Atualiza 'name' e 'version' do RuleEvent.")
    void testUpdateRuleEvent() {
        // given
        String id = "SET_RULE_EVENT_ID_2";
        RuleEvent changeRuleEvent = ruleEventRepository.findById(id).get();
        String newRuleName = "NEW RULE_NAME";
        String newRuleVersion = "1.0.0";
        // when
        changeRuleEvent.setName(newRuleName);
        changeRuleEvent.setVersion(newRuleVersion);
        ruleEventRepository.save(changeRuleEvent);
        // then
        List<RuleEvent> listRuleEvent = ruleEventRepository.findAll();
        assertEquals(3, listRuleEvent.size());
        // verifica se atualizou registro
        assertEquals(newRuleName, listRuleEvent.get(1).getName());
        assertEquals(newRuleVersion, listRuleEvent.get(1).getVersion());
    }

    @Test
    @DisplayName("Exclui RuleEvent.")
    void testDeleteRuleEvent() {
        // given
        String id = "SET_RULE_EVENT_ID_2";
        // when
        ruleEventRepository.deleteById(id);
        // then
        List<RuleEvent> RuleEvent = ruleEventRepository.findAll();
        assertEquals(2, RuleEvent.size());
        // verifica se excluiu registro
        assertEquals(Optional.empty(), ruleEventRepository.findById(id));
    }    

    @Test
    @DisplayName("Falha ao inserir RuleEvent com mesmo 'name e version'.")
    void testException_DuplicateEvent() {
        // given
        // Recupera segundo modulo criado e altera a chave.
        RuleEvent ruleEvent = ruleEvents.get(1);
        ruleEvent.setId("ERROR_INDEX");
        // when
        Exception exception = assertThrows(DuplicateKeyException.class, () -> ruleEventRepository.save(ruleEvent));
        // then
        assertTrue(exception.getMessage().contains("rgf_receive.ruleEvent index: name_version dup key"));
    }

    @Test
    @DisplayName("Busca uma ocorrência de RuleEvent.")
    void testFindFirstByOwnerModelAndOwnerId() {
        // given
        // Recupera informação do segundo valor
        var ruleEvent = ruleEvents.get(1);
        // when
        var found = ruleEventRepository.findFirstByNameAndVersion(ruleEvent.getName(), ruleEvent.getVersion());
        // then
        assertTrue(found.isPresent());
        assertEquals(ruleEvent.getId(), found.get().getId());
    }    

    @Test
    @DisplayName("Busca e não localiza RuleEvent.")
    void testFindFirstByNameAndVersion_empty() {
        // given
        // when
        var found = ruleEventRepository.findFirstByNameAndVersion("NOT_EXIST_NAME", "NOT_EXIST_VERSION");
        // then
        assertFalse(found.isPresent());
        assertEquals(Optional.empty(), found);
    } 

}
