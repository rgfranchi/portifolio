package rgf.micro.manage.exceptions;

public class DeleteNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -8442345732358731485L;

    /**
     * Falha na tentativa de localizar registro para excluir
     * 
     * @param id     -> para exclusão.
     * @param domain -> Nome da classe do dominio.
     */
    public DeleteNotFoundException(Long id, String domain) {
        super(String.format("Não foi localizado [%s] ID [%d] para excluir ", domain, id));
    }
}
