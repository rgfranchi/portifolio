package rgf.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import rgf.document.Module;

@Repository
public interface ModuleRepository extends MongoRepository<Module, String> {
}
