package rgf.micro.manage.bootstrap;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Companies.CompaniesBuilder;
import rgf.micro.manage.domain.Places;
import rgf.micro.manage.domain.Places.PlacesBuilder;
import rgf.micro.manage.repository.CompanyRepository;
import rgf.micro.manage.repository.PlaceRepository;

@RequiredArgsConstructor
@Component
@Order(1)
public class CompanyBootstrap implements CommandLineRunner {

	private final CompanyRepository companyRepository;
	private final PlaceRepository placeRepository;

	@Override
	public void run(String... args) throws Exception {
		loadCompany();
		loadPlaces();
	}

	// SELECT * FROM biilog.clientes;

	private void loadCompany() {
		if (companyRepository.count() == 0) {

			CompaniesBuilder biilog = Companies.builder();
			// BIILOG
			biilog.id(1L);
			biilog.nome("BIILOG");
			biilog.codPostal("04557-030");
			biilog.pais("Brasil");
			biilog.estado("São Paulo");
			biilog.cidade("São Paulo");
			biilog.bairro("Brooklin Paulista");
			biilog.logradouro("Rua Marquês de Cascais");
			biilog.numero("152");
			biilog.complemento("Sala 2");
			biilog.nomeContato("Edmondo Gazzillo");
			biilog.email("edmondo.gazzillo@gmail.com");
			biilog.telefone1("1132051654");
			biilog.telefone2("11996135016");
			// FAKE
			biilog.cnpj("39.282.099/0001-05");
			companyRepository.save(biilog.build());

			CompaniesBuilder wine = Companies.builder();
			// WINE
			wine.nome("WINE");
			wine.codPostal("29168-090");
			wine.pais("Brasil");
			wine.estado("Espirito Santo");
			wine.cidade("Serra");
			wine.bairro("Civit II");
			wine.logradouro("Rua Comendador Alcídes Simão Helou");
			wine.numero("1478");
			// company2.complemento("");
			wine.nomeContato("Fábio Ferreira");
			wine.email("fabioferreira@wine.com.br");
			wine.telefone1("2732022600");
			// FAKE
			wine.cnpj("03.640.467/0001-94");
			companyRepository.save(wine.build());

			CompaniesBuilder lincoln = Companies.builder();
			// Lincoln
			lincoln.nome("LincoLN");
			lincoln.codPostal("07170-350");
			lincoln.pais("Brasil");
			lincoln.estado("São Paulo");
			lincoln.cidade("Guarulhos");
			lincoln.bairro("Vila Aeroporto");
			lincoln.logradouro("Av. Papa João Paulo I");
			lincoln.numero("1818");
			// company2.complemento("");
			lincoln.nomeContato("Vander Levorato");
			lincoln.email("vander_levorato@lincolnelectric.com.br");
			lincoln.telefone1("1124314700");
			lincoln.telefone1("1135284700 ");
			// FAKE
			lincoln.cnpj("78.803.809/0001-49");
			companyRepository.save(lincoln.build());

			CompaniesBuilder cnhi = Companies.builder();
			// Lincoln
			cnhi.nome("CNHi");
			cnhi.codPostal("18087-220");
			cnhi.pais("Brasil");
			cnhi.estado("São Paulo");
			cnhi.cidade("Sorocaba");
			cnhi.bairro("Éden");
			cnhi.logradouro("Avenida Jerome Case");
			cnhi.numero("1801");
			// company2.complemento("");
			cnhi.nomeContato("Não Informado");
			cnhi.email("servicos.rental@brasif.com.br");
			cnhi.telefone1("1533341700");
			// FAKE
			cnhi.cnpj("80.783.926/0001-30");
			companyRepository.save(cnhi.build());
		}
	}

	private void loadPlaces() {
		if (placeRepository.count() == 0) {
			Companies biilog = companyRepository.findById(1L).get();
			Companies wine = companyRepository.findById(2L).get();
			Companies lincoln = companyRepository.findById(3L).get();
			Companies cnhi = companyRepository.findById(4L).get();

			PlacesBuilder biilogPlace = Places.builder();
			biilogPlace.company(biilog);
			biilogPlace.nome(biilog.getNome());
			biilogPlace.codPostal(biilog.getCodPostal());
			biilogPlace.pais(biilog.getPais());
			biilogPlace.cidade(biilog.getCidade());
			biilogPlace.bairro(biilog.getBairro());
			biilogPlace.logradouro(biilog.getLogradouro());
			biilogPlace.numero(biilog.getNumero());
			biilogPlace.complemento(biilog.getComplemento());
			biilogPlace.latitude(new BigDecimal("-23.60362371040449"));
			biilogPlace.longitude(new BigDecimal("-46.68348267331292"));
			biilogPlace.cercaVirtual(
					"[{-23.60294043790386, -46.6841210389477},{-23.60415459596241, -46.682597544328736},{-23.60491159570152, -46.68327346095547},{-23.60367778219504, -46.68484523533348}]");
			biilogPlace.observacao("Informações de teste");
			placeRepository.save(biilogPlace.build());

			PlacesBuilder winePlace = Places.builder();
			winePlace.company(wine);
			winePlace.nome(wine.getNome());
			winePlace.codPostal(wine.getCodPostal());
			winePlace.pais(wine.getPais());
			winePlace.cidade(wine.getCidade());
			winePlace.bairro(wine.getBairro());
			winePlace.logradouro(wine.getLogradouro());
			winePlace.numero(wine.getNumero());
			winePlace.complemento(wine.getComplemento());
			winePlace.latitude(new BigDecimal("-20.181186134228973"));
			winePlace.longitude(new BigDecimal("-40.23491961570426"));
			winePlace.cercaVirtual(
					"[{-20.17906131735574, -40.235627718837044},{-20.179428882535753, -40.231615134418085},{-20.181926288755346, -40.23581010903791},{-20.180632274801525, -40.23177070253059}]");
			winePlace.observacao("Informações de teste");
			placeRepository.save(winePlace.build());

			PlacesBuilder lincolnPlace = Places.builder();
			lincolnPlace.company(lincoln);
			lincolnPlace.nome(lincoln.getNome());
			lincolnPlace.codPostal(lincoln.getCodPostal());
			lincolnPlace.pais(lincoln.getPais());
			lincolnPlace.cidade(lincoln.getCidade());
			lincolnPlace.bairro(lincoln.getBairro());
			lincolnPlace.logradouro(lincoln.getLogradouro());
			lincolnPlace.numero(lincoln.getNumero());
			lincolnPlace.complemento(lincoln.getComplemento());
			lincolnPlace.latitude(new BigDecimal("-23.436045397247923"));
			lincolnPlace.longitude(new BigDecimal("-46.44681008681017"));
			lincolnPlace.cercaVirtual(
					"[{-23.433722250373634, -46.4492133459274},{-23.437334923017147, -46.44861253114809},{-23.437482577836786, -46.44419225098603},{-23.433978192284833, -46.44422443749206}]");
			lincolnPlace.observacao("Informações de teste");
			placeRepository.save(lincolnPlace.build());

			PlacesBuilder cnhiPlace = Places.builder();
			cnhiPlace.company(cnhi);
			cnhiPlace.nome(cnhi.getNome());
			cnhiPlace.codPostal(cnhi.getCodPostal());
			cnhiPlace.pais(cnhi.getPais());
			cnhiPlace.cidade(cnhi.getCidade());
			cnhiPlace.bairro(cnhi.getBairro());
			cnhiPlace.logradouro(cnhi.getLogradouro());
			cnhiPlace.numero(cnhi.getNumero());
			cnhiPlace.complemento(cnhi.getComplemento());
			cnhiPlace.latitude(new BigDecimal("-23.43962331943466"));
			cnhiPlace.longitude(new BigDecimal("-47.390562330986626"));
			cnhiPlace.cercaVirtual(
					"[{-23.43669977065856, -47.39243987717196},{-23.438068038911084, -47.387933766327144},{-23.44110967801963, -47.38826636022283},{-23.440893123504654, -47.39275101339696}]");
			cnhiPlace.observacao("Informações de teste");

			placeRepository.save(cnhiPlace.build());

		}
	}

}