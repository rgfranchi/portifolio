package rgf.integration.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
// import rgf.integration.domain.RuleMessage;
import pojo.integration.RuleMessage;

@Slf4j
@Service
public class JsonService {

    @Autowired
    ResourceLoader resourceLoader;

    public List<RuleMessage> rulesFile(String fileName) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        File jsonFile = null;
        Resource resource = resourceLoader.getResource(String.format("classpath:json/%s.json", fileName));
        if (resource.exists()) {
            jsonFile = resource.getFile();
        } else {
            resource = resourceLoader.getResource("classpath:json/default_rules.json");
            jsonFile = resource.getFile();
        }
        List<RuleMessage> rulesList = objectMapper.readValue(jsonFile, new TypeReference<List<RuleMessage>>() {
        });
        return rulesList;
    }

    /**
     * Retorna map para qualquer objeto.
     * 
     * @param map
     * @return
     */
    public String mapToJson(Object map) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        try {
            return objectMapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            log.error("FALHA AO CONVERTER MAP to JSON {}", e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public Map<String, Object> jsonToMap(String response) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(response, new TypeReference<Map<String, Object>>() {
            });
        } catch (JsonMappingException e) {
            log.error("FALHA AO MAPEAR STRING {}", e.getMessage());
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            log.error("FALHA AO PROCESSAR JSON {}", e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public RuleMessage stringToRuleMessage(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(jsonString, RuleMessage.class);
        } catch (JsonProcessingException e) {
            log.error("FALHA AO PROCESSAR JSON PARA CLASSE {}", e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Converte Objeto para String JSON
     */
    public String ruleMessageToString(RuleMessage rule) {
        return mapToJson(rule);
    }

}
