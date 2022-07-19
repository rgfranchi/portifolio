package rgf.micro.manage.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Forklifts.ForkliftsBuilder;
import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Forklifts;
import rgf.micro.manage.domain.Modules.ModulesBuilder;
import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.domain.Transmissions.TransmissionsBuilder;
import rgf.micro.manage.domain.Transmissions;
import rgf.micro.manage.repository.CompanyRepository;
import rgf.micro.manage.repository.ForkliftRepository;
import rgf.micro.manage.repository.OperatorRepository;
import rgf.micro.manage.repository.PlaceRepository;

@RequiredArgsConstructor
@Component
@Order(5)
public class ForkliftBootstrap implements CommandLineRunner {

        private final ForkliftRepository forkliftRepository;
        private final CompanyRepository companyRepository;
        private final PlaceRepository placeRepository;
        private final OperatorRepository operatorRepository;

        private TransmissionsBuilder tm_wine_1 = null;
        private TransmissionsBuilder tm_wine_2 = null;
        private TransmissionsBuilder tm_lincoLn_1 = null;
        private TransmissionsBuilder tm_lincoLn_2 = null;
        private TransmissionsBuilder tm_cnhi_1 = null;
        private TransmissionsBuilder tm_cnhi_2 = null;

        private ModulesBuilder md_wine_1 = null;
        private ModulesBuilder md_wine_2 = null;
        private ModulesBuilder md_lincoLn_1 = null;
        private ModulesBuilder md_lincoLn_2 = null;
        private ModulesBuilder md_cnhi_1 = null;
        private ModulesBuilder md_cnhi_2 = null;

        private Companies wine = null;
        private Companies lincoLn = null;
        private Companies cnhi = null;

        // banco antigo
        // SELECT * FROM biilog.maquinas where cliente_id in (54,63,62);
        // SELECT * FROM biilog.modulos where maquina_id in (254,328,404,406,370,386);
        // SELECT * FROM biilog.modulos where maquina_id in (254,328,404,406,370,386)

        @Override
        public void run(String... args) throws Exception {
                wine = companyRepository.findById(2L).get();
                lincoLn = companyRepository.findById(3L).get();
                cnhi = companyRepository.findById(4L).get();
                loadTransmission();
                loadModule();
                loadForklift();
        }

        private void loadTransmission() {
                tm_wine_1 = Transmissions.builder();
                tm_wine_1.tipo("Zigbee");
                tm_wine_1.fabricante("Biilog");
                tm_wine_1.modelo("GATEWAY");
                tm_wine_1.chip(null);
                tm_wine_1.operadora(null);
                tm_wine_1.numeroLinha(null);
                tm_wine_1.pin(null);
                tm_wine_1.puk1(null);
                tm_wine_1.puk2(null);
                tm_wine_1.imei(null);
                tm_wine_1.pan(null);
                tm_wine_1.observacoes("Transmissão do WINE MODULO 1");

                tm_wine_2 = Transmissions.builder();
                tm_wine_2.tipo("Zigbee");
                tm_wine_2.fabricante("Biilog");
                tm_wine_2.modelo("GATEWAY");
                tm_wine_2.chip(null);
                tm_wine_2.operadora(null);
                tm_wine_2.numeroLinha(null);
                tm_wine_2.pin(null);
                tm_wine_2.puk1(null);
                tm_wine_2.puk2(null);
                tm_wine_2.imei(null);
                tm_wine_2.pan(null);
                tm_wine_2.observacoes("Transmissão do WINE MODULO 2");

                tm_lincoLn_1 = Transmissions.builder();
                tm_lincoLn_1.tipo("Zigbee");
                tm_lincoLn_1.fabricante("Biilog");
                tm_lincoLn_1.modelo("GATEWAY");
                tm_lincoLn_1.chip(null);
                tm_lincoLn_1.operadora(null);
                tm_lincoLn_1.numeroLinha(null);
                tm_lincoLn_1.pin(null);
                tm_lincoLn_1.puk1(null);
                tm_lincoLn_1.puk2(null);
                tm_lincoLn_1.imei(null);
                tm_lincoLn_1.pan(null);
                tm_lincoLn_1.observacoes("Transmissão do LincoLn MODULO 3");

                tm_lincoLn_2 = Transmissions.builder();
                tm_lincoLn_2.tipo("Zigbee");
                tm_lincoLn_2.fabricante("Biilog");
                tm_lincoLn_2.modelo("GATEWAY");
                tm_lincoLn_2.chip(null);
                tm_lincoLn_2.operadora(null);
                tm_lincoLn_2.numeroLinha(null);
                tm_lincoLn_2.pin(null);
                tm_lincoLn_2.puk1(null);
                tm_lincoLn_2.puk2(null);
                tm_lincoLn_2.imei(null);
                tm_lincoLn_2.pan(null);
                tm_lincoLn_2.observacoes("Transmissão do LincoLn MODULO 4");

                tm_cnhi_1 = Transmissions.builder();
                tm_cnhi_1.tipo("Zigbee");
                tm_cnhi_1.fabricante("Biilog");
                tm_cnhi_1.modelo("GATEWAY");
                tm_cnhi_1.chip(null);
                tm_cnhi_1.operadora(null);
                tm_cnhi_1.numeroLinha(null);
                tm_cnhi_1.pin(null);
                tm_cnhi_1.puk1(null);
                tm_cnhi_1.puk2(null);
                tm_cnhi_1.imei(null);
                tm_cnhi_1.pan(null);
                tm_cnhi_1.observacoes("Transmissão do CNHi MODULO 5");

                tm_cnhi_2 = Transmissions.builder();
                tm_cnhi_2.tipo("Zigbee");
                tm_cnhi_2.fabricante("Biilog");
                tm_cnhi_2.modelo("GATEWAY");
                tm_cnhi_2.chip(null);
                tm_cnhi_2.operadora(null);
                tm_cnhi_2.numeroLinha(null);
                tm_cnhi_2.pin(null);
                tm_cnhi_2.puk1(null);
                tm_cnhi_2.puk2(null);
                tm_cnhi_2.imei(null);
                tm_cnhi_2.pan(null);
                tm_cnhi_2.observacoes("Transmissão do CNHi MODULO 6");

        }

        private void loadModule() {
                // 1
                md_wine_1 = Modules.builder(); // modulos.id = 238 / modulos.maquina_id = 254
                md_wine_1.company(wine);
                md_wine_1.codigo("1086"); // modulos.numero
                md_wine_1.modelo("BII_MSO"); // modulos.tipo
                md_wine_1.versao("1.0");
                md_wine_1.fabricante("BIILOG");
                md_wine_1.ativo(true);
                md_wine_1.place(placeRepository.findByCompanyId(wine.getId()).iterator().next());
                md_wine_1.operator(operatorRepository.findById(1L).get());
                md_wine_1.operator(operatorRepository.findById(2L).get());
                md_wine_1.observacoes("WINE Modulo Antigo 238");
                // 2
                md_wine_2 = Modules.builder(); // modulos.id = 310 / modulos.maquina_id = 328
                md_wine_2.company(wine);
                md_wine_2.codigo("1089"); // modulos.numero
                md_wine_2.modelo("BII_MSO"); // modulos.tipo
                md_wine_2.versao("1.0");
                md_wine_2.fabricante("BIILOG");
                md_wine_2.ativo(true);
                md_wine_2.place(placeRepository.findByCompanyId(wine.getId()).iterator().next());
                md_wine_2.operator(operatorRepository.findById(1L).get());
                md_wine_2.operator(operatorRepository.findById(2L).get());
                md_wine_2.observacoes("WINE Modulo Antigo 310");
                // 3
                md_lincoLn_1 = Modules.builder(); // modulos.id = 387 / modulos.maquina_id 404
                md_lincoLn_1.company(lincoLn);
                md_lincoLn_1.codigo("1165"); // modulos.numero
                md_lincoLn_1.modelo("BII_MSO"); // modulos.tipo
                md_lincoLn_1.versao("1.0");
                md_lincoLn_1.fabricante("BIILOG");
                md_lincoLn_1.ativo(true);
                md_lincoLn_1.place(placeRepository.findByCompanyId(lincoLn.getId()).iterator().next());
                md_lincoLn_1.operator(operatorRepository.findById(3L).get());
                md_lincoLn_1.operator(operatorRepository.findById(4L).get());
                md_lincoLn_1.observacoes("LINCO Modulo Antigo 387");
                // 4
                md_lincoLn_2 = Modules.builder(); // modulos.id = 389 / modulos.maquina_id = 406
                md_lincoLn_2.company(lincoLn);
                md_lincoLn_2.codigo("1167"); // modulos.numero
                md_lincoLn_2.modelo("BII_MSO"); // modulos.tipo
                md_lincoLn_2.versao("1.0");
                md_lincoLn_2.fabricante("BIILOG");
                md_lincoLn_2.ativo(true);
                md_lincoLn_2.place(placeRepository.findByCompanyId(lincoLn.getId()).iterator().next());
                md_lincoLn_2.operator(operatorRepository.findById(4L).get());
                md_lincoLn_2.observacoes("LINCO Modulo Antigo 389");
                // 5
                md_cnhi_1 = Modules.builder(); // modulos.id = / modulos.maquina_id = 370
                md_cnhi_1.company(cnhi);
                md_cnhi_1.codigo("1132"); // modulos.numero
                md_cnhi_1.modelo("BII_MSO"); // modulos.tipo
                md_cnhi_1.versao("1.0");
                md_cnhi_1.fabricante("BIILOG");
                md_cnhi_1.ativo(true);
                md_cnhi_1.place(placeRepository.findByCompanyId(cnhi.getId()).iterator().next());
                md_cnhi_1.operator(operatorRepository.findById(5L).get());
                md_cnhi_1.operator(operatorRepository.findById(6L).get());
                md_cnhi_1.observacoes("CNHi Modulo Antigo");
                // 6
                md_cnhi_2 = Modules.builder(); // modulos.id = 368 / modulos.maquina_id = 386
                md_cnhi_2.company(cnhi);
                md_cnhi_2.codigo("1148"); // modulos.numero
                md_cnhi_2.modelo("BII_MSO"); // modulos.tipo
                md_cnhi_2.versao("1.0");
                md_cnhi_2.fabricante("BIILOG");
                md_cnhi_2.ativo(true);
                md_cnhi_2.place(placeRepository.findByCompanyId(cnhi.getId()).iterator().next());
                md_cnhi_2.operator(operatorRepository.findById(5L).get());
                md_cnhi_2.observacoes("CNHi Modulo Antigo 368");

        }

        private void loadForklift() {
                if (forkliftRepository.count() == 0) {

                        ForkliftsBuilder fl_wine_1 = Forklifts.builder(); // maquinas.id = 254
                        fl_wine_1.codigo("201 EGU_20"); // maquinas.numero
                        fl_wine_1.fabricante("Still"); // maquinas.fabricante
                        fl_wine_1.modelo("Transp Eletr 24"); // maquinas.modelo
                        fl_wine_1.motor("Combustão"); // maquinas.tipo
                        fl_wine_1.anoFabricacao("2099"); // FAKE
                        fl_wine_1.horimetroInicial(99999); // FAKE
                        fl_wine_1.hodometroInicial(99999); // FAKE
                        fl_wine_1.module(joinsModuleTransmission(md_wine_1.build(), tm_wine_1.build()));
                        forkliftRepository.save(fl_wine_1.build());

                        ForkliftsBuilder fl_wine_2 = Forklifts.builder(); // maquinas.id = 328
                        fl_wine_2.codigo("103 R20_T.Baixa"); // maquinas.numero
                        fl_wine_2.fabricante("Linde"); // maquinas.fabricante
                        fl_wine_2.modelo("R20"); // maquinas.modelo
                        fl_wine_2.motor("Combustão"); // maquinas.tipo
                        fl_wine_2.anoFabricacao("2099"); // FAKE
                        fl_wine_2.horimetroInicial(99999); // FAKE
                        fl_wine_2.hodometroInicial(99999); // FAKE
                        fl_wine_2.module(joinsModuleTransmission(md_wine_2.build(), tm_wine_2.build()));
                        forkliftRepository.save(fl_wine_2.build());

                        ForkliftsBuilder fl_lincoLn_1 = Forklifts.builder(); // maquinas.id = 404
                        fl_lincoLn_1.codigo("67"); // maquinas.numero
                        fl_lincoLn_1.fabricante("Hyster"); // maquinas.fabricante
                        fl_lincoLn_1.modelo("Matrix R1.6 2015"); // maquinas.modelo
                        fl_lincoLn_1.motor("Elétrica 48v"); // maquinas.tipo
                        fl_lincoLn_1.anoFabricacao("2099"); // FAKE
                        fl_lincoLn_1.horimetroInicial(99999); // FAKE
                        fl_lincoLn_1.hodometroInicial(99999); // FAKE
                        fl_lincoLn_1.module(joinsModuleTransmission(md_lincoLn_1.build(), tm_lincoLn_1.build()));
                        forkliftRepository.save(fl_lincoLn_1.build());

                        ForkliftsBuilder fl_lincoLn_2 = Forklifts.builder(); // maquinas.id = 406
                        fl_lincoLn_2.codigo("599"); // maquinas.numero
                        fl_lincoLn_2.fabricante("Hyster"); // maquinas.fabricante
                        fl_lincoLn_2.modelo("Fortis"); // maquinas.modelo
                        fl_lincoLn_2.motor("Combustão"); // maquinas.tipo
                        fl_lincoLn_2.anoFabricacao("2099"); // FAKE
                        fl_lincoLn_2.horimetroInicial(99999); // FAKE
                        fl_lincoLn_2.hodometroInicial(99999); // FAKE
                        fl_lincoLn_2.module(joinsModuleTransmission(md_lincoLn_2.build(), tm_lincoLn_2.build()));
                        forkliftRepository.save(fl_lincoLn_2.build());

                        ForkliftsBuilder fl_cnhi_1 = Forklifts.builder(); // maquinas.id = 370
                        fl_cnhi_1.codigo("R-07 TKP3000"); // maquinas.numero
                        fl_cnhi_1.fabricante("Kontatec"); // maquinas.fabricante
                        fl_cnhi_1.modelo("TKP3000"); // maquinas.modelo
                        fl_cnhi_1.motor("Elétrica 24v"); // maquinas.tipo
                        fl_cnhi_1.anoFabricacao("2099"); // FAKE
                        fl_cnhi_1.horimetroInicial(99999); // FAKE
                        fl_cnhi_1.hodometroInicial(99999); // FAKE
                        fl_cnhi_1.module(joinsModuleTransmission(md_cnhi_1.build(), tm_cnhi_1.build()));
                        forkliftRepository.save(fl_cnhi_1.build());

                        ForkliftsBuilder fl_cnhi_2 = Forklifts.builder(); // maquinas.id = 386
                        fl_cnhi_2.codigo("ES-18 R30XMA3"); // maquinas.numero
                        fl_cnhi_2.fabricante("Hyster"); // maquinas.fabricante
                        fl_cnhi_2.modelo("R30XMA3"); // maquinas.modelo
                        fl_cnhi_2.motor("Elétrica 36v"); // maquinas.tipo
                        fl_cnhi_2.anoFabricacao("2099"); // FAKE
                        fl_cnhi_2.horimetroInicial(99999); // FAKE
                        fl_cnhi_2.hodometroInicial(99999); // FAKE
                        fl_cnhi_2.module(joinsModuleTransmission(md_cnhi_2.build(), tm_cnhi_2.build()));
                        forkliftRepository.save(fl_cnhi_2.build());
                }
        }

        private Modules joinsModuleTransmission(Modules module, Transmissions transmissions) {
                transmissions.setModule(module);
                module.setTransmission(transmissions);
                return module;
        }

}
