package rgf.document;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
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
        name = "codModulo_ruleName_ruleVersion", 
        unique = true, 
        def = "{'codModulo':1, 'ruleName':1, 'ruleVersion':1}"),
})
public class Module {
    @Id
    private String id;
    
    //codModulo
    private String codModule;    
    // Nome da regra
    private String ruleName;
    // versão da regra
    private String ruleVersion;

    @DocumentReference
    private OwnerModule ownerModule;

    @ReadOnlyProperty
    @DocumentReference(lazy = true, lookup = "{ 'module' : ?#{#self._id} }")    
    private List<Event> events;

    //@CreatedDate/@ModifiedDate

}
