package rgf.bootstrap;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import rgf.document.Event;
import rgf.document.Module;
import rgf.document.OwnerModule;
import rgf.document.RuleEvent;
import rgf.document.RuleType;
import rgf.repository.EventRepository;
import rgf.repository.ModuleRepository;
import rgf.repository.OwnerModuleRepository;
import rgf.repository.RuleEventRepository;

@Component
public class InsertMongoDB implements ApplicationRunner {

    @Autowired
    private OwnerModuleRepository ownerModuleRepository;

    @Autowired
    private RuleEventRepository ruleEventRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        ownerModuleRepository.deleteAll();
        ruleEventRepository.deleteAll();
        moduleRepository.deleteAll();
        eventRepository.deleteAll();

        // Teste Duplica registro (teste index único) -> erro chave duplicada
        // OwnerModule ownerModule = OwnerModule.builder().ownerId("ID_COMPANY").ownerModel("company").build();
        // ownerModuleRepository.save(ownerModule);

        System.out.println("Insere mensagens no banco de dados -> MessageModule.");
        // Gera eventos.


        // List<Operator> listOperators = new ArrayList<Operator>();
        // listOperators.add(Operator.builder().cod_operador("COD_OPERADOR-A").events(listEventsA).build());
        // listOperators.add(Operator.builder().cod_operador("COD_OPERADOR-B").events(listEventsB).build());



        // Cria proprietário dos módulos.
        OwnerModule ownerModule = OwnerModule.builder().id("62b45f018c4b017f36c8efb8").ownerId("ID_COMPANY").ownerModel("company").build();
        ownerModuleRepository.save(ownerModule);
        
        // Cria cria regras dos eventos
        var ruleTypes = List.of(
            RuleType.builder().typeEvent("type1").regex("REGEX1").groups(new Integer[]{1,2,3}).build(),
            RuleType.builder().typeEvent("type2").regex("REGEX2").groups(new Integer[]{2,3,1}).build(),
            RuleType.builder().typeEvent("type3").regex("REGEX3").groups(new Integer[]{3,2,1}).build()
        );
        RuleEvent ruleEvent = RuleEvent.builder().id("321asd3a2as3d2as3d").ownerModule(ownerModule).name("RULE EVENT 1").version("0.1.1").ownerModule(ownerModule).ruleTypes(ruleTypes).build();
        ruleEventRepository.save(ruleEvent);

        // Cria módulos.
        Module module1 = Module.builder().id("62b45f018c4b017f36c8efb6").ownerModule(ownerModule).codModule("COD_MOD_002").ruleName("REGRA 2").ruleVersion("0.0.0").build();
        Module module2 = Module.builder().id("62b45f018c4b017f36c8efb7").ownerModule(ownerModule).codModule("COD_MOD_001").ruleName("REGRA 1").ruleVersion("0.0.0").build();
        moduleRepository.save(module1);
        moduleRepository.save(module2);
        

        // Cria eventos.
        List<Event> listEventsA = new ArrayList<Event>();
        listEventsA.add(Event.builder().module(module2).raw("RAW_EVENT_LIGOU").typeEvent("ligouA").values(new String[]{"1"}).dateTime(LocalDateTime.parse("2022-01-01T10:10:05")).build());
        listEventsA.add(Event.builder().module(module2).raw("RAW_EVENT_IMPACTO").typeEvent("impactoA").values(new String[]{"1"}).dateTime(LocalDateTime.parse("2022-01-01T10:10:01")).build());
        listEventsA.add(Event.builder().module(module2).raw("RAW_EVENT_VELOCIDADE").typeEvent("velocidadeA").values(new String[]{"10"}).dateTime(LocalDateTime.parse("2022-01-01T10:10:03")).build());
        listEventsA.add(Event.builder().module(module2).raw("RAW_EVENT_DESLIGOU").typeEvent("desligouA").values(new String[]{"11156846498"}).dateTime(LocalDateTime.parse("2022-01-01T10:10:07")).build());
        eventRepository.saveAll(listEventsA);

        List<Event> listEventsB = new ArrayList<Event>();
        listEventsB.add(Event.builder().module(module1).typeEvent("ligouB").values(new String[]{"1"}).dateTime(LocalDateTime.parse("2022-01-01T10:11:05")).build());
        listEventsB.add(Event.builder().module(module1).typeEvent("checklistB").values(new String[]{"11156846498"}).dateTime(LocalDateTime.parse("2022-01-01T10:11:01")).build());
        listEventsB.add(Event.builder().module(module1).typeEvent("velocidadeB").values(new String[]{"11156846498"}).dateTime(LocalDateTime.parse("2022-01-01T10:11:03")).build());
        listEventsB.add(Event.builder().module(module1).typeEvent("desligouB").values(new String[]{"11156846498"}).dateTime(LocalDateTime.parse("2022-01-01T10:11:07")).build());
        eventRepository.saveAll(listEventsB);





        // Atualiza com novo módulo.
        // Module update = Module.builder().id("62b45f028c4b017f36c8efb9").codModulo("COD_MOD_003").ruleName("REGRA 3").ruleVersion("0.0.0").build();
        // moduleRepository.save(update);
        
        // OwnerModule ownerModule_update = ownerModuleRepository.findById(ownerModule.getId()).get();
        // ownerModule_update.getModules().add(update);
        // ownerModuleRepository.save(ownerModule_update);

        System.out.println("Show OWNER BY model e id");
        ownerModuleRepository.findFirstByOwnerModelAndOwnerId("company", "ID_COMPANY").stream().forEach(value -> {
            System.out.println(value.getOwnerModel());
            System.out.println(value.getOwnerId());
            System.out.println("-->Show MODULE by OWNER");
            value.getModules().stream().forEach(module -> {
                System.out.println(module.getRuleName());
                System.out.println(module.getRuleVersion());
            });
        });

        System.out.println("Show RULE_EVENT BY ownerModule, name e version");
        ruleEventRepository.findFirstByOwnerModuleAndNameAndVersion(ownerModule, ruleEvent.getName(), ruleEvent.getVersion()).stream().forEach(value -> {
            System.out.println(value.getName());
            System.out.println(value.getVersion());
            System.out.println("-->Show RULE_TYPES by RULE_EVENT");
            value.getRuleTypes().stream().forEach(types -> {
                System.out.println(types.getRegex());
                System.out.println(types.getGroups().toString());
            });
        });

        System.out.println("-->Show OWNER");
        ownerModuleRepository.findAll().stream().forEach(value -> {
            System.out.println(value.getOwnerModel());
            System.out.println(value.getOwnerId());
            System.out.println("-->Show MODULE by OWNER");
            value.getModules().stream().forEach(module -> {
                System.out.println(module.getRuleName());
                System.out.println(module.getRuleVersion());
            });
            System.out.println("-->Show EVENTS by OWNER");
            value.getRuleEvents().stream().forEach(event -> {
                System.out.println(event.getName());
                System.out.println(event.getVersion());
            });
        });
        System.out.println("---->Show MODULE");
        moduleRepository.findAll().stream().forEach(module -> {
            System.out.println(module.getRuleName());
            System.out.println(module.getRuleVersion());
            System.out.println(module.getOwnerModule().getOwnerModel());
            System.out.println("------>Show EVENTS by MODULE");
            module.getEvents().stream().forEach(events -> {
                System.out.println(events.getTypeEvent());
                System.out.println(events.getValues()[0]);
            });
        });
        System.out.println("-------->Show Events");
        eventRepository.findAll().stream().forEach(events -> {
            System.out.println(events.getTypeEvent());
            System.out.println(events.getModule().getRuleName());            
            System.out.println(events.getModule().getRuleVersion());            
            System.out.println(events.getModule().getOwnerModule().getOwnerModel());            
        });        

    }

}
