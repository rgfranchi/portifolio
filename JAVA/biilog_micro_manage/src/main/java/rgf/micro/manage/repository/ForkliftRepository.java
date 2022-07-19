package rgf.micro.manage.repository;

import java.util.Optional;

// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import rgf.micro.manage.domain.Forklifts;

public interface ForkliftRepository extends CrudRepository<Forklifts, Long> {
    Optional<Forklifts> findFirstByModuleId(Long moduleId);

    Iterable<Forklifts> findAllByModuleCompanyId(Long companyId);

}
