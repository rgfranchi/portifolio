package rgf.document;

import java.util.List;
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
    @CompoundIndex(name = "name_version", unique = true , def = "{'name':1, 'version':1}")
})
public class RuleEvent {
    
    private String id;

    private String name;

    private String version;

    private List<RuleType> ruleTypes; 

    @DocumentReference
    private OwnerModule ownerModule;
}
