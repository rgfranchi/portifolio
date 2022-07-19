package rgf.integrationTest.database;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
import rgf.document.Module;
import rgf.repository.ModuleRepository;

/**
 * DataMongoTest:
 * - Carrega '@Document' e 'MongoRepository'
 * - Não carrega outros contextos da aplicação.
 */
@DisplayName("Testa Document Module")
@DataMongoTest
@ActiveProfiles("test")
public class ModuleRepositoryIT {

    // @Autowired
    // private MongoTemplate mongoTemplate;

    @Autowired
    private ModuleRepository moduleRepository;

    private Module module;
    private List<Module> modules;

    @BeforeEach
    void setUp() {
        module = Module.builder()
            .id("SET_MODULE_ID")
            .codModule("COD_MODULE")
            .ruleName("RULE NAME")
            .ruleVersion("V0.0.0")
            .build();
        modules = List.of(
            Module.builder()
                .id("SET_MODULE_ID_1")
                .codModule("COD_MODULE_1")
                .ruleName("RULE NAME_1")
                .ruleVersion("V0.0.1")
                .build(),
            Module.builder()
                .id("SET_MODULE_ID_2")
                .codModule("COD_MODULE_2")
                .ruleName("RULE NAME_2")
                .ruleVersion("V0.0.2")
                .build(),
            Module.builder()
                .id("SET_MODULE_ID_3")
                .codModule("COD_MODULE_3")
                .ruleName("RULE NAME_3")
                .ruleVersion("V0.0.1")
                .build()
        );
        moduleRepository.saveAll(modules);
    }


    @AfterEach
    void afterEach() {
        moduleRepository.deleteAll();
    }

    @Test
    @DisplayName("Insere 1 Modulo no banco de dados.")
    void testCreateModule() {
        // given
        List<Module> listEvents = moduleRepository.findAll();
        assertEquals(3, listEvents.size());
        // when
        moduleRepository.save(module);
        // then
        listEvents = moduleRepository.findAll();
        assertEquals(4, listEvents.size());
        assertEquals(module.getId(), listEvents.get(3).getId());
        assertEquals(module.getCodModule(), listEvents.get(3).getCodModule());
        assertEquals(module.getRuleName(), listEvents.get(3).getRuleName());
        assertEquals(module.getRuleVersion(), listEvents.get(3).getRuleVersion());
    }


    @Test
    @DisplayName("Atualiza 'cod_module' do 'Module'.")
    void testUpdateModule() {
        // given
        String id = "SET_MODULE_ID_2";
        Module changeModule = moduleRepository.findById(id).get();
        String newOperator = "NEW COD_MODULE";
        // when
        changeModule.setCodModule(newOperator);
        moduleRepository.save(changeModule);
        // then
        List<Module> listModule = moduleRepository.findAll();
        assertEquals(3, listModule.size());
        // verifica se atualizou registro
        assertEquals(newOperator, listModule.get(1).getCodModule());
    }

    @Test
    @DisplayName("Exclui module.")
    void testDeleteEvent() {
        // given
        String id = "SET_MODULE_ID_2";
        // when
        moduleRepository.deleteById(id);
        // then
        List<Module> listEvents = moduleRepository.findAll();
        assertEquals(2, listEvents.size());
        // verifica se excluiu registro
        assertEquals(Optional.empty(), moduleRepository.findById(id));
    }    


    @Test
    @DisplayName("Falha ao inserir modulo com mesmo 'codModulo, ruleName e ruleVersion'.")
    void testException_DuplicateEvent() {
        // given
        // Recupera segundo modulo criado e altera a chave.
        Module module = modules.get(1);
        module.setId("ERROR_INDEX");
        // when
        Exception exception = assertThrows(DuplicateKeyException.class, () -> moduleRepository.save(module));
        // then
        assertTrue(exception.getMessage().contains("rgf_receive.module index: codModulo_ruleName_ruleVersion dup key"));
    }
}
