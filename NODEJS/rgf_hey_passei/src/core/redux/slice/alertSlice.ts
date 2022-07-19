import {
  IReduxAction,
  IReduxDispatch,
  IAlertSlice,
} from "../../interfaces/ReduxInterface";

const initialState: IAlertSlice = {
  hidden: true,
  message: null,
  variant: "primary",
};

export default function alertReducer(
  state: IAlertSlice = initialState,
  action: IReduxAction<IAlertSlice>
) {
  switch (action.type) {
    case "alert/listAlert": {
      return { ...state, ...action.payload };
    }
    case "alert/destroy": {
      return initialState;
    }
    default:
      return state;
  }
}

/**
 * Exibe mensagem de alerta na tela.
 * @param {{ hidden: boolean, message: string, variant: { 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' } }} value -> Parâmetros da mensagem
 * @returns
 */
export function listAlert(value: IAlertSlice) {
  return function modal(dispatch: IReduxDispatch<IAlertSlice>) {
    dispatch({
      type: "alert/listAlert",
      payload: value,
    });
  };
}

// Trunk Function
export function destroyAlerts() {
  return function destroy(dispatch: IReduxDispatch<IAlertSlice>) {
    dispatch({ type: "alert/destroy" });
  };
}
