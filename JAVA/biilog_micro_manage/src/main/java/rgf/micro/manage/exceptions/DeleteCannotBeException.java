package rgf.micro.manage.exceptions;

public class DeleteCannotBeException extends RuntimeException {

    private static final long serialVersionUID = -8442345732358731485L;

    public DeleteCannotBeException(Long id, String domain ) {
        super(String.format("Registro [%s] ID [%d] não pode ser Excluido",domain, id));
    }
}
