import { ModalSuccess } from "../../core/components/ModalsComponent";
import TitleComponent from "../../core/components/TitleComponent";
import RecoverPasswordService from "./RecoverPasswordService";

const RecoverPasswordPage = () => {
  return (
    <>
      <ModalSuccess />
      <TitleComponent
        title="Recuperar Senha!!"
        description="Será encaminhada a nova senha para o e-mail cadastrado."
      />
      <RecoverPasswordService />
    </>
  );
};

export default RecoverPasswordPage;
