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
import rgf.document.OwnerModule;
import rgf.repository.OwnerModuleRepository;

/**
 * DataMongoTest:
 * - Carrega '@Document' e 'MongoRepository'
 * - Não carrega outros contextos da aplicação.
 */
@DisplayName("Test Document OwnerModule")
@DataMongoTest
@ActiveProfiles("test")
public class OwnerModuleRepositoryIT {

    // @Autowired
    // private MongoTemplate mongoTemplate;

    @Autowired
    private OwnerModuleRepository ownerModuleRepository;

    private OwnerModule ownerModule;
    private List<OwnerModule> ownerModules;

    @BeforeEach
    void setUp() {
        ownerModule = OwnerModule.builder()
            .id("SET_OWNER_ID")
            .ownerModel("OWNER_NAME")
            .ownerId("OWNER_ID")
            .build();
        ownerModules = List.of(
            OwnerModule.builder()
                .id("SET_OWNER_ID_1")
                .ownerModel("OWNER_NAME_1")
                .ownerId("OWNER_ID_1")
                .build(),
            OwnerModule.builder()
                .id("SET_OWNER_ID_2")
                .ownerModel("OWNER_NAME_2")
                .ownerId("OWNER_ID_2")
                .build(),
            OwnerModule.builder()
                .id("SET_OWNER_ID_3")
                .ownerModel("OWNER_NAME_3")
                .ownerId("OWNER_ID_3")
                .build()
        );
        ownerModuleRepository.saveAll(ownerModules);
    }


    @AfterEach
    void afterEach() {
        ownerModuleRepository.deleteAll();
    }

    @Test
    @DisplayName("Insere 1 'OwnerModule' no banco de dados.")
    void testCreateOwnerModule() {
        // given
        List<OwnerModule> listEvents = ownerModuleRepository.findAll();
        assertEquals(3, listEvents.size());
        // when
        ownerModuleRepository.save(ownerModule);
        // then
        listEvents = ownerModuleRepository.findAll();
        assertEquals(4, listEvents.size());
        assertEquals(ownerModule.getId(), listEvents.get(3).getId());
        assertEquals(ownerModule.getOwnerModel(), listEvents.get(3).getOwnerModel());
        assertEquals(ownerModule.getOwnerId(), listEvents.get(3).getOwnerId());
    }


    @Test
    @DisplayName("Atualiza 'ownerModel' do OwnerModule.")
    void testUpdateOwnerModule() {
        // given
        String id = "SET_OWNER_ID_2";
        OwnerModule changeOwnerModule = ownerModuleRepository.findById(id).get();
        String newOwnerModule = "NEW OWNER_NAME";
        // when
        changeOwnerModule.setOwnerModel(newOwnerModule);
        ownerModuleRepository.save(changeOwnerModule);
        // then
        List<OwnerModule> listModule = ownerModuleRepository.findAll();
        assertEquals(3, listModule.size());
        // verifica se atualizou registro
        assertEquals(newOwnerModule, listModule.get(1).getOwnerModel());
    }

    @Test
    @DisplayName("Exclui OwnerModule.")
    void testDeleteOwnerModule() {
        // given
        String id = "SET_OWNER_ID_2";
        // when
        ownerModuleRepository.deleteById(id);
        // then
        List<OwnerModule> OwnerModule = ownerModuleRepository.findAll();
        assertEquals(2, OwnerModule.size());
        // verifica se excluiu registro
        assertEquals(Optional.empty(), ownerModuleRepository.findById(id));
    }    

    @Test
    @DisplayName("Falha ao inserir ownerModule com mesmo 'ownerModel e ownerId'.")
    void testException_DuplicateOwnerModule() {
        // given
        // Recupera segundo modulo criado e altera a chave.
        OwnerModule ownerModule = ownerModules.get(1);
        ownerModule.setId("ERROR_INDEX");
        // when
        Exception exception = assertThrows(DuplicateKeyException.class, () -> ownerModuleRepository.save(ownerModule));
        // then
        System.out.println(exception.getMessage());
        assertTrue(exception.getMessage().contains("rgf_receive.ownerModule index: ownerModel_ownerId dup key"));
    }

    @Test
    @DisplayName("Busca uma ocorrência de OwnerModule.")
    void testFindFirstByOwnerModelAndOwnerId() {
        // given
        // Recupera informação do segundo valor
        var ownerModule = ownerModules.get(1);
        // when
        var found = ownerModuleRepository.findFirstByOwnerModelAndOwnerId(ownerModule.getOwnerModel(), ownerModule.getOwnerId());
        // then
        assertTrue(found.isPresent());
        assertEquals(ownerModule.getId(), found.get().getId());//found.get().getId();
    }    

    @Test
    @DisplayName("Busca invalida por OwnerModule.")
    void testFindFirstByOwnerModelAndOwnerId_empty() {
        // given
        // when
        var found = ownerModuleRepository.findFirstByOwnerModelAndOwnerId("NOT_EXIST_MODEL", "NOT_EXIST_ID");
        // then
        assertFalse(found.isPresent());
        assertEquals(Optional.empty(), found);
    } 

}
