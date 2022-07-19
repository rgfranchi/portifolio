import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ModalSuccess } from "../../core/components/ModalsComponent";
import TitleComponent from "../../core/components/TitleComponent";
import { ICreateUpdateAccess } from "../../core/interfaces/PagesInterface";
import { ISessionSlice } from "../../core/interfaces/SessionInterface";
import { CreateForm, UpdateForm } from "./UserService";

const UserPage: React.FC<ICreateUpdateAccess> = ({ access }) => {
  return (
    <Routes>
      {/* Cria usuário do tipo Aluno ou Professor (acesso publico) */}
      <Route
        path="/create"
        element={
          <>
            <ModalSuccess />
            <TitleComponent title="Criar Acesso" description="Bem vindo." />
            <CreateForm />
          </>
        }
      />
      {/* Atualiza cadastro do usuário Aluno ou Professor (acesso publico) */}
      <Route
        path="/update"
        element={
          <>
            <TitleComponent
              title="Atualizar Registro"
              description="Atualizar informações do usuário."
            />
            <UpdateForm />
          </>
        }
      />
    </Routes>
  );
};

export default UserPage;
