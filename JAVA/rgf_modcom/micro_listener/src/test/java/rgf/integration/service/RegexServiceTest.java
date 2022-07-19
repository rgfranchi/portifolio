package rgf.integration.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Field;
import java.util.regex.Pattern;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RegexServiceTest {

    RegexService regexService;

    String regexExample1_OK;
    String regexExample1_ERROR;

    @BeforeEach
    void setUp() {
        regexService = new RegexService();
        regexExample1_OK = "(MODULE_TESTE.)([0-9A-Z_]*)";
        regexExample1_ERROR = "(MODULE_TESTE.([0-9A-Z_]*)";
    }

    @Test
    @DisplayName("Acesso ao objeto Patter informação da expressão enviada.")
    void testGetPatter() {
        // given
        regexService.regexPatter(regexExample1_OK);
        // when
        Pattern pattern = regexService.getPatter();
        // then
        assertEquals(regexExample1_OK, pattern.pattern());
    }

    @Test
    @DisplayName("Acesso a expressão enviada.")
    void testGetRegex() {
        // given
        regexService.regexPatter(regexExample1_OK);
        // when
        String ret = regexService.getRegex();
        // then
        assertEquals(regexExample1_OK, ret);
    }

    @Test
    @DisplayName("Retorna grupos da expressão regular.")
    void testLoadByGroup() throws Exception {
        // given
        regexService.regexPatter(regexExample1_OK);
        // when
        String texto = "MODULE_TESTE VALOR0001";
        String ret0 = regexService.loadByGroup(texto, 0);
        String ret1 = regexService.loadByGroup(texto, 1);
        String ret2 = regexService.loadByGroup(texto, 2);
        // then
        System.out.println(ret0);
        System.out.println(ret1);
        System.out.println(ret2);
        assertEquals(texto, ret0.trim());
        assertEquals("MODULE_TESTE", ret1.trim());
        assertEquals("VALOR0001", ret2.trim());
    }

    public RegexServiceTest() {}

    @Test
    @DisplayName("Possuir pelo menos uma correspondência")
    void testLookingAt() {
        // given
        regexService.regexPatter(regexExample1_OK);
        // when
        Boolean ret_true = regexService.lookingAt("MODULE_TESTE VALOR0001 VALOR0002");
        Boolean ret_false = regexService.lookingAt("_TESTE VALOR0001");
        // then
        assertTrue(ret_true);
        assertFalse(ret_false);
    }

    @Test
    @DisplayName("Resposta da expressão deve ser exatamente igual")
    void testMatches() {
        // given
        regexService.regexPatter(regexExample1_OK);
        // when
        Boolean ret_true = regexService.matches("MODULE_TESTE VALOR0001");
        Boolean ret_false = regexService.matches("MODULE_TESTE VALOR0001 VALOR0002");
        // then
        assertTrue(ret_true);
        assertFalse(ret_false);
    }

    @Test
    @DisplayName("Insere variáveis para leitura regex.")
    void testRegexPatter()
            throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
        // given
        // when
        regexService.regexPatter(regexExample1_OK);
        // lê valores privado.
        Field regex = RegexService.class.getDeclaredField("regex");
        regex.setAccessible(true);
        Field pattern = RegexService.class.getDeclaredField("pattern");
        pattern.setAccessible(true);
        // then
        assertEquals(regexExample1_OK, (String) regex.get(regexService));
        Pattern retPatter = (Pattern) pattern.get(regexService);
        assertEquals(regexExample1_OK, retPatter.pattern());
    }

    @Test
    @DisplayName("Verifica se expressão com erro.")
    void testRegexPatter_ERRO() {
        try {
            // given
            regexService.regexPatter(regexExample1_ERROR);
            // when
        } catch (Exception e) {
            // then
            assertEquals("Unclosed group near index 26\n(MODULE_TESTE.([0-9A-Z_]*)", e.getMessage());
            log.info(e.getMessage());
        }
    }
}
