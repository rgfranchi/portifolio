package rgf.micro.manage.repository;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Optional;
import java.util.stream.StreamSupport;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import jdk.jfr.Description;
import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Forklifts;
import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.domain.Transmissions;

@SpringBootTest
public class ForkliftRepositoryTest {

        @Autowired
        ForkliftRepository defaultRepository;
        @Autowired
        CompanyRepository companyRepository;

        @Description("Salva Forklift, Module e Transmission.")
        @Test
        void testSaveForklift_Module_Transmission() {
                Long total = StreamSupport.stream(defaultRepository.findAll().spliterator(), false).count();

                Companies company = companyRepository.findById(1L).get();

                Transmissions transmission1 = Transmissions.builder().chip("CHIP A").fabricante("FABRICA TRANSMISSÃO")
                                .imei("99IMEI9").modelo("GPSR").numeroLinha("999999999")
                                .observacoes("TESTE TRANSMISSÃO").build();

                Modules module = Modules.builder().codigo("97ABC").fabricante("FABRICA MODULO").company(company)
                                .modelo("ELÉTRICO").ativo(true).observacoes("REGISTRO TESTE")
                                .transmission(transmission1).build();

                transmission1.setModule(module);

                Forklifts forklift = Forklifts.builder().anoFabricacao("2014").codigo("ASD125_TESTE")
                                .fabricante("FABRICA Empilhadeira").hodometroInicial(1234567890)
                                .horimetroInicial(987654321).modelo("Empilhadeira TESTE").module(module).build();

                Forklifts savedForklift = defaultRepository.save(forklift);

                assertEquals(total + 1, StreamSupport.stream(defaultRepository.findAll().spliterator(), false).count(),
                                "Quantitativo final maior que o inicial");
                assertEquals(company.getId(), savedForklift.getModule().getCompany().getId());
                assertAll(() -> assertEquals("ASD125_TESTE", savedForklift.getCodigo(), "Codigo incorreto"),
                                () -> assertEquals("FABRICA Empilhadeira", savedForklift.getFabricante()),
                                () -> assertEquals("FABRICA MODULO", savedForklift.getModule().getFabricante()),
                                () -> assertEquals("FABRICA TRANSMISSÃO",
                                                savedForklift.getModule().getTransmission().getFabricante()));
                assertNotNull(savedForklift.getModule());
                assertNotNull(savedForklift.getModule().getTransmission());
        }

        @Description("Salva Forklift e Module.")
        @Test
        void testSaveForklift_Module() {
                Long total = StreamSupport.stream(defaultRepository.findAll().spliterator(), false).count();

                Companies company = companyRepository.findById(1L).get();

                Modules module = Modules.builder().codigo("97ABC").fabricante("MOD_TEST").company(company)
                                .modelo("ELÉTRICO").ativo(true).observacoes("REGISTRO TESTE").build();

                Forklifts forklift = Forklifts.builder().anoFabricacao("2014").codigo("ASD125_TESTE")
                                .fabricante("FABRICA TESTE").hodometroInicial(1234567890).horimetroInicial(987654321)
                                .modelo("Empilhadeira TESTE").module(module).build();

                Forklifts savedForklift = defaultRepository.save(forklift);

                assertEquals(total + 1, StreamSupport.stream(defaultRepository.findAll().spliterator(), false).count(),
                                "Quantitativo final maior que o inicial");
                assertEquals(company.getId(), savedForklift.getModule().getCompany().getId());
                assertAll(() -> assertEquals("ASD125_TESTE", savedForklift.getCodigo()),
                                () -> assertEquals("FABRICA TESTE", savedForklift.getFabricante()),
                                () -> assertEquals("97ABC", savedForklift.getModule().getCodigo()));
                assertNotNull(savedForklift.getModule());
                assertNull(savedForklift.getModule().getTransmission());
        }

        @Description("Salva Forklift e Module.")
        @Test
        void testUpdateForklift_Module_Transmission() {
                Long total = StreamSupport.stream(defaultRepository.findAll().spliterator(), false).count();

                Forklifts forklift = defaultRepository.findById(2L).get();
                forklift.setCodigo("ASD125_UPDATE");
                forklift.getModule().setCodigo("97ABC_UPDATE");

                Transmissions transmission = Transmissions.builder().chip("CHIPA")
                                .fabricante("TRANSMISSÃO CREATE, UPDATE Modulo").imei("99IMEI9").modelo("GPSR")
                                .numeroLinha("999999999").observacoes("TESTE TRANSMISSÃO")
                                .id(forklift.getModule().getId()).build();

                forklift.getModule().setTransmission(transmission);

                transmission.setModule(forklift.getModule());

                Forklifts savedForklift = defaultRepository.save(forklift);

                assertEquals(total, StreamSupport.stream(defaultRepository.findAll().spliterator(), false).count(),
                                "Quantitativo final maior que o inicial");
                assertAll(() -> assertEquals("ASD125_UPDATE", savedForklift.getCodigo()),
                                () -> assertEquals("97ABC_UPDATE", savedForklift.getModule().getCodigo()),
                                () -> assertEquals("TRANSMISSÃO CREATE, UPDATE Modulo",
                                                savedForklift.getModule().getTransmission().getFabricante()));
                assertNotNull(savedForklift.getModule());
                assertNotNull(savedForklift.getModule().getTransmission());
                assertNotNull(savedForklift.getModule().getTransmission().getModule());

        }

        @Test
        void testFindForkliftByCompanyId() {
                Iterable<Forklifts> list = defaultRepository.findAllByModuleCompanyId(2L);
                Long total = StreamSupport.stream(list.spliterator(), false).count();
                assertEquals(2, total);
                assertEquals("BIILOG", list.iterator().next().getModule().getFabricante());
                assertEquals("WINE", list.iterator().next().getModule().getCompany().getNome());
        }

        @Test
        void testFindForkliftByModuleId() {
                Optional<Forklifts> forklift = defaultRepository.findFirstByModuleId(1L);
                assertEquals("1086", forklift.get().getModule().getCodigo());
                assertEquals("WINE", forklift.get().getModule().getCompany().getNome());
        }
}
