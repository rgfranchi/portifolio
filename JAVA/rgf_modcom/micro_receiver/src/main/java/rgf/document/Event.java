package rgf.document;

import java.time.LocalDateTime;
import javax.persistence.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document
@CompoundIndexes({
    @CompoundIndex(
        name = "module_codOperador_dateTime", 
        unique = true, 
        def = "{'module':1, 'codOperador':1, 'dateTime':-1}")
})
public class Event {
    @Id
    private String id;

    @Builder.Default
    String codOperator = "";
    // Armazena a linha recebida.
    private String raw;
    // tipo recebido de RuleType.typeEvent
    private String typeEvent;
    // data hora que ocorreu o evento
    // Determinado por groupDateTime e dateTimeExpression OU 
    // ou typeEvent=date_time 
    private LocalDateTime dateTime;
    // valor que corresponde ao evento.
    private String[] values; 

    // erro localizado no evento.
    @Builder.Default
    private String eventError = "";

    // modulo que executou o evento.
    @DocumentReference
    private Module module;

    @CreatedDate
    private LocalDateTime create;    
}
