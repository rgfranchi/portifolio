package rgf.integrationTest.database;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.time.LocalDateTime;
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
import rgf.document.Event;
import rgf.repository.EventRepository;

/**
 * DataMongoTest:
 * - Carrega '@Document' e 'MongoRepository'
 * - Não carrega outros contextos da aplicação.
 */
@DisplayName("Test Document Event")
@DataMongoTest
@ActiveProfiles("test")
public class EventRepositoryIT {

    // @Autowired
    // private MongoTemplate mongoTemplate;

    @Autowired
    private EventRepository eventRepository;

    private Event event;

    private List<Event> events; 

    @BeforeEach
    void setUp() {
        event = Event.builder()
            .id("SET_EVENT_ID")
            .codOperator("COD_OPERADOR")
            .typeEvent("EVENT NAME")
            .dateTime(LocalDateTime.parse("2022-01-01T10:10:10"))
            .values(new String[]{"0","A","B"})
            .build();
        events = List.of(
            Event.builder()
                .id("SET_EVENT_ID_1")
                .codOperator("COD_OPERADOR_1")
                .typeEvent("EVENT NAME_1")
                .dateTime(LocalDateTime.parse("2022-01-01T10:10:11"))
                .values(new String[]{"1","A","B"})
                .build(),
            Event.builder()
                .id("SET_EVENT_ID_2")
                .codOperator("COD_OPERADOR_2")
                .typeEvent("EVENT NAME_2")
                .dateTime(LocalDateTime.parse("2022-01-01T10:10:12"))
                .values(new String[]{"2","A","B"})
                .build(),
            Event.builder()
                .id("SET_EVENT_ID_3")
                .codOperator("COD_OPERADOR_3")
                .typeEvent("EVENT NAME_3")
                .dateTime(LocalDateTime.parse("2022-01-01T10:10:13"))
                .values(new String[]{"3","A","B"})
                .build()
        );
        eventRepository.saveAll(events);
    }


    @AfterEach
    void afterEach() {
        eventRepository.deleteAll();
    }

    @Test
    @DisplayName("Insere 1 evento no banco de dados.")
    void testCreateEvent() {
        // given
        List<Event> listEvents = eventRepository.findAll();
        assertEquals(3, listEvents.size());
        // when
        eventRepository.save(event);
        // then
        listEvents = eventRepository.findAll();
        assertEquals(4, listEvents.size());
        assertEquals(event.getId(), listEvents.get(3).getId());
        assertEquals(event.getCodOperator(), listEvents.get(3).getCodOperator());
        assertEquals(event.getTypeEvent(), listEvents.get(3).getTypeEvent());
        assertEquals(event.getDateTime(), listEvents.get(3).getDateTime());
        assertArrayEquals(event.getValues(), listEvents.get(3).getValues());
    }


    @Test
    @DisplayName("Atualiza 'cod_operador' do evento.")
    void testUpdateEvent() {
        // given
        String id = "SET_EVENT_ID_2";
        Event changeEvent = eventRepository.findById(id).get();
        String newOperator = "NEW COD_OPERADOR";
        // when
        changeEvent.setCodOperator(newOperator);
        eventRepository.save(changeEvent);
        // then
        List<Event> listEvents = eventRepository.findAll();
        assertEquals(3, listEvents.size());
        // verifica se atualizou operador
        assertEquals(newOperator, listEvents.get(1).getCodOperator());
    }

    @Test
    @DisplayName("Exclui evento.")
    void testDeleteEvent() {
        // given
        String id = "SET_EVENT_ID_2";
        // when
        eventRepository.deleteById(id);
        // then
        List<Event> listEvents = eventRepository.findAll();
        assertEquals(2, listEvents.size());
        // verifica se excluiu registro
        assertEquals(Optional.empty(), eventRepository.findById(id));
    }    


    @Test
    @DisplayName("Falha ao inserir evento com mesmo 'dateTime, module e codOperator'.")
    void testException_DuplicateEvent() {
        // given
        // Recupera segundo evento criado e altera a chave.
        Event event = events.get(1);
        event.setId("ERROR_INDEX");
        // when
        Exception exception = assertThrows(DuplicateKeyException.class, () -> eventRepository.save(event));
        // then
        assertTrue(exception.getMessage().contains("rgf_receive.event index: module_codOperator_dateTime dup key"));
    }

}
