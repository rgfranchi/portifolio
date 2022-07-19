package rgf.micro.manage.bootstrap;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Authorities;
import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Groups;
import rgf.micro.manage.domain.Users;
import rgf.micro.manage.domain.Users.UsersBuilder;
import rgf.micro.manage.repository.AuthorityRepository;
import rgf.micro.manage.repository.CompanyRepository;
import rgf.micro.manage.repository.GroupRepository;
import rgf.micro.manage.repository.UserRepository;

@RequiredArgsConstructor
@Component()
@Order(3)
public class UserBootstrap implements CommandLineRunner {
        private final CompanyRepository companyRepository;
        private final GroupRepository groupRepository;
        private final PasswordEncoder passwordEncoder;
        private final AuthorityRepository authorityRepository;
        private final UserRepository userRepository;

        @Override
        public void run(String... args) throws Exception {
                loadUsers();
        }

        private void loadUsers() {
                if (userRepository.count() == 0) {

                        // company
                        Authorities company_create = authorityRepository.save(Authorities.builder()
                                        .permission("company.create").label("Nova Empresa").path("/new").build());
                        Authorities company_read = authorityRepository.save(Authorities.builder()
                                        .permission("company.read").label("Empresas").path("/company").build());
                        Authorities company_update = authorityRepository.save(
                                        Authorities.builder().permission("company.update").path("/update").build());
                        Authorities company_delete = authorityRepository.save(
                                        Authorities.builder().permission("company.delete").path("/delete").build());
                        Authorities company_select = authorityRepository.save(Authorities.builder()
                                        .permission("company.dropdown").path("/findDropdown").build());

                        Groups group_root = groupRepository.save(Groups.builder().nome("Administrador")
                                        .authorities(new HashSet<>(Set.of(company_create, company_read, company_update,
                                                        company_delete, company_select)))
                                        .build());
                        Groups group_adm = groupRepository.save(Groups.builder().nome("Administrador").authorities(
                                        new HashSet<>(Set.of(company_create, company_read, company_update))).build());
                        Groups group_basic = groupRepository.save(Groups.builder().nome("Cliente")
                                        .authorities(new HashSet<>(Set.of(company_read))).build());

                        // Authorities authority_admin =
                        // authorityRepository.save(Authorities.builder().role("ROLE_ADMIN").build());
                        // Authorities authocompany_createrity_basic =
                        // authorityRepository.save(Authorities.builder().role("ROLE_BASIC").build());

                        Companies biilog = companyRepository.findById(1L).get();
                        Companies wine = companyRepository.findById(2L).get();
                        Companies lincoLn = companyRepository.findById(3L).get();
                        Companies cnhi = companyRepository.findById(4L).get();

                        // Groups group_root = groupRepository.findById(1L).get();
                        // Groups group_adm = groupRepository.findById(2L).get();
                        // Groups group_basic = groupRepository.findById(3L).get();

                        UsersBuilder developer = Users.builder();
                        developer.company(biilog);
                        developer.nome("Rafael Guerra Franchi");
                        developer.email("guerra@biilog.com");
                        developer.password(passwordEncoder.encode("root"));
                        developer.group(group_root);
                        userRepository.save(developer.build());

                        UsersBuilder administrador = Users.builder();
                        administrador.company(biilog);
                        administrador.nome("Edmondo ... ");
                        administrador.email("edmondo@biilog.com"); // Fake
                        administrador.password(passwordEncoder.encode("root"));
                        administrador.group(group_root);
                        userRepository.save(administrador.build());

                        UsersBuilder cliente_wine = Users.builder();
                        cliente_wine.company(wine);
                        cliente_wine.nome("wine");
                        cliente_wine.email("wine@adm.com");
                        cliente_wine.password(passwordEncoder.encode("adm"));
                        cliente_wine.group(group_adm);
                        userRepository.save(cliente_wine.build());

                        UsersBuilder cliente_lincoLn = Users.builder();
                        cliente_lincoLn.company(lincoLn);
                        cliente_lincoLn.nome("lincoln");
                        cliente_lincoLn.email("lincoln@adm.com");
                        cliente_lincoLn.password(passwordEncoder.encode("adm"));
                        cliente_lincoLn.group(group_adm);
                        userRepository.save(cliente_lincoLn.build());

                        UsersBuilder cliente_cnhi = Users.builder();
                        cliente_cnhi.company(cnhi);
                        cliente_cnhi.nome("cnhi");
                        cliente_cnhi.email("cnhi@adm.com");
                        cliente_cnhi.password(passwordEncoder.encode("adm"));
                        cliente_cnhi.group(group_basic);
                        userRepository.save(cliente_cnhi.build());

                        UsersBuilder teste = Users.builder();
                        teste.company(biilog);
                        teste.nome("Usuário teste acesso");
                        teste.email("teste@teste.com");
                        teste.password(passwordEncoder.encode("teste"));
                        teste.group(group_adm);
                        userRepository.save(teste.build());

                }
        }
}
