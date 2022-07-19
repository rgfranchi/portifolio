import {
  IConfirmModal,
  IFailModal,
  ILoadingModal,
  ISuccessModal,
} from "../interfaces/ModalsInterface";
import {
  IReduxAction,
  IReduxDispatch,
  IModalSlice,
  IReducer,
} from "../interfaces/ReduxInterface";

const initialState: IModalSlice = {
  loading: {
    show: false,
    message: null,
  },
  confirm: {
    show: false,
    executed: 0, // incrementa a cada nova tentativa.
    disabledButtons: false,
    textTitle: null,
    textBody: null,
    textAction: "Executar",
    errorExecute: null,
    variantAction: "primary",
  },
  fail: {
    show: false,
    redirect: null,
    textFail: "Falha ao Executar",
    textButton: "Falhou ... ",
  },
  success: {
    show: false,
    redirect: null,
    textSuccess: "Sucesso!!!",
    textButton: "OK",
  },
};

const modalReducer = (
  state = initialState,
  action: IReduxAction<IModalSlice>
) => {
  switch (action.type) {
    case "modal/loadingModal": {
      return { ...state, loading: action.payload };
    }
    case "modal/confirmModal": {
      return { ...state, confirm: action.payload };
    }
    case "modal/failModal": {
      return { ...state, fail: action.payload };
    }
    case "modal/successModal": {
      return { ...state, success: action.payload };
    }
    case "modal/destroy/loading": {
      return { ...state, loading: initialState.loading };
    }
    case "modal/destroy/confirm": {
      return { ...state, confirm: initialState.confirm };
    }
    case "modal/destroy/fail": {
      return { ...state, fail: initialState.fail };
    }
    case "modal/destroy/success": {
      return { ...state, success: initialState.success };
    }
    case "modal/destroy": {
      return initialState;
    }
    default:
      return state;
  }
};
export default modalReducer;

/**
 * Exibe mensagem de confirmação para uma transação.
 * @param {import("../interfaces/ModalsInterface").IConfirmModal} values -> objeto de propriedades
 */
export const confirmModal = (values: IConfirmModal = initialState.confirm) => {
  return function modal(
    dispatch: IReduxDispatch<IConfirmModal>,
    getState: IReducer
  ) {
    values =
      values.show && getState().modals.confirm.show
        ? { ...getState().modals.confirm, ...values }
        : { ...initialState.confirm, ...values };
    dispatch({
      type: "modal/confirmModal",
      payload: values,
    });
  };
};

/**
 * Exibe mensagem de loading durante as transações.
 * @param {boolean} isShow -> "true" ou "false"
 * @param {string} messageShow -> mensagem para exibir na tela.
 */
export const loadingModal = (values: ILoadingModal = initialState.loading) => {
  return function modal(dispatch: IReduxDispatch<ILoadingModal>) {
    dispatch({
      type: "modal/loadingModal",
      payload: { ...initialState.loading, ...values },
    });
  };
};

/**
 * Exibe mensagem de falha.
 * @param {boolean} isShow -> true ou false
 * @param {{ redirect?:string | null, textFail?: string | null, textButton?: string | null }} props -> objeto de propriedades
 */
export const failModal = (values: IFailModal = initialState.fail) => {
  return function modal(dispatch: IReduxDispatch<IFailModal>) {
    dispatch({
      type: "modal/failModal",
      payload: { ...initialState.fail, ...values },
    });
  };
};

/**
 * Exibe mensagem de sucesso para uma transação.
 * @param {boolean} isShow -> true ou false
 * @param {{ redirect?:string | null, textSuccess?: string | null, textButton?: string | null }} props -> objeto de propriedades
 */
export const successModal = (values: ISuccessModal = initialState.success) => {
  return function modal(dispatch: IReduxDispatch<ISuccessModal>) {
    dispatch({
      type: "modal/successModal",
      payload: { ...initialState.success, ...values },
    });
  };
};

// Trunk Function
/**
 * @param {modalType: 'loading' | 'confirm' | 'fail' | 'success' }} props -> objeto de propriedades
 */
export const destroyModals = (modalType: string) => {
  return function destroy(dispatch: IReduxDispatch<null>) {
    dispatch({ type: "modal/destroy/" + modalType });
  };
};
/**
 * @param {modalType: 'loading' | 'confirm' | 'fail' | 'success' }} props -> objeto de propriedades
 */
export const destroyAllModals = () => {
  return function destroy(dispatch: IReduxDispatch<null>) {
    dispatch({ type: "modal/destroy" });
  };
};
