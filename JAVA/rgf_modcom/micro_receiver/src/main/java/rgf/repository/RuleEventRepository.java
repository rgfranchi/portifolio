package rgf.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import rgf.document.OwnerModule;
import rgf.document.RuleEvent;

@Repository
public interface RuleEventRepository extends MongoRepository<RuleEvent, String> {
    Optional<RuleEvent> findFirstByNameAndVersion(String name, String version);
    Optional<RuleEvent> findFirstByOwnerModuleAndNameAndVersion(OwnerModule ownerModule, String name, String version);
}
