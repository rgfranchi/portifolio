package rgf.micro.manage.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import rgf.micro.manage.domain.Modules;

public interface ModuleRepository extends JpaRepository<Modules, Long> {
    Modules findFirstByTransmissionId(Long transmission_id);

    Set<Modules> findAllByCompanyId(Long companyId);
}
