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
    @CompoundIndex(name = "ownerModel_ownerId", unique = true , def = "{'ownerModel':1, 'ownerId':1}")
})
public class OwnerModule {
    @Id
    private String id;
    // Model a quem pertence a mensagem (busca a regra)
    private String ownerModel;
    // id do Model
    private String ownerId;

    @ReadOnlyProperty
    @DocumentReference(lazy = true, lookup = "{ 'ownerModule' : ?#{#self._id} }")
    private List<Module> modules;

    @ReadOnlyProperty
    @DocumentReference(lazy = true, lookup = "{ 'ownerModule' : ?#{#self._id} }")    
    private List<RuleEvent> ruleEvents;
}
