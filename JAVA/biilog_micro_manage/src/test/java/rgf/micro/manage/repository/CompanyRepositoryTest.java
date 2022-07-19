package rgf.micro.manage.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.stream.StreamSupport;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.model.CompanySelectDto;

@SpringBootTest
public class CompanyRepositoryTest {

    @Autowired
    CompanyRepository companyRepository;

    @Test
    void testReadAllCompanies() {
        Iterable<Companies> list = companyRepository.findAll();
        Long total = StreamSupport.stream(list.spliterator(), false).count();
        assertEquals(4L, total);
    }

    @Test
    void testReadAllCompaniesSelect() {
        Iterable<CompanySelectDto> list = companyRepository.findAllCompanySelect();
        // list.forEach(new Consumer<CompanySelectDto>() {
        // @Override
        // public void accept(CompanySelectDto t) {
        // System.out.println(t.getId());
        // System.out.println(t.getNome());
        // System.out.println(t.getIdNome("XPTO:"));
        // System.out.println("----------");

        // }
        // });

        Long total = StreamSupport.stream(list.spliterator(), false).count();

        System.out.println("Result:" + total);
        assertEquals(4L, total);
    }

}
