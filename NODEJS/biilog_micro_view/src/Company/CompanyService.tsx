import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import { useParams } from "react-router-dom";

import PageLoadingComponent from "../components/PageLoadingComponent";

import {
  saveData,
  findById,
  emptyCompany,
  ICompany,
  getList,
  deleteData,
  displayName,
} from "./CompanyData";
import CompanyList from "./CompanyList";
import CompanyForm from "./CompanyForm";
import {
  IListLoad,
  IUpdateDeleteListAccess,
} from "../interfaces/ServicesInterface";
import { SubmitForm } from "../helper/ServiceHelper";
import {
  deleteDispatchHelper,
  deleteLoadDispatchHelper,
  listDispatchHelper,
  dataDispatchHelper,
  loadingDispatchHelper,
  clearDispatchHelper,
} from "../helper/ServiceDispatchHelper";
import {
  createCompany,
  dropCompany,
  updateCompany,
} from "../redux/companySlice";

let dispatch: any = null;

/**
 * Cria novo registro
 */
export const CreateForm: React.FC = () => {
  dispatch = useDispatch();
  return <CompanyForm initValues={emptyCompany} submitForm={submitForm} />;
};

export const UpdateForm: React.FC = () => {
  const [initValues, setInitValues] = useState<ICompany>(emptyCompany);
  const param: { id: string } = useParams();

  dispatch = useDispatch();

  useEffect(() => {
    const loadValue = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.one} ...`);
      const data = await findById(param.id);
      dataDispatchHelper(data, dispatch, setInitValues);
    };
    loadValue();
  }, [param]);

  return initValues.id !== 0 ? (
    <CompanyForm initValues={initValues} submitForm={submitForm} />
  ) : (
    <PageLoadingComponent pageName="Empresas" />
  );
};

/**
 * Salva valores no banco de dados.
 * @param value ICompany
 * @param param1 FormikHelpers
 */
const submitForm = (value: ICompany, formikHelper: FormikHelpers<ICompany>) => {
  SubmitForm<ICompany>({
    values: value,
    formikHelper: formikHelper,
    saveData: saveData,
    dispatch: dispatch,
    messageLoading: `Salvando ${displayName.one} ${value.nome} ... `,
  }).then((resp: any) => {
    if (!resp.data) {
      return;
    }
    if (value.id.toString() === "0") {
      const saved = resp.data.company;
      dispatch(
        createCompany({
          id: saved.id,
          nome: value.nome,
        })
      );
    } else {
      dispatch(
        updateCompany({
          id: value.id,
          nome: value.nome,
        })
      );
    }
  });
};

/**
 * Recebe valores para listagem em tela.
 * Contem operação de exclusão.
 * @param baseUrl
 * @param access
 */
export const List: React.FC<IUpdateDeleteListAccess> = ({
  baseUrl,
  access,
}) => {
  const [list, setList] = useState<IListLoad<ICompany>>({
    loaded: false,
    values: [],
  });
  const [deleteId, setDeleteId] = useState<number>(0);
  const [reload, setReload] = useState<number>(0);

  dispatch = useDispatch();
  let deleteConfirm = useSelector(
    (state: any) => state.modals.confirm.executed
  );

  /**
   * Controla a listagem.
   * Utiliza variável deleteConfirm aviso de atualização.
   */
  useEffect(() => {
    const listValues = async () => {
      loadingDispatchHelper(dispatch, `Carregando ${displayName.many} ...`);
      const data = await getList();
      listDispatchHelper(data, dispatch, setList);
    };
    listValues();
  }, [reload]);

  // id da empresa para carregar modal de confirmação da exclusão.
  const handleDeleteOpen = (id: number): void => {
    setDeleteId(id);
    deleteLoadDispatchHelper(dispatch);
    dispatch(dropCompany(id));
  };

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

  return list.loaded ? (
    <CompanyList
      list={list.values}
      baseUrl={baseUrl}
      access={access}
      handleDeleteOpen={handleDeleteOpen}
    />
  ) : (
    <PageLoadingComponent pageName="Lista Empresas" />
  );
};
