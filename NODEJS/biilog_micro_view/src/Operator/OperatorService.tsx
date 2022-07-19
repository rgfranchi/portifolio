/**
 * Operações para criar e atualizar e excluir a Entidade.
 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import { useParams } from "react-router-dom";

/**
 * Componentes de manipulação da página.
 */
import PageLoadingComponent from "../components/PageLoadingComponent";
import { ISessionSlice } from "../interfaces/SessionInterface";
import {
  IListLoad,
  IUpdateDeleteListAccess,
} from "../interfaces/ServicesInterface";
import { SubmitForm } from "../helper/ServiceHelper";

/**
 * Componentes específicos
 */
import {
  saveData,
  findById,
  emptyOperator,
  IOperator,
  getListByCompany,
  deleteData,
} from "./OperatorData";
import OperatorForm from "./OperatorForm";
import OperatorList from "./OperatorList";
import {
  deleteDispatchHelper,
  listDispatchHelper,
  dataDispatchHelper,
  loadingDispatchHelper,
  clearDispatchHelper,
  deleteLoadDispatchHelper,
} from "../helper/ServiceDispatchHelper";
import { displayName } from "../Company/CompanyData";

/**
 * Variáveis local
 */
let dispatch: any = null;

/**
 * Cria novo registro
 */
export const CreateForm: React.FC = () => {
  dispatch = useDispatch();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  emptyOperator.companyId = currentSession.company.id;
  return <OperatorForm initValues={emptyOperator} submitForm={submitForm} />;
};

/**
 * Atualiza registro.
 */
export const UpdateForm: React.FC = () => {
  const [initValues, setInitValues] = useState<IOperator>(emptyOperator);
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  const param: { id: string } = useParams();
  emptyOperator.companyId = currentSession.company.id;
  dispatch = useDispatch();
  // Controla o preenchimento do formulário.
  useEffect(() => {
    const loadValue = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.one} ...`);
      const data = await findById(param.id);
      dataDispatchHelper(data, dispatch, setInitValues);
    };
    loadValue();
  }, [currentSession, param]);
  return initValues.id !== 0 ? (
    <OperatorForm initValues={initValues} submitForm={submitForm} />
  ) : (
    <PageLoadingComponent pageName="Operadores" />
  );
};

/**
 * Salva valores no banco de dados.
 * @param values IOperator
 * @param param1 FormikHelpers
 */
const submitForm = (
  values: IOperator,
  formikHelper: FormikHelpers<IOperator>
) => {
  SubmitForm<IOperator>({
    values: values,
    formikHelper: formikHelper,
    saveData: saveData,
    dispatch: dispatch,
    messageLoading: `Salvando ${displayName.one} ${values.nome} ... `,
  });
};

/**
 * Recebe valores para listagem em tela.
 * Contem operação de exclusão.
 * @param  data
 */
export const List: React.FC<IUpdateDeleteListAccess> = ({
  baseUrl,
  access,
}) => {
  const [list, setList] = useState<IListLoad<IOperator>>({
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

  // id da empresa para carregar modal de confirmação da exclusão.
  const handleDeleteOpen = (id: number): void => {
    setDeleteId(id);
    deleteLoadDispatchHelper(dispatch);
  };

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
    <OperatorList
      list={list.values}
      baseUrl={baseUrl}
      access={access}
      handleDeleteOpen={handleDeleteOpen}
    />
  ) : (
    <PageLoadingComponent pageName="Lista Operadores" />
  );
};
