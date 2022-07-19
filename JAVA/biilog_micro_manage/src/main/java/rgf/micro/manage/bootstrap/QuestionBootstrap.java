package rgf.micro.manage.bootstrap;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import rgf.micro.manage.domain.Companies;
import rgf.micro.manage.domain.Modules;
import rgf.micro.manage.domain.OwnerQuestions;
import rgf.micro.manage.domain.Questions;
import rgf.micro.manage.repository.CompanyRepository;
import rgf.micro.manage.repository.ModuleRepository;
import rgf.micro.manage.repository.QuestionRepository;

@RequiredArgsConstructor
@Component
@Order(6)
public class QuestionBootstrap implements CommandLineRunner {

    private final QuestionRepository questionRepository;
    private final CompanyRepository companyRepository;
    private final ModuleRepository moduleRepository;

    @Override
    public void run(String... args) throws Exception {
        loadQuestion();
    }

    private void loadQuestion() {
        Companies wine = companyRepository.findById(2L).get();
        Modules md_wine = moduleRepository.findAllByCompanyId(wine.getId()).iterator().next();
        Companies lincoLn = companyRepository.findById(3L).get();
        Modules md_lincoLn = moduleRepository.findAllByCompanyId(lincoLn.getId()).iterator().next();

        Set<OwnerQuestions> setOwnerQuestion = new HashSet<OwnerQuestions>();
        Questions question = Questions.builder().nome("Questionário BÁSICO").jsonQuestion(
                "[{text: 'Buzina - Bomba',type: boolean},{text: 'Retrovisor',type: boolean},{text: 'Banco',type: boolean},{text: 'Cinto Segurança - Bomba',type: boolean},{text: 'Extintor',type: boolean},{text: 'Farol bomba',type: boolean},{text: 'Luz traseira - bomba',type: boolean},{text: 'pisca pisca - bomba',type: boolean},{text: 'Sirene Ré - bomba',type: boolean},{text: 'Giroflex - bomba',type: boolean},{text: 'Conexões e Mang. - Bomba',type: boolean},{text: 'Vazamentos - bomba',type: boolean},{text: 'Freio Trava - bomba',type: boolean},{text: 'Freio Pedal - bomba',type: boolean},{text: 'Freio Luz - bomba',type: boolean},{text: 'Rodas - bomba',type: boolean},{text: 'Pneus - bomba',type: boolean},{text: 'Parafusos Rodas - bomba',type: boolean},{text: 'Inspeção Limpeza',type: boolean},{text: 'Inspeç Estrutura',type: boolean},{text: 'Direção Volante - bomba',type: boolean},{text: 'Cambio Frente',type: boolean},{text: 'Cambio Ré',type: boolean},{text: 'Painel Controle',type: boolean},{text: 'Aterramento',type: boolean},{text: 'Gerenc. Adesivos',type: boolean},{text: 'Garfos Alinhados - bomba',type: boolean},{text: 'Garfos com Folga - bomba',type: boolean},{text: 'Trava dos Garfos - bomba',type: boolean },{text: 'Trinca no Garfo - bomba',type: boolean},{text: 'Par Limit Garfo - bomba',type: boolean},{text: 'Cartão Lic. DHL',type: boolean}]")
                .ownerQuestions(setOwnerQuestion).build();

        // Inserir question na tabela ownerQuestion para receber valor de question.
        setOwnerQuestion.add(OwnerQuestions.builder().company(wine).module(md_wine).question(question).build());
        setOwnerQuestion.add(OwnerQuestions.builder().company(lincoLn).module(md_wine).question(question).build());

        setOwnerQuestion.add(OwnerQuestions.builder().company(wine).module(md_lincoLn).question(question).build());
        setOwnerQuestion.add(OwnerQuestions.builder().company(lincoLn).module(md_lincoLn).question(question).build());

        questionRepository.save(question);
    }
}
