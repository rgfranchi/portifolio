package rgf.micro.manage.services.helper;

import java.util.List;

/**
 * Interface Crud para execução dos serviços.<br>
 * Objetivo, evitar repetir código.<br>
 * 
 * @param T nome da classe de transição DTO (Data Transfer Object)
 */
public interface DefaultCRUDService<T> {
    Boolean create(T dto);

    Boolean update(T dto);

    List<T> listAll();

    T findById(Long id);

    Boolean delete(Long id);
}
