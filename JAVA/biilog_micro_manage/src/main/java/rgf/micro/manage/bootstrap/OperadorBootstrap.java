package rgf.micro.manage.bootstrap;

import java.time.LocalDate;
import java.time.Month;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Operators;
import rgf.micro.manage.domain.Operators.OperatorsBuilder;
import rgf.micro.manage.repository.CompanyRepository;
import rgf.micro.manage.repository.OperatorRepository;

@RequiredArgsConstructor
@Component()
@Order(2)
public class OperadorBootstrap implements CommandLineRunner {

	private final CompanyRepository companyRepository;

	private final OperatorRepository operatorRepository;

	private Companies wine = null;
	private Companies lincoLn = null;
	private Companies cnhi = null;

	// SELECT * FROM biilog.operadores where id in (1993,2797,3511,3628, 3247,
	// 3251);

	@Override
	public void run(String... args) throws Exception {
		wine = companyRepository.findById(2L).get();
		lincoLn = companyRepository.findById(3L).get();
		cnhi = companyRepository.findById(4L).get();
		loadOperator();
	}

	/**
	 * Registros de id (1,2 e 3) iguais ao sistema micro_view
	 */
	private void loadOperator() {
		if (operatorRepository.count() == 0) {
			OperatorsBuilder op_wine_1 = Operators.builder(); // operadores.id = 1993
			op_wine_1.company(wine);
			op_wine_1.nome("Thiago de Lima Esmero"); // operadores.nome
			op_wine_1.codOperador("105"); // operadores.id_op
			op_wine_1.email("email@wine.com"); // FAKE
			op_wine_1.sexo("Masculino"); // FAKE
			op_wine_1.funcao("Operador"); // operadores.tipo
			op_wine_1.acessoDataInicial(LocalDate.of(2010, Month.JANUARY, 01)); // operadores.aso_data_inicial
			op_wine_1.acessoDataFinal(LocalDate.of(2050, Month.JANUARY, 01)); // operadores.aso_data_final
			op_wine_1.senha("22765"); // operadores.senha
			op_wine_1.rfid("4719A&k"); // FAKE
			op_wine_1.digital("VEVTVEU="); // FAKE
			op_wine_1.deleted(false); // operadores.deleted
			op_wine_1.observacao("Operador WINE TESTE"); // FAKE
			operatorRepository.save(op_wine_1.build());

			OperatorsBuilder op_wine_2 = Operators.builder(); // operadores.id = 2797
			op_wine_2.company(wine);
			op_wine_2.nome("JN Manutenções"); // operadores.nome
			op_wine_2.codOperador("051"); // operadores.id_op
			op_wine_2.email("manutencao@wine.com"); // FAKE
			op_wine_2.sexo("Masculino"); // FAKE
			op_wine_2.funcao("Manutenção"); // operadores.tipo (O,M,C)
			op_wine_2.acessoDataInicial(LocalDate.of(2010, Month.JANUARY, 01)); // operadores.aso_data_inicial
			op_wine_2.acessoDataFinal(LocalDate.of(2050, Month.JANUARY, 01)); // operadores.aso_data_final
			op_wine_2.senha("44551"); // operadores.senha
			op_wine_2.rfid("LFNOFSN"); // FAKE
			op_wine_2.digital("OJDN*DPS"); // FAKE
			op_wine_2.deleted(false); // operadores.deleted
			op_wine_2.observacao("Operador WINE TESTE"); // FAKE
			operatorRepository.save(op_wine_2.build());

			OperatorsBuilder op_lincoLn_1 = Operators.builder(); // operadores.id = 3511
			op_lincoLn_1.company(lincoLn);
			op_lincoLn_1.nome("Josemar Sotero"); // operadores.nome
			op_lincoLn_1.codOperador("106"); // operadores.id_op
			op_lincoLn_1.email("operador@lincoln.com"); // FAKE
			op_lincoLn_1.sexo("Masculino"); // FAKE
			op_lincoLn_1.funcao("Operador"); // operadores.tipo (O,M,C)
			op_lincoLn_1.acessoDataInicial(LocalDate.of(2020, Month.MARCH, 13)); // operadores.aso_data_inicial
			op_lincoLn_1.acessoDataFinal(LocalDate.of(2021, Month.MARCH, 12)); // operadores.aso_data_final
			op_lincoLn_1.senha("02324"); // operadores.senha
			op_lincoLn_1.rfid("LFNOFSN"); // FAKE
			op_lincoLn_1.digital("OJDN*LIN"); // FAKE
			op_lincoLn_1.deleted(false); // operadores.deleted
			op_lincoLn_1.observacao("Operador LINCO TESTE"); // FAKE
			operatorRepository.save(op_lincoLn_1.build());

			OperatorsBuilder op_lincoLn_2 = Operators.builder(); // operadores.id = 3628
			op_lincoLn_2.company(lincoLn);
			op_lincoLn_2.nome("Emergência"); // operadores.nome
			op_lincoLn_2.codOperador("002"); // operadores.id_op
			op_lincoLn_2.email("emergencia@lincoln.com"); // FAKE
			op_lincoLn_2.sexo("Masculino"); // FAKE
			op_lincoLn_2.funcao("Supervisor"); // operadores.tipo (O,M,C,S)
			op_lincoLn_2.acessoDataInicial(LocalDate.of(2010, Month.NOVEMBER, 10)); // operadores.aso_data_inicial
			op_lincoLn_2.acessoDataFinal(LocalDate.of(2050, Month.NOVEMBER, 10)); // operadores.aso_data_final
			op_lincoLn_2.senha("34577"); // operadores.senha
			op_lincoLn_2.rfid("LFNOFSN"); // FAKE
			op_lincoLn_2.digital("OJDN*LIN"); // FAKE
			op_lincoLn_2.deleted(false); // operadores.deleted
			op_lincoLn_2.observacao("Operador LINCO TESTE"); // FAKE
			operatorRepository.save(op_lincoLn_2.build());

			OperatorsBuilder op_cnhi_1 = Operators.builder(); // operadores.id = 3247
			op_cnhi_1.company(cnhi);
			op_cnhi_1.nome("Cesar Benedito De Lima"); // operadores.nome
			op_cnhi_1.codOperador("121"); // operadores.id_op
			op_cnhi_1.email("operador@cnhi.com"); // FAKE
			op_cnhi_1.sexo("Masculino"); // FAKE
			op_cnhi_1.funcao("Operador"); // operadores.tipo (O,M,C,S)
			op_cnhi_1.acessoDataInicial(LocalDate.of(2021, Month.APRIL, 26)); // operadores.aso_data_inicial
			op_cnhi_1.acessoDataFinal(LocalDate.of(2022, Month.APRIL, 26)); // operadores.aso_data_final
			op_cnhi_1.senha("53076"); // operadores.senha
			op_cnhi_1.rfid("LFNOFSN"); // FAKE
			op_cnhi_1.digital("OJDN*CNH"); // FAKE
			op_cnhi_1.deleted(false); // operadores.deleted
			op_cnhi_1.observacao("Operador CNHi TESTE"); // FAKE
			operatorRepository.save(op_cnhi_1.build());

			OperatorsBuilder op_cnhi_2 = Operators.builder(); // operadores.id = 3251
			op_cnhi_2.company(cnhi);
			op_cnhi_2.nome("Claudinei Xavier Dos Santos"); // operadores.nome
			op_cnhi_2.codOperador("126"); // operadores.id_op
			op_cnhi_2.email("operador@cnhi.com"); // FAKE
			op_cnhi_2.sexo("Masculino"); // FAKE
			op_cnhi_2.funcao("Operador"); // operadores.tipo (O,M,C,S)
			op_cnhi_2.acessoDataInicial(LocalDate.of(2021, Month.JANUARY, 13)); // operadores.aso_data_inicial
			op_cnhi_2.acessoDataFinal(LocalDate.of(2022, Month.JANUARY, 17)); // operadores.aso_data_final
			op_cnhi_2.senha("55856"); // operadores.senha
			op_cnhi_2.rfid("LFNOFSN"); // FAKE
			op_cnhi_2.digital("OJDN*CNH"); // FAKE
			op_cnhi_2.deleted(false); // operadores.deleted
			op_cnhi_2.observacao("Operador CNHi TESTE"); // FAKE
			operatorRepository.save(op_cnhi_2.build());
		}
	}

}