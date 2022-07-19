package rgf.micro.manage.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import rgf.micro.manage.domain.Places;

public interface PlaceRepository extends PagingAndSortingRepository<Places, Long> {
    Iterable<Places> findByCompanyId(Long id);
}
