interface IModal {
  show: boolean;
}

export interface IConfirmModal extends IModal {
  executed?: number;
  disabledButtons?: boolean;
  textTitle?: string | null;
  textBody?: string | null;
  textAction?: string | null;
  errorExecute?: string | null;
  variantAction?:
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

export interface ILoadingModal extends IModal {
  message?: string | null;
}

export interface IFailModal extends IModal {
  redirect: string | null;
  textFail: string;
  textButton: string;
}

export interface ISuccessModal extends IModal {
  redirect: string | null;
  textSuccess: string;
  textButton: string;
}
