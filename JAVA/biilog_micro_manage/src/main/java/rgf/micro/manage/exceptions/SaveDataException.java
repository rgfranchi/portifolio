package rgf.micro.manage.exceptions;

public class SaveDataException extends RuntimeException {

    private static final long serialVersionUID = -1693069813164951158L;

    public SaveDataException(String message, String domain) {
        super(String.format("Falha ao Criar Registro [%s] ERRO [%s] ", domain, message));
    }

}
