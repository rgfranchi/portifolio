/**
 * Operações para criar e atualizar e excluir a Entidade.
 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { FormikHelpers } from "formik";
import { useParams } from "react-router-dom";

import { FormikHelpers } from "formik";
/**
 * Componentes de manipulação da página.
 */
import PageLoadingComponent from "../../core/components/PageLoadingComponent";
import {
  IListLoad,
  IUpdateDeleteListAccess,
} from "../../core/interfaces/ServicesInterface";
import { submitForm } from "../../core/helper/ServiceHelper";
/**
 * Componentes específicos
 */
import {
  emptyPessoa,
  IPessoa,
  getList,
  saveData,
  findById,
  deleteData,
} from "./PessoaData";

import { serverGoogleDrive } from "../config/api";

// import OperatorForm from "./OperatorForm";
import PessoaList from "./PessoaList";
import PessoaForm from "./PessoaForm";
import { displayName } from "./PessoaData";
import {
  loadingDispatchHelper,
  listDispatchHelper,
  deleteLoadDispatchHelper,
  deleteDispatchHelper,
} from "../../core/helper/ServiceDispatchHelper";

/**
 * Variáveis local
 */
let dispatch: any = null;

/**
 * Recebe valores para listagem em tela.
 * Contem operação de exclusão.
 * @param  data
 */
export const List: React.FC<IUpdateDeleteListAccess> = ({ access }) => {
  const [list, setList] = useState<IListLoad<IPessoa>>({
    loaded: false,
    values: [],
  });
  const [deleteId, setDeleteId] = useState<number>(0);
  const [reload, setReload] = useState<number>(0);

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
      loadingDispatchHelper(dispatch, `Carregando ${displayName.many}`);
      const data = await getList();
      listDispatchHelper(data, dispatch, setList);
    };
    listValues();
  }, [reload]);

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

  return list.loaded ? (
    <PessoaList
      list={list.values}
      access={access}
      handleDeleteOpen={handleDeleteOpen}
    />
  ) : (
    <PageLoadingComponent pageName="Lista Pessoa" />
  );
};

/**
 * Cria novo registro
 */
export const CreateForm: React.FC = () => {
  dispatch = useDispatch();
  return <PessoaForm initValues={emptyPessoa} submitForm={submit} />;
};

/**
 * Atualiza registro.
 */
export const UpdateForm: React.FC = () => {
  const [initValues, setInitValues] = useState<IPessoa>(emptyPessoa);
  const param: any = useParams();
  dispatch = useDispatch();
  // Controla o preenchimento do formulário.
  useEffect(() => {
    const loadValue = async () => {
      const data = await findById(param.id);
      console.log(data.response);
      if (typeof data.response === "string") {
        console.log(data.response);
      } else {
        setInitValues(data.response);
      }
    };
    loadValue();
  }, [param]);
  return initValues.id !== 0 ? (
    <PessoaForm initValues={initValues} submitForm={submit} />
  ) : (
    <PageLoadingComponent pageName="Pessoas" />
  );
};

/**
 * Salva valores no banco de dados.
 * @param values IOperator
 * @param param1 FormikHelpers
 */
const submit = async (
  values: IPessoa,
  formikHelper: FormikHelpers<IPessoa>
) => {
  console.log(values);

  const file64encode = values.arquivo.split(",");
  const base64 = file64encode[1];
  const mimeType = file64encode[0].slice(
    file64encode[0].indexOf(":") + 1,
    file64encode[0].lastIndexOf(";")
  );
  const imageExtension = mimeType.substring(mimeType.indexOf("/") + 1);

  const postValue = {
    parents: ["1nXkkY19ZSTktb0E-yRw-9do7te7-9axX"],
    mimeType: mimeType,
    name: `${values.nome
      .replaceAll(" ", "_")
      .toLocaleLowerCase()}.${imageExtension}`,
    base64: base64,
  };

  console.log(postValue);

  await serverGoogleDrive
    .post<any>("/create", postValue)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });

  // submitForm<IPessoa>({
  //   values: values,
  //   formikHelper: formikHelper,
  //   submitData: saveData,
  //   dispatch: dispatch,
  //   messageLoading: `Salvando ${displayName.one} ${values.nome} ... `,
  // });
  formikHelper.setSubmitting(false);
};
