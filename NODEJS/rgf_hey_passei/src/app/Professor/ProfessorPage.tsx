import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ModalSuccess } from "../../core/components/ModalsComponent";
import TitleComponent from "../../core/components/TitleComponent";
import { ICreateUpdateAccess } from "../../core/interfaces/PagesInterface";
import { ISessionSlice } from "../../core/interfaces/SessionInterface";
import { ProfessorDisciplina } from "./Disciplina/ProfessorDisciplinaService";
import { ProfessorAcademica } from "./Academica/ProfessorAcademicaService";
import { CreateForm } from "./ProfessorService";
import { ProfessorPagamento } from "./Pagamento/ProfessorPagamentoService";
import { ProfessorApresentacao } from "./Apresentacao/ProfessorApresentacaoService";
import { ProfessorExercicio } from "./Exercicio/ProfessorExercicioService";
import { ProfessorDocumento } from "./Documento/ProfessorDocumentoService";

const ProfessorPage: React.FC<ICreateUpdateAccess> = ({ access }) => {
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  // Cadastro completo do professor */
  if (currentSession.group.name === "professor_pre_cadastro") {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TitleComponent
                title="Cadastro das disciplinas."
                description="Selecione as disciplinas que leciona."
              />
              <ProfessorDisciplina />
            </>
          }
        />
        <Route
          path="/documento"
          element={
            <>
              <TitleComponent
                title="Cadastro dos documentos."
                description="Insira informações do seu documento."
              />
              <ProfessorDocumento />
            </>
          }
        />
        <Route
          path="/academica"
          element={
            <>
              <TitleComponent
                title="Cadastro das informações Acadêmicas."
                description="Insira as informações acadêmica."
              />
              <ProfessorAcademica />
            </>
          }
        />
        <Route
          path="/pagamento"
          element={
            <>
              <TitleComponent
                title="Cadastro das informações de Pagamento."
                description="Insira as informações para recebimento dos trabalhos realizado."
              />
              <ProfessorPagamento />
            </>
          }
        />
        <Route
          path="/apresentacao"
          element={
            <>
              <TitleComponent
                title="Apresentação."
                description="Vamos nos conhecer melhor."
              />
              <ProfessorApresentacao />
            </>
          }
        />
        <Route
          path="/exercicio"
          element={
            <>
              <TitleComponent
                title="Exercicio."
                description="Exercício de avaliação."
              />
              <ProfessorExercicio />
            </>
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Cria usuário do tipo Aluno ou Professor (acesso publico) */}
      <Route
        path="/pre_cadastro"
        element={
          <>
            <ModalSuccess />
            <TitleComponent title="Criar Acesso" description="Bem vindo." />
            <CreateForm />
          </>
        }
      />
      {/* Atualiza cadastro do usuário Aluno ou Professor (acesso publico) */}
      {/* <Route
        path="/"
        element={
          <>
            <TitleComponent
              title="Atualizar Registro"
              description="Atualizar informações do usuário."
            />
            <UpdateForm />
          </>
        }
      /> */}
    </Routes>
  );
};

export default ProfessorPage;
