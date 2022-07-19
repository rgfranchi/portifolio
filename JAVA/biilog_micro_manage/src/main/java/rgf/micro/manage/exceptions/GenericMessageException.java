package rgf.micro.manage.exceptions;

public class GenericMessageException extends RuntimeException {

    private static final long serialVersionUID = 7177591604583703522L;

    public GenericMessageException(String message) {
        super(message);
    }
}
