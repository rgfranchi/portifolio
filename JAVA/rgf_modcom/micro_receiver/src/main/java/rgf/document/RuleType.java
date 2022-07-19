package rgf.document;

import lombok.Builder;
import lombok.Data;


/**
 * Regras que controla e define o tipo de mensagem.
 */
@Data
@Builder
public class RuleType {
    // Nome que será dado ao evento, Copiar para Event.typeEvent.
    private String typeEvent;
    // Expressão regular que localiza e/ou valida o evento
    private String regex;
    // Grupo(s) da expressão regular que localiza o valor do evento.
    private Integer[] groups;
    
    // Qual grupo da expressão está a data_hora do evento
    // Se -1 ignora dateTime do evento e utilizar expressão typeEvent='date_time'.
    @Builder.Default
    private Integer groupDateTime = -1;

    // Expressão que determina a data_hora.
    private String dateTimeExpression;

    // Continua a procurar.
    @Builder.Default
    private Boolean stopSearch = false;
}
