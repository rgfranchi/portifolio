import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PageLoadingComponent from "../../core/components/PageLoadingComponent";
import { submitForm, waitDoProcess } from "../../core/helper/ServiceHelper";
import { listAlert } from "../../core/redux/slice/alertSlice";
import { emptyGroup, findGroupByName, IGroup } from "../Group/GroupData";
import { encryptPassword } from "../helper/PasswordHelper";
import { existsUser, joinNome } from "../User/UserData";
import {
  createProfessor,
  emptyProfessor,
  IProfessor,
  updateProfessor,
} from "./ProfessorData";
import ProfessorForm from "./ProfessorForm";

/**
 * Variáveis local
 */
let dispatch: any = null;

export const CreateForm: React.FC = () => {
  dispatch = useDispatch();
  const { type_user } = useParams();
  const [group, setGroup] = useState<IGroup[]>([emptyGroup]);
  console.log("TIPO USUÁRIO:", type_user);
  useEffect(() => {
    const loadGroup = async (type_user: string) => {
      await waitDoProcess<IGroup[]>({
        dispatch,
        loadingText: `Carregando Disciplinas ...`,
        doProcess: findGroupByName,
        doProcessParam: "professor_pre_cadastro",
        setInitValues: setGroup,
      });
    };
    loadGroup(type_user ?? "");
  }, []);
  if (group[0].id === "") {
    return <PageLoadingComponent pageName="Professor" />;
  } else {
    // if (group[0].name === "professor_pre_cadastro") {
    emptyProfessor.group[0].id = group[0].id;
    return <ProfessorForm initValues={emptyProfessor} submitForm={submit} />;
  }
};

const submit = async (
  values: IProfessor,
  formikHelper: FormikHelpers<IProfessor>
) => {
  // recebe valores para processar e não interferir no Formik
  let postValues = { ...values };
  let save = null;
  let messageLoad = "Criando Usuário:";
  let messageSuccess = "Usuário criado com Sucesso.";

  console.log(postValues);
  if (postValues.id === "") {
    const exist = await existsUser(postValues.login);
    save = createProfessor;
    // registro existente.
    if (Array.isArray(exist.response) && exist.response.length > 0) {
      let msg = "Email cadastrado e inativo";
      if (exist.response[0].active === true) {
        msg = "Email já cadastrado";
      }
      dispatch(
        listAlert({
          hidden: false,
          message: msg,
          variant: "danger",
        })
      );
      return;
    }
  } else {
    messageLoad =
      "Atualizando Usuário:" +
      joinNome(postValues.primeiroNome, postValues.sobrenome);
    messageSuccess = "Usuário atualizado com Sucesso.";
    save = updateProfessor;
  }
  if (postValues.password !== "") {
    postValues.password = encryptPassword(
      postValues.login,
      postValues.password
    );
  } else {
    // @ts-ignore
    delete postValues.password;
  }

  console.log(postValues);

  await submitForm<any>({
    values: postValues,
    formikHelper: formikHelper,
    submitData: save,
    dispatch: dispatch,
    messageLoading: messageLoad + "",
    messageSuccess: messageSuccess,
    redirect: "/login",
  });
  console.log("Af Submit:", postValues);
};
