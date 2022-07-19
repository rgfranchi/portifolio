package rgf.micro.manage.exceptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class MvcExceptionHandler {
    
    /**
     * Curso Spring ???
     * @param e -> Exceção capturada;
     * @return  -> lista com correncia de erro
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<String>> validationErrorHandler(ConstraintViolationException e){
        log.error("MvcExceptionHandler -> validationErrorHandler");
        List<String> errors = new ArrayList<>(e.getConstraintViolations().size());
        e.getConstraintViolations().forEach(constraintViolation -> {
            errors.add(constraintViolation.getPropertyPath() + " : " + constraintViolation.getMessage());
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    /**
     * Curso Spring ???
     * @param e -> Exceção capturada;
     * @return  -> lista com correncia de erro
     */
    @ExceptionHandler(BindException.class)
    public ResponseEntity<List<ObjectError>> handleBindException(BindException ex){
        log.error("MvcExceptionHandler -> handleBindException");
        return new ResponseEntity<>(ex.getAllErrors(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Erro de LÓGICA ao tentar excluir registro não existente.
     * @param e -> Exceção capturada;
     * @return  -> String com corrência de erro.
     */    
    @ExceptionHandler(DeleteNotFoundException.class)
    public ResponseEntity<String> handleDeleteNotFoundException(DeleteNotFoundException ex) {
        log.error("MvcExceptionHandler -> handleDeleteNotFoundException");
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.EXPECTATION_FAILED);
    }
    
    /**
     * Erro de LÓGICA ao tentar excluir registro não autorizado.
     * @param e -> Exceção capturada;
     * @return  -> String com corrência de erro.
     */    
    @ExceptionHandler(DeleteCannotBeException.class)
    public ResponseEntity<String> handleDeleteCannotBeException(DeleteCannotBeException ex) {
        log.error("MvcExceptionHandler -> handleDeleteCannotBeException");
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.EXPECTATION_FAILED);
    }

    /**
     * Erro de LÓGICA ao tentar atualizar registro não existente.
     * @param e -> Exceção capturada;
     * @return  -> String com corrência de erro.
     */     
    @ExceptionHandler(UpdateNotFoundException.class)
    public ResponseEntity<String> handleUpdateNotFoundException(UpdateNotFoundException ex) {
        log.error("MvcExceptionHandler -> handleDeleteNotFoundException");
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.EXPECTATION_FAILED);
    }

    /**
     * Violação das regras no banco de dados.
     * @param e -> Exceção capturada;
     * @return  -> String com corrência de erro.
     */     
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        log.error("MvcExceptionHandler -> handleDataIntegrityViolationException");
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.EXPECTATION_FAILED);
    }

    /**
     * Erro na entrada de dados recebida pelos model DTO.
     * @param e -> Exceção capturada;
     * @return  -> Objeto Map com corrências de erro.
     */        
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        log.error("MvcExceptionHandler -> handleMethodArgumentNotValidException");
        Map<String, String> mapErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            mapErrors.put(error.getCodes()[0], error.getDefaultMessage());
        });;
        return new ResponseEntity<Map<String,String>>(mapErrors, HttpStatus.EXPECTATION_FAILED);
    }    

}
