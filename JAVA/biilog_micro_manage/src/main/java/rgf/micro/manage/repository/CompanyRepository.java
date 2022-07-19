package rgf.micro.manage.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.model.CompanySelectDto;

public interface CompanyRepository extends PagingAndSortingRepository<Companies, Long> {
    @Query(value = "SELECT id, nome FROM #{#entityName}", nativeQuery = true)
    Iterable<CompanySelectDto> findAllCompanySelect();
}
