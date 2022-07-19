package rgf.micro.manage.model;

import org.springframework.beans.factory.annotation.Value;

// https://stackoverflow.com/questions/29082749/spring-data-jpa-map-the-native-query-result-to-non-entity-pojo
// https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#projections
public interface CompanySelectDto {
    public Long getId();

    public String getNome();

    // exemplo de acesso aos campos como objeto.
    @Value("#{args[0] + ' - ' + target.id + '  ' + target.nome + '!'}")
    public String getIdNome(String arg0);
}
