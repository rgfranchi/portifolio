package rgf.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import rgf.document.Event;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
}
