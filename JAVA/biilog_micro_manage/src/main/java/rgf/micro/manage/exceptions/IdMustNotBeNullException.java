package rgf.micro.manage.exceptions;

public class IdMustNotBeNullException extends RuntimeException {

    private static final long serialVersionUID = -5370331652733621905L;

    public IdMustNotBeNullException(String domain) {
        super(String.format("ID [%s] não pode ser Null", domain));
    }

}
