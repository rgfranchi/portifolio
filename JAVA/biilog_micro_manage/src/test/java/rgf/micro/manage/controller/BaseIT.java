package rgf.micro.manage.controller;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import rgf.micro.manage.services.CompanyService;
import rgf.micro.manage.services.ForkliftService;
import rgf.micro.manage.services.OperatorService;
import rgf.micro.manage.services.PlaceService;
import rgf.micro.manage.services.QuestionService;
import rgf.micro.manage.services.UserService;

public abstract class BaseIT {
    @Autowired
    WebApplicationContext wac;

    MockMvc mockMvc;

    @MockBean
    CompanyService companyService;

    @MockBean
    ForkliftService forkliftService;

    @MockBean
    OperatorService operatorService;

    @MockBean
    PlaceService placeService;

    @MockBean
    QuestionService questionService;

    @MockBean
    UserService userService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).apply(springSecurity()).build();
    }
}
