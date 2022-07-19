package rgf.micro.manage.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import rgf.micro.manage.domain.Authorities;

public interface AuthorityRepository extends PagingAndSortingRepository<Authorities, Long> {
}
