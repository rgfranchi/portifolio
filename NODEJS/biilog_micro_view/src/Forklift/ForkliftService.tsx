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
import {
  deleteData,
  emptyForklift,
  getListByCompany,
  IForklift,
  saveData,
  findById,
  displayName,
} from "./ForkliftData";
import ForkliftForm from "./ForkliftForm";
import { ForkliftList } from "./ForkliftList";
import {
  deleteDispatchHelper,
  deleteLoadDispatchHelper,
  listDispatchHelper,
  dataDispatchHelper,
  loadingDispatchHelper,
  clearDispatchHelper,
  valuesDispatchHelper,
} from "../helper/ServiceDispatchHelper";
import {
  listPlaceSelectByCompany,
  displayName as displayPlaceName,
} from "../Place/PlaceData";
import {
  getListByCompany as getOperatorListByCompany,
  displayName as displayOperatorName,
} from "../Operator/OperatorData";
import { IDataList } from "../interfaces/DataInterface";

/**
 * Variáveis local
 */
let dispatch: any = undefined;

const loadVariables = async (
  dispatch: any,
  setValues: any,
  companyId: number
) => {
  let tmpList: any = [];
  loadingDispatchHelper(
    dispatch,
    `Carregando ${displayPlaceName.many} e ${displayOperatorName.many} ...`
  );
  tmpList.push(await listPlaceSelectByCompany(companyId));
  tmpList.push(await getOperatorListByCompany(companyId.toString()));
  valuesDispatchHelper(tmpList, dispatch, setValues);
};

/**
 * Cria novo registro
 */
export const CreateForm: React.FC = () => {
  dispatch = useDispatch();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  emptyForklift.module.companyId = currentSession.company.id;
  const [values, setValues] = useState<IDataList<any>[]>([]);
  useEffect(() => {
    loadVariables(dispatch, setValues, currentSession.company.id);
  }, [currentSession]);
  // return <ForkliftForm initValues={emptyForklift} submitForm={submitForm} />;
  return values.length === 2 ? (
    <ForkliftForm
      initValues={emptyForklift}
      submitForm={submitForm}
      loadValues={{ places: values[0].response, operators: values[1].response }}
    />
  ) : (
    <PageLoadingComponent pageName={displayName.one} />
  );
};

/**
 * Atualiza registro.
 */
export const UpdateForm: React.FC = () => {
  const [initValues, setInitValues] = useState<IForklift>(emptyForklift);
  const [values, setValues] = useState<IDataList<any>[]>([]);
  const param: { id: string } = useParams();

  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  emptyForklift.module.companyId = currentSession.company.id;

  dispatch = useDispatch();
  useEffect(() => {
    const loadValue = async () => {
      await loadVariables(dispatch, setValues, currentSession.company.id);
      loadingDispatchHelper(dispatch, `Carregando ${displayName.one} ...`);
      const data = await findById(param.id);
      dataDispatchHelper(data, dispatch, setInitValues);
    };
    loadValue();
  }, [currentSession, param]);

  return initValues.id !== 0 ? (
    <ForkliftForm
      initValues={initValues}
      submitForm={submitForm}
      loadValues={{ places: values[0].response, operators: values[1].response }}
    />
  ) : (
    <PageLoadingComponent pageName={displayName.one} />
  );
};

/**
 * Envia valores para o servidor.
 * @param values IForklift
 * @param formikHelper FormikHelpers
 */
const submitForm = (
  values: IForklift,
  formikHelper: FormikHelpers<IForklift>
) => {
  SubmitForm<IForklift>({
    values: values,
    formikHelper: formikHelper,
    saveData: saveData,
    dispatch: dispatch,
    messageLoading: `Salvando ${displayName.one} ${values.codigo} ... `,
  });
};

/**
 * Recebe valores para listagem em tela.
 * Contem operação de exclusão.
 * @param data
 */
export const List: React.FC<IUpdateDeleteListAccess> = ({
  baseUrl,
  access,
}) => {
  const [list, setList] = useState<IListLoad<IForklift>>({
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

  // id da empresa para carregar modal de confirmação da exclusão.
  const handleDeleteOpen = (id: number): void => {
    setDeleteId(id);
    deleteLoadDispatchHelper(dispatch);
  };

  /**
   * Controla a listagem.
   * Utiliza variável deleteConfirm aviso de atualização.
   */
  useEffect(() => {
    const listValues = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.many} ...`);
      const data = await getListByCompany(currentSession.company.id.toString());
      listDispatchHelper(data, dispatch, setList);
    };
    listValues();
  }, [reload, currentSession]);

  // Utiliza variável do REDUX para executar a operação de exclusão.
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

  // console.log(list);
  return list.loaded ? (
    <ForkliftList
      list={list.values}
      baseUrl={baseUrl}
      access={access}
      handleDeleteOpen={handleDeleteOpen}
    />
  ) : (
    <PageLoadingComponent pageName={`Lista ${displayName.many}`} />
  );
};
