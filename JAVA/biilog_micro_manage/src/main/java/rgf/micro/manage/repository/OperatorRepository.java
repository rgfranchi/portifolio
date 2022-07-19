package rgf.micro.manage.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import rgf.micro.manage.domain.Operators;

public interface OperatorRepository extends PagingAndSortingRepository<Operators, Long> {
    Iterable<Operators> findByCompanyId(Long id);
}
