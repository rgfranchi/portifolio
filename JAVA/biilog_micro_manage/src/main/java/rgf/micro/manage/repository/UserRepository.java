package rgf.micro.manage.repository;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;
import rgf.micro.manage.domain.Users;

public interface UserRepository extends PagingAndSortingRepository<Users, Long> {
    Iterable<Users> findByCompanyId(Long id);

    Optional<Users> findByEmailAndPassword(String email, String password);

    Optional<Users> findByEmail(String email);
}
