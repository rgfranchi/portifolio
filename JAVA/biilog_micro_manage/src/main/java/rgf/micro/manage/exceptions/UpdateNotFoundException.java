package rgf.micro.manage.exceptions;

public class UpdateNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -243358107020375245L;

    public UpdateNotFoundException(Long id, String domain) {
        super(String.format("Não foi localizado [%s] ID [%d] para atualizar ",domain, id));
    }

}
