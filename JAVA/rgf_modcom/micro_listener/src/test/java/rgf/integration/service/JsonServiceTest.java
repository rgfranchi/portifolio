package rgf.integration.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import pojo.integration.ListenerMessage;
import pojo.integration.RuleMessage;
import pojo.integration.TypeListenerMessage;

@DisplayName("Conversões dos Arquivos JSON")
@ExtendWith(MockitoExtension.class)
public class JsonServiceTest {

    private String fileDefaultJson = "default_rules";
    private String strJson = "{\"name\":\"TESTE\",\"version\":\"0.1\",\"ownerId\":null,\"regex\":\"EXPRESSION\",\"typeMessageListener\":\"CONFIG\",\"exact\":false,\"text\":\"RESPONSE\",\"messageListener\":{\"rule1\":\"exec1\",\"rule3\":\"exec3\",\"rule2\":\"exec2\"}}";
    private RuleMessage ruleMessage;

    @Mock
    ResourceLoader resourceLoader;

    @Mock
    Resource resource;

    @InjectMocks
    private JsonService jsonService;

    @BeforeEach
    void setUp() {
        this.ruleMessage = RuleMessage.builder().build();

        ListenerMessage listenerMessage = this.ruleMessage.getListenerMessage();
        listenerMessage.setTypeMessageListener(TypeListenerMessage.CONFIG);
        listenerMessage.setExact(false);
        listenerMessage.setMessageResponse("RESPONSE");
        listenerMessage.setMessageNotFound("RESPONSE_NOT_FOUND");

        this.ruleMessage.setName("TESTE");
        this.ruleMessage.setRegex("EXPRESSION");
        this.ruleMessage.setVersion("0.1");

        // this.ruleMessage.setListenerMessage(listenerMessage);
    }

    @DisplayName("Verifica existência do arquivo default")
    @Test
    void testLoadDefaultFile() throws URISyntaxException {
        ClassLoader classLoader = getClass().getClassLoader();
        URL resource = classLoader.getResource(String.format("json/%s.json", fileDefaultJson));
        File file = new File(resource.toURI());
        assertTrue(file.exists());
    }

    @DisplayName("Arquivo inexistente, carrega (/test/resources/json/default_rules.json)")
    @Test
    void testRulesFile_default() throws IOException {
        // given
        String not_exist = "not_exist";
        givenLoadFile(not_exist, false);
        given(resourceLoader.getResource(String.format("classpath:json/%s.json", not_exist)))
                .willReturn(resource); // resposta para arquivo solicitado
        given(resourceLoader.getResource(String.format("classpath:json/%s.json", fileDefaultJson)))
                .willReturn(resource); // resposta para arquivo não encontrado

        // when
        List<RuleMessage> jsonRules = jsonService.rulesFile(not_exist);
        RuleMessage rule = jsonRules.get(0);
        // then
        // 6 Regras padrão.
        assertTrue(jsonRules.size() >= 6);
        assertEquals("Default Regra I - Responde KEEP ALIVE", rule.getName());
    }

    @DisplayName("Carrega arquivo (/test/resources/json/9000.json)")
    @Test
    void testRulesFile_9000() throws IOException {
        String fileName = "9000";
        // given
        givenLoadFile(fileName, true);
        given(resourceLoader.getResource(String.format("classpath:json/%s.json", fileName)))
                .willReturn(resource); // resposta para arquivo solicitado
        // when
        List<RuleMessage> jsonRules = jsonService.rulesFile(fileName);
        RuleMessage rule = jsonRules.get(0);
        // then
        assertTrue(jsonRules.size() == 2);
        assertEquals("TESTE FILE 9000 Regra IV - INCLUI MENSAGEM NA FILA DE EVENTO", rule.getName());
    }

    /**
     * Carrega MOCK Resource
     * Se 'exist' for true retorna o arquivo de fileNameGiven se não fileDefaultJson
     * 
     * @param fileNameGiven -> nome do arquivo que será carregado no mock.
     * @param exist         -> se o arquivo existe
     * @throws URISyntaxException
     * @throws IOException
     */
    private void givenLoadFile(String fileNameGiven, Boolean exist) {
        try {
            String fileNameLoad = exist ? fileNameGiven : fileDefaultJson;

            given(resource.exists()).willReturn(exist); // cria resposta interna de
                                                        // existência.
            ClassLoader classLoader = getClass().getClassLoader();
            URL urlResource = classLoader.getResource(String.format("json/%s.json", fileNameLoad));
            File file = new File(urlResource.toURI());
            given(resource.getFile()).willReturn(file); // cria resposta interna com arquivo.
        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Disabled("Funcionalidade em desuso")
    @DisplayName("Converte Objeto MAP para String JSON")
    @Test
    void testMapToJson() {
        String actual = jsonService.mapToJson(ruleMessage);
        assertEquals(this.strJson, actual.replaceAll("\n", "").replaceAll(" ", ""));
    }

    @Disabled("Funcionalidade em desuso")
    @DisplayName("Converte String JSON para Objeto MAP")
    @Test
    void testJsonToMap() {
        Map<String, Object> expected = jsonService.jsonToMap(this.strJson);

        assertEquals(expected.get("name").toString(), "TESTE");
        assertEquals(expected.get("exact"), false);

        assertTrue(expected.get("messageListener").toString().contains("rule3=exec3"));
        assertTrue(expected.get("messageListener").toString().contains("rule1=exec1"));
        assertTrue(expected.get("messageListener").toString().contains("rule2=exec2"));
    }

    @Disabled("Funcionalidade em desuso")
    @DisplayName("Converte String JSON para Objeto JsonRule")
    @Test
    void testJsonToJsonRule() {
        RuleMessage jsonRule = jsonService.stringToRuleMessage(strJson);
        assertEquals("TESTE", jsonRule.getName());
        assertEquals(false, jsonRule.getListenerMessage().getExact());
        assertEquals("exec2", jsonRule.getListenerMessage().getTypeMessageListener());
    }

    @Disabled("Funcionalidade em desuso")
    @DisplayName("Converte Objeto JsonRule para String JSON (sobrescreve MapToJson)")
    @Test
    void testJsonRuleToJson() {
        String actual = jsonService.ruleMessageToString(ruleMessage);
        assertEquals(this.strJson, actual.replaceAll("\n", "").replaceAll(" ", ""));
    }

}
