package rgf.integration.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

/**
 * Realiza operações Regex para o sistema.
 */
@Service
public class RegexService {

    private String regex;
    private Pattern pattern;

    /**
     * Recebe expressão Regex de execução.<br>
     * Compila o valor.
     * 
     * @param regex
     */
    public void regexPatter(String regex) {
        this.regex = regex;
        this.pattern = Pattern.compile(regex);
    }

    /**
     * Recupera expressão Regex.
     * 
     * @return String da Regex enviada.
     */
    public String getRegex() {
        return this.regex;
    }

    /**
     * Recupera o padrão da execução Regex.
     * 
     * @return object do padrão executado.
     */
    public Pattern getPatter() {
        return this.pattern;
    }

    /**
     * Busca por exatamente a expressão regular enviada
     * 
     * @param value -> sentença.
     * @return
     */
    public boolean matches(String value) {
        Matcher matcher_obj = this.pattern.matcher(value);
        return matcher_obj.matches();
    }

    /**
     * Procura por uma ocorrência da expressão regular.
     * 
     * @param value -> sentença.
     * @return
     */
    public boolean lookingAt(String value) {
        Matcher matcher_obj = this.pattern.matcher(value);
        return matcher_obj.lookingAt();
    }

    /**
     * Retorna um valor da expressão regular na posição solicitada.
     * 
     * @param value
     * @param position
     * @return
     */
    public String loadByGroup(String value, Integer position) throws Exception {
        Matcher matcher_obj = this.pattern.matcher(value);
        matcher_obj.find();
        return matcher_obj.group(position);
    }

}
