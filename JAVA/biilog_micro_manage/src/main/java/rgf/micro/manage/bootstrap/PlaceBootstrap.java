package rgf.micro.manage.bootstrap;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.model.PlaceDto;
import rgf.micro.manage.repository.PlaceRepository;
import rgf.micro.manage.services.PlaceService;

@RequiredArgsConstructor
@Component
@Order(4)
public class PlaceBootstrap implements CommandLineRunner {

	private final PlaceService defaultService;
	private final PlaceRepository defaultRepository;

	@Override
	public void run(String... args) throws Exception {
		// loadPlace();
	}

	private void loadPlace() {
		if (defaultRepository.count() == 0) {
			defaultService.create(PlaceDto.builder().nome("LOCALIZAÇÃO EMPRESA 1").cidade("São Paulo")
					.codPostal("090909-999").companyId(1L).latitude(new BigDecimal(12.34567535))
					.longitude(new BigDecimal(180.34567535)).logradouro("RUA ... Av ... Estrada...").numero("12345")
					.observacao("Localização de teste").pais("BRASIL").build());
			defaultService.create(PlaceDto.builder().nome("LOCALIZAÇÃO EMPRESA 1 1").cidade("São Paulo")
					.codPostal("090909-888").companyId(1L).latitude(new BigDecimal(80.34567535))
					.longitude(new BigDecimal(140.34567535)).logradouro("RUA ... Av ... Estrada...").numero("12345")
					.observacao("Localização de teste").pais("BRASIL").build());
			defaultService.create(PlaceDto.builder().nome("LOCALIZAÇÃO EMPRESA 2").cidade("São Paulo")
					.codPostal("090909-999").companyId(2L).latitude(new BigDecimal(12.34567535))
					.longitude(new BigDecimal(180.34567535)).logradouro("RUA ... Av ... Estrada...").numero("12345")
					.observacao("Localização de teste").pais("BRASIL").build());
			defaultService.create(PlaceDto.builder().nome("LOCALIZAÇÃO EMPRESA 1").cidade("São Paulo")
					.codPostal("090909-999").companyId(4L).latitude(new BigDecimal(-90.34567535))
					.longitude(new BigDecimal(-180.32132132)).logradouro("RUA ... Av ... Estrada...").numero("12345")
					.observacao("Localização de teste").pais("BRASIL").build());

		}
	}

}