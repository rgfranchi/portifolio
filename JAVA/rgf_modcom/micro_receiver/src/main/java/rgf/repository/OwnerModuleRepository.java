package rgf.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import rgf.document.OwnerModule;

@Repository
public interface OwnerModuleRepository extends MongoRepository<OwnerModule, String> {
    Optional<OwnerModule> findFirstByOwnerModelAndOwnerId(String ownerModel, String ownerId);
}
