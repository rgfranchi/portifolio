import { FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { string } from "yup";
import { IButtonList } from "../../core/components/ButtonsComponent";
import PageLoadingComponent from "../../core/components/PageLoadingComponent";
import {
  dataDispatchHelper,
  loadingDispatchHelper,
} from "../../core/helper/ServiceDispatchHelper";
import { submitForm, waitDoProcess } from "../../core/helper/ServiceHelper";
import { ISessionSlice } from "../../core/interfaces/SessionInterface";
import { listAlert } from "../../core/redux/slice/alertSlice";
import { allDisciplinas, IDisciplina } from "../Disciplina/DisciplinaData";
import { emptyGroup, findGroupByName, IGroup } from "../Group/GroupData";
import { encryptPassword } from "../helper/PasswordHelper";
import { changeUser } from "../redux/slice/sessionSlice";
import UserAlunoForm from "./UserAlunoForm";
import {
  createUser,
  updateUser,
  displayName,
  emptyUsers,
  existsUser,
  findById,
  IUsers,
  joinNome,
} from "./UserData";

let dispatch: any = null;

export const CreateForm: React.FC = () => {
  dispatch = useDispatch();
  const { type_user } = useParams();
  const [group, setGroup] = useState<IGroup[]>([emptyGroup]);
  // console.log("TIPO USUÁRIO:", type_user);
  useEffect(() => {
    const loadGroup = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.one} ...`);
      const data = await findGroupByName("aluno");
      dataDispatchHelper(data, dispatch, setGroup);
    };
    loadGroup();
  }, []);

  // console.log(group);

  if (group[0].id === "") {
    return <PageLoadingComponent pageName="Usuário" />;
  } else {
    // console.log(emptyUsers);
    emptyUsers.group[0].id = group[0].id;
    return <UserAlunoForm initValues={emptyUsers} submitForm={submit} />;
  }
};

export const UpdateForm: React.FC = () => {
  dispatch = useDispatch();
  const [initValues, setInitValues] = useState<IUsers>(emptyUsers);
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  useEffect(() => {
    const loadValue = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.one} ...`);
      const user_data = await findById(currentSession.activeUser.id);
      console.log(currentSession);
      console.log(user_data);
      // @ts-ignore
      user_data.response["group.id"] = [user_data.response.group[0].id];
      // @ts-ignore
      delete user_data.response.group;
      // @ts-ignore
      user_data.response.password = "";
      dataDispatchHelper(user_data, dispatch, setInitValues);
    };
    loadValue();
  }, []);

  console.log(initValues);

  if (initValues.id === "") {
    return <PageLoadingComponent pageName="Usuário" />;
  } else {
    return <UserAlunoForm initValues={initValues} submitForm={submit} />;
  }
};

const submit = async (values: IUsers, formikHelper: FormikHelpers<IUsers>) => {
  // recebe valores para processar e não interferir no Formik
  let postValues = { ...values };
  let save = null;
  let messageLoad = "Criando Usuário:";
  let messageSuccess = "Usuário criado com Sucesso.";

  console.log(postValues);
  if (postValues.id === "") {
    const exist = await existsUser(postValues.login);
    save = createUser;
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
    save = updateUser;
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

  if (values.id !== "") {
    dispatch(
      changeUser({
        id: values.id,
        name: joinNome(postValues.primeiroNome, postValues.sobrenome),
      })
    );
  }
  // export interface IActiveUserSlice {
  //   id: string;
  //   name: string;
  // }

  console.log("Af Submit:", postValues);
};
