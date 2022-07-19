import { ISessionSlice } from "./SessionInterface";
import {
  IConfirmModal,
  IFailModal,
  ILoadingModal,
  ISuccessModal,
} from "./ModalsInterface";

export interface IState {
  companies: ICompanySlice[] | [];
  session: ISessionSlice;
  modals: IModalSlice;
  alert: IAlertSlice;
}

export interface IReducer {
  (): IState;
}

export interface IReduxAction<T> {
  type: string;
  payload?: T;
}

export interface IReduxDispatch<T> {
  (value: IReduxAction<T>): void;
}

export interface IModalSlice {
  loading: ILoadingModal;
  confirm: IConfirmModal;
  fail: IFailModal;
  success: ISuccessModal;
}

export interface IAlertSlice {
  hidden: boolean;
  message: string | null;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | string;
}

export interface ICompanySlice {
  id: number;
  nome: string;
}
