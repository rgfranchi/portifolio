import { FormikHelpers } from "formik";
import { loadingModal, successModal } from "../redux/slice/modalSlice";
import { destroyAlerts, listAlert } from "../redux/slice/alertSlice";
import { IDataSave } from "../interfaces/DataInterface";
import {
  dataDispatchHelper,
  loadingDispatchHelper,
} from "./ServiceDispatchHelper";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface ISubmitForm<T, R = T> {
  values: T;
  formikHelper: FormikHelpers<T>;
  submitData(values: T): Promise<IDataSave<R>>;
  dispatch(func: any): void;
  messageLoading?: string;
  messageSuccess?: string;
  redirect?: string;
  navigate?: NavigateFunction;
}

/**
 * Salva valores no banco de dados.<br>
 * Controla valores dispatch successModal e listAlert<br>
 * Obs: incluir 'componente' na tela ModalSuccess e AlertList <br>
 *
 * Se incluir o parâmetro navigate após finalizar redireciona página, não abre "ModalSuccess".
 * @param ISubmitForm
 */
export const submitForm = async <T, R = T>({
  values,
  formikHelper,
  submitData: saveData,
  dispatch,
  messageLoading,
  messageSuccess,
  redirect = "",
  navigate,
}: ISubmitForm<T, R>): Promise<void | Promise<any>> => {
  dispatch(
    loadingModal({
      show: true,
      message: messageLoading || "Carregando Informações",
    })
  );
  console.log("SUBMIT SERVICE:", values);
  // const res = { status: 200, response: "fake_response" };
  const res = await saveData(values);
  if (res.status === 200 || res.status === 201) {
    console.log("destroyAlerts");
    dispatch(destroyAlerts());
    if (typeof navigate !== "undefined") {
      if (redirect === "") {
        navigate(-1);
      } else {
        navigate(redirect);
      }
    } else {
      dispatch(
        successModal({
          show: true,
          redirect: redirect ?? null,
          textSuccess: messageSuccess ?? res.response,
          textButton: "Retornar",
        })
      );
    }
  } else {
    dispatch(
      listAlert({
        hidden: false,
        message: res.response,
        variant: "danger",
      })
    );
  }
  dispatch(loadingModal({ show: false }));
  formikHelper.setSubmitting(false);
  return res;
};

interface IWaitDoProcess<T> {
  dispatch(func: any): void;
  loadingText?: string;
  doProcess(doProcessParam: any): Promise<any>;
  doProcessParam?: any;
  setInitValues: React.Dispatch<React.SetStateAction<T>>;
  beforeProcess?: Function;
  afterProcess?: Function;
  afterDataDispatch?: Function;
}

/**
 * Método utilizado para executar processo de carregamento em um ciclo de vida.<br>
 *
 * dispatch: variável de "useDispatch" (controla componentes na tela)<br>
 * loadingText: Texto exibido enquanto carrega as informações.<br>
 * doProcess: **
 * doProcessParam: parâmetros da função criada em "doProcess"<br>
 * setInitValues: parâmetro "set" de "useState"<br>
 * beforeProcess: **
 * afterProcess: **
 * afterDataDispatch: **
 *
 * ** Ciclo de vida:<br>
 * 1. loadingDispatchHelper -> carrega componente de load na tela<br>
 * 2. beforeProcess -> (opcional) Executar função antes da ação principal
 * 3. doProcess -> Processo a ser executado
 * 4. afterProcess ->  (opcional) Executa função após a ação principal
 * 5. dataDispatchHelper -> carrega as 'setInitValues' e destrói o componente de loading.
 * 5. afterDataDispatch -> (opcional) Executa operação após a ação "dataDispatchHelper".
 *
 * <br>
 * Obs: innerProcessParam :  pode ser acessado como parâmetro em beforeProcess(...), afterProcess(...) e afterDataDispatch(...): <br>
 * beforeProcess -> array vazio e pode ser inserida qualquer chave para carregar variáveis.
 * afterProcess -> carrega respostas de "doProcess" chave na chave "resp"
 *
 * @param param0 IWaitDoProcess
 * @returns retorna array "innerProcessParam" resposta setados pelos métodos.
 */
export const waitDoProcess = async <T>({
  dispatch,
  loadingText,
  doProcess,
  doProcessParam,
  setInitValues,
  beforeProcess,
  afterProcess,
}: IWaitDoProcess<T>) => {
  let resp: any = null;
  let innerProcessParam: any = {};
  const innerProcess = async (
    innerProcessFunction?: any,
    innerProcessParam?: any
  ) => {
    innerProcessParam = innerProcessFunction(innerProcessParam);
    return innerProcessParam;
  };
  loadingDispatchHelper(dispatch, loadingText ?? "Carregando Informações");
  if (typeof beforeProcess === "function") {
    await innerProcess(beforeProcess, innerProcessParam);
  }
  resp = await doProcess(doProcessParam);
  resp = { ...resp, ...innerProcessParam };
  if (typeof afterProcess === "function") {
    innerProcessParam = resp;
    await innerProcess(afterProcess, innerProcessParam);
    resp = { ...resp, ...innerProcessParam };
  }
  console.log(resp);
  dataDispatchHelper(resp, dispatch, setInitValues);
};
