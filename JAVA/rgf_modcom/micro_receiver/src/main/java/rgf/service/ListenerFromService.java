package rgf.service;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pojo.integration.IntegrationMessage;
import pojo.integration.RuleMessage;
import rgf.document.Event;
import rgf.document.OwnerModule;
import rgf.document.RuleEvent;
import rgf.document.RuleType;
import rgf.repository.OwnerModuleRepository;
import rgf.repository.RuleEventRepository;

@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Service
public class ListenerFromService {

    @Autowired
    private OwnerModuleRepository ownerModuleRepository;
    
    @Autowired
    private RuleEventRepository ruleEventRepository;

    private String eventError = "";

    public RuleEvent loadRuleEvent(IntegrationMessage integrationMessage) {
        RuleMessage ruleMessage = integrationMessage.getRuleMessage();
        // busca pelo dono da regra.
        Optional<OwnerModule> optOwnerModule = ownerModuleRepository.findFirstByOwnerModelAndOwnerId(ruleMessage.getOwnerModel(), ruleMessage.getOwnerId());
        if(!optOwnerModule.isPresent()) {
            log.info("Tratar se ownerModule não existente.");
            return null;
        }
        // busca pela regra.
        Optional<RuleEvent> optRuleEvent = ruleEventRepository.findFirstByOwnerModuleAndNameAndVersion(optOwnerModule.get(), ruleMessage.getName(), ruleMessage.getVersion());
        if(!optRuleEvent.isPresent()) {
            log.info("Tratar se ruleEvent não existente.");
            return null;
        }

        this.extractEventMessage(integrationMessage.getMessage(), optRuleEvent.get());

        log.info(integrationMessage.getMessage());
        return optRuleEvent.get();
    }


    /**
     * Extrai da mensagem os eventos conforme a regras (Regex).
     * Eventos com campo específico:
     * -- date_time: retorna para o campo dateTime do evento.
     * -- cod_operator: retorna para codOperator do evento.
     * @todo: many_events criar função para ler um conjunto de evento na mesma string.
     * @param optRuleEvent -> regras para o evento
     * @param message -> mensagem do evento.
     * @return -> evento.
     */
    public Event extractEventMessage(String message, RuleEvent optRuleEvent) {
        Event event = Event.builder().build();
        event.setRaw(message);
        optRuleEvent.getRuleTypes().forEach(ruleType -> {
            event.setTypeEvent(ruleType.getTypeEvent());
            switch(ruleType.getTypeEvent()) {
                case "date_time" :
                    event.setDateTime(this.regexDateTime(message, ruleType));
                    break;
                case "cod_operator" :
                    event.setCodOperator(this.regexCodOperator(message, ruleType));
                    break;
                default :
                    event.setValues(regexValue(message, ruleType));
            }
        });
        event.setEventError(eventError);
        return event;
    }


    /**
     * Valor(es) do evento utilizando RuleType.getRegex()
     * @param message
     * @param ruleType
     * @return
     */
    public String[] regexValue(String message, RuleType ruleType) {
        // String type = ruleType.getTypeEvent();
        Integer[] groups = ruleType.getGroups();
        // System.out.println(regex);
        // System.out.println(type);
        // System.out.println(groups.toString());
        Pattern pattern = Pattern.compile(ruleType.getRegex());
        Matcher matcher = pattern.matcher(message);
        if(matcher.lookingAt()) {
            List<String> currentEvents = new ArrayList<String>();
            Arrays.stream(groups).forEach(pos -> {
                // System.out.println(matcher.group(pos));
                currentEvents.add(matcher.group(pos));
            });
            return currentEvents.toArray(String[]::new); 
        } else {
            eventError = "NOT_FOUND_EVENT";
            log.info("Tratar se não coincidir ocorrências");
        }
        return null;
    }


    /**
     * Busca na mensagem a informação de data_hora do evento utilizando RuleType.getRegex().
     * Group define a posição de cada parâmetro.
     *  :group   :variável       - default
     *  [0]      :year           - 1970
     *  [1]      :month          - 1
     *  [2]      :dayOfMonth     - 1
     *  [3]      :hour           - 0
     *  [4]      :minute         - 0
     *  [5]      :second         - 0
     *  [6]      :nanoOfSecond   - 0
     * Ignorar Posição enviar '-1'
     * @param message -> mensagem recebida.
     * @param ruleType -> regra de recebimento da mensagem
     * @return -> LocalDateTime convertido
     */
    public LocalDateTime regexDateTime(String message, RuleType ruleType) {
        
        List<Integer> groups = new ArrayList<Integer>(Arrays.asList(ruleType.getGroups()));
        Pattern pattern = Pattern.compile(ruleType.getRegex());
        Matcher matcher = pattern.matcher(message);

        // ajusta array para o numero de parâmetros.
        while(groups.size() < 7) {
            groups.add(-1);
        }

        if(matcher.find()) {
            // unix start date, hora zero
            Integer year = 1970,month=1,dayOfMonth=1,hour=1,minute=0,second=0,nanoOfSecond = 0; 
            for (int index = 0; index < groups.size(); index++) {
                if(groups.get(index) == -1) continue;
                Integer value = Integer.parseInt(matcher.group(groups.get(index)));
                switch(index) {
                    case 0: 
                        year = value;
                        break;
                    case 1:
                        month = value;
                        break;
                    case 2:
                        dayOfMonth = value;
                        break;
                    case 3:
                        hour = value;
                        break;
                    case 4:
                        minute = value;
                        break;
                    case 5:
                        second = value;
                        break;
                    case 6:
                        nanoOfSecond = value;
                        break;
                    default:
                }
            }
            try {
                return LocalDateTime.of(year, month, dayOfMonth, hour, minute, second, nanoOfSecond);
            } catch (DateTimeException e) {
                log.error("DATE_TIME_MESSAGE: ", "%s", e.getMessage());
                eventError = e.getMessage();
            }
        } else {
            eventError = "NOT_FOUND_DATE_TIME";
        }
        return null;
    }

    /**
     * Recupera código do operador utilizando RuleType.getRegex()
     * @param message
     * @param ruleType
     * @return
     */
    public String regexCodOperator(String message, RuleType ruleType) {
        return null;
    }

    /**
     * Recupera erro.
    */
    public String getEventError() {
        return this.getEventError();
    }

}
