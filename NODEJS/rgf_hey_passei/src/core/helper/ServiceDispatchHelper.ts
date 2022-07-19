/**
 * Padronização na utilização do useDispatch dos componentes Services.
 */
import {
  IDataDelete,
  IDataList,
  IDataValue,
} from "../interfaces/DataInterface";
import { IListLoad } from "../interfaces/ServicesInterface";
import { destroyAlerts, listAlert } from "../redux/slice/alertSlice";
import {
  confirmModal,
  destroyModals,
  failModal,
  loadingModal,
} from "../redux/slice/modalSlice";

/**
 * Auxilia na padronização de limpeza das variáveis da página
 * Função deve ser executada antes do carregamento das informações do servidor.
 * @param dispatch componente "react-redux" useDispatch
 * @param message mensagem de carregamento.
 */
export const clearDispatchHelper = (dispatch: any) => {
  dispatch(destroyAlerts());
};

/**
 * Auxilia na padronização antes do carregamento das pagina.
 * Função deve ser executada antes do carregamento das informações do servidor, controla loading.
 * @param dispatch componente "react-redux" useDispatch
 * @param message mensagem de carregamento.
 */
export const loadingDispatchHelper = (dispatch: any, message?: string) => {
  clearDispatchHelper(dispatch);
  dispatch(
    loadingModal({
      show: true,
      message: message || `Carregando ... `,
    })
  );
};

/**
 * Auxilia na padronização do controle do carregamento das listas.
 * Função deve ser executada após o completo carregamento das informações do servidor.
 * @param data valores que será carregado na tela.
 * @param dispatch componente "react-redux" useDispatch
 * @param setList componente "react" useState
 */
export const listDispatchHelper = <T>(
  data: IDataList<T>,
  dispatch: any,
  setList: React.Dispatch<React.SetStateAction<IListLoad<T>>>
) => {
  if (typeof data.response === "string") {
    if (data.status <= 299) {
      dispatch(
        listAlert({
          hidden: false,
          message: data.response,
          variant: "danger",
        })
      );
    } else {
      dispatch(
        failModal({
          show: true,
          redirect: null,
          textFail: data.response,
          textButton: "Retornar",
        })
      );
    }
    setList({ loaded: true, values: [] });
  } else {
    setList({ loaded: true, values: data.response });
  }
  dispatch(loadingModal({ show: false }));
};

/**
 * Auxilia na padronização do controle do carregamento das listas.
 * Função deve ser executada após o completo carregamento das informações do servidor.
 * Exibe Tela de erro ou Retira o "loadingModal"
 * @param data valores que será carregado na tela.
 * @param dispatch componente "react-redux" useDispatch
 * @param setList componente "react" useState
 */
export const dataDispatchHelper = <T>(
  data: IDataValue<T>,
  dispatch: any,
  setInitValues: React.Dispatch<React.SetStateAction<T>>
) => {
  if (typeof data.response === "string") {
    if (data.status === 204 || data.status > 299) {
      dispatch(
        failModal({
          show: true,
          redirect: null,
          textFail: data.response,
          textButton: "Retornar",
        })
      );
    } else {
      dispatch(
        listAlert({
          hidden: false,
          message: data.response,
          variant: "danger",
        })
      );
    }
  } else {
    setInitValues(data.response);
  }
  dispatch(loadingModal({ show: false }));
};

/**
 * Verifica um conjunto de IDataList<T>.
 * Utilizado para preenchimento de variáveis no formulário.
 *
 * @param status
 * @param dispatch
 * @param setValues
 */
export const valuesDispatchHelper = <T>(
  values: IDataList<T>[],
  dispatch: any,
  setValues: React.Dispatch<React.SetStateAction<IDataList<T>[]>>
) => {
  let resp: IDataList<T>[] = [];
  values.forEach((data) => {
    if (typeof data.response === "string") {
      if (data.status === 204 || data.status > 299) {
        dispatch(
          failModal({
            show: true,
            redirect: null,
            textFail: data.response,
            textButton: "Retornar",
          })
        );
      } else {
        dispatch(
          listAlert({
            hidden: false,
            message: data.response,
            variant: "danger",
          })
        );
      }
      return;
    } else {
      resp.push(data);
    }
  });
  setValues(resp);

  dispatch(loadingModal({ show: false }));
};

/**
 * Auxilia na padronização de carregamento da tela de confirmação do delete. .
 * @param dispatch componente "react-redux" useDispatch
 */
export const deleteLoadDispatchHelper = (dispatch: any) => {
  dispatch(
    confirmModal({
      show: true,
      textTitle: "Excluir Registro?",
      textBody: "Esta ação não pode ser desfeita.",
      textAction: "Excluir",
      variantAction: "warning",
    })
  );
};

/**
 * Auxilia na padronização do controle do carregamento das listas.
 * Função deve ser executada após o completo carregamento das informações do servidor.
 * @param data valores que será carregado na tela.
 * @param dispatch componente "react-redux" useDispatch
 * @param setList componente "react" useState
 */
export const deleteDispatchHelper = <T>(
  data: IDataDelete,
  dispatch: any,
  reload: number,
  setReload: React.Dispatch<React.SetStateAction<number>>,
  setList: React.Dispatch<React.SetStateAction<IListLoad<T>>>
) => {
  if (data.status === 202) {
    setList({ loaded: false, values: [] });
    dispatch(destroyModals("confirm"));
    setReload(reload + 1);
    dispatch(destroyAlerts());
  } else {
    dispatch(confirmModal({ show: true, errorExecute: data.response }));
  }
};
