package rgf.micro.manage.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import rgf.micro.manage.domain.Groups;

public interface GroupRepository extends PagingAndSortingRepository<Groups, Long> {
}
