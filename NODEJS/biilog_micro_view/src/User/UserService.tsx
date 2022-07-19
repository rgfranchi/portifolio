/**
 * Operações para criar e atualizar e excluir a Entidade.
 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import { useParams } from "react-router-dom";

import PageLoadingComponent from "../components/PageLoadingComponent";
import {
  IListLoad,
  IUpdateDeleteListAccess,
} from "../interfaces/ServicesInterface";

import {
  getListByCompany,
  deleteData,
  IUser,
  saveData,
  emptyUser,
  findById,
} from "./UserData";
import { ISessionSlice } from "../interfaces/SessionInterface";
import UserList from "./UserList";
import UserForm from "./UserForm";
import { SubmitForm } from "../helper/ServiceHelper";
import { listGroupSelect } from "../Group/GroupData";
import { IDataList } from "../interfaces/DataInterface";
import { displayName } from "../Company/CompanyData";
import {
  clearDispatchHelper,
  dataDispatchHelper,
  deleteDispatchHelper,
  deleteLoadDispatchHelper,
  listDispatchHelper,
  loadingDispatchHelper,
  valuesDispatchHelper,
} from "../helper/ServiceDispatchHelper";

let dispatch: any = null;

const loadVariables = async (dispatch: any, setValues: any) => {
  let tmpList: any = [];
  loadingDispatchHelper(dispatch, `Carregando ${displayName.one} ...`);
  tmpList.push(await listGroupSelect());
  valuesDispatchHelper(tmpList, dispatch, setValues);
};

/**
 * Cria usuário
 */
export const CreateForm: React.FC = () => {
  dispatch = useDispatch();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  emptyUser.companyId = currentSession.company.id;
  const [values, setValues] = useState<IDataList<any>[]>([]);
  useEffect(() => {
    loadVariables(dispatch, setValues);
  }, []);

  return values.length === 1 ? (
    <UserForm
      initValues={emptyUser}
      submitForm={submitForm}
      loadValues={{ groups: values[0].response }}
    />
  ) : (
    <PageLoadingComponent pageName="Usuários" />
  );
};

/**
 * Atualiza usuário
 */
export const UpdateForm: React.FC = () => {
  const [initValues, setInitValues] = useState<IUser>(emptyUser);
  const [values, setValues] = useState<IDataList<any>[]>([]);
  // const [groupValues, setGroupValues] = useState<IGroupSelect[]>([]);
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  const param: { id: string } = useParams();
  emptyUser.companyId = currentSession.company.id;
  dispatch = useDispatch();

  useEffect(() => {
    const loadValue = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.one} ...`);
      const data = await findById(param.id);
      dataDispatchHelper(data, dispatch, setInitValues);
    };
    loadVariables(dispatch, setValues);
    loadValue();
  }, [currentSession, param]);

  return initValues.id !== 0 && values.length === 1 ? (
    <UserForm
      initValues={initValues}
      submitForm={submitForm}
      loadValues={{ groups: values[0].response }}
    />
  ) : (
    <PageLoadingComponent pageName="Usuários" />
  );
};

/**
 * Salva valores no banco de dados.
 * @param values IUser
 * @param param1 FormikHelpers
 */
const submitForm = (values: IUser, formikHelper: FormikHelpers<IUser>) => {
  values.password = btoa(values.password || "");
  SubmitForm<IUser>({
    values: values,
    formikHelper: formikHelper,
    saveData: saveData,
    dispatch: dispatch,
    messageLoading: `Salvando ${displayName.one} ${values.nome} ... `,
  });
};

export const List: React.FC<IUpdateDeleteListAccess> = ({
  baseUrl,
  access,
}) => {
  const [list, setList] = useState<IListLoad<IUser>>({
    loaded: false,
    values: [],
  });
  const [deleteId, setDeleteId] = useState<number>(0);
  const [reload, setReload] = useState<number>(0);
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  dispatch = useDispatch();
  let deleteConfirm = useSelector(
    (state: any) => state.modals.confirm.executed
  );

  const handleDeleteOpen = (id: number): void => {
    setDeleteId(id);
    deleteLoadDispatchHelper(dispatch);
  };

  /**
   * Controla a listagem da empresa.
   */
  useEffect(() => {
    const listValues = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.many} ...`);
      const data = await getListByCompany(currentSession.company.id.toString());
      listDispatchHelper(data, dispatch, setList);
    };
    listValues();
  }, [reload, currentSession]);

  /**
   * Utiliza variável do REDUX para confirmar a operação de exclusão.
   */
  useEffect(() => {
    if (deleteConfirm === 0) {
      return;
    }
    const deleteValue = async (deleteId: number) => {
      const data = await deleteData(deleteId.toString());
      deleteDispatchHelper(data, dispatch, reload, setReload, setList);
    };
    deleteValue(deleteId);
  }, [deleteConfirm, deleteId, reload]);

  useEffect(() => {
    return () => {
      clearDispatchHelper(dispatch);
    };
  }, []);

  return list.loaded ? (
    <UserList
      list={list.values}
      baseUrl={baseUrl}
      access={access}
      handleDeleteOpen={handleDeleteOpen}
    />
  ) : (
    <PageLoadingComponent pageName="Lista Usuários" />
  );
};
