package rgf.integration.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pojo.integration.RuleMessage;
import pojo.integration.TypeListenerMessage;

public class MessageRuleTest {
    @Test
    @DisplayName("Valores default das regras.")
    void testBuilder() {

        RuleMessage messageRule = RuleMessage.builder().build();

        assertEquals("DEFAULT_RULE", messageRule.getName());
        assertEquals("0.0.0", messageRule.getVersion());
        assertEquals("", messageRule.getOwnerModel());
        assertEquals("", messageRule.getOwnerId());
        assertEquals("", messageRule.getRegex());

        // subclasse MessageListener
        assertEquals(TypeListenerMessage.NOT_DEFINED, messageRule.getListenerMessage().getTypeMessageListener());
        assertEquals("DEFAULT_COD_MODULO", messageRule.getListenerMessage().getCodModulo());
        assertNull(messageRule.getListenerMessage().getMessageResponse());
        assertNull(messageRule.getListenerMessage().getMessageNotFound());
        assertFalse(messageRule.getListenerMessage().getExact());
        assertEquals(0, messageRule.getListenerMessage().getCodModuleGroup());
        assertFalse(messageRule.getListenerMessage().getFindModule());
        assertEquals(0, messageRule.getListenerMessage().getConfirmTimes());
        assertEquals(0, messageRule.getListenerMessage().getUuidLength());
        assertEquals("DEFAULT_UUID_CONFIRM", messageRule.getListenerMessage().getUuidConfirm());
        assertEquals(0, messageRule.getListenerMessage().getUuidConfirmGroup());
        assertEquals(0, messageRule.getListenerMessage().getPlusHour());
        assertEquals("YYYY-MM-dd HH:mm:ss", messageRule.getListenerMessage().getFormatDateTime());

    }
}
