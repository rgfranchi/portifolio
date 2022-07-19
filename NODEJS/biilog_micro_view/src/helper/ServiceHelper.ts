import { FormikHelpers } from "formik";
import { loadingModal, successModal } from "../redux/modalSlice";
import { listAlert } from "../redux/alertSlice";
import { IDataSave } from "../interfaces/DataInterface";

interface ISubmitForm<T> {
  values: T;
  formikHelper: FormikHelpers<T>;
  saveData(values: T): Promise<IDataSave<T>>;
  dispatch(func: any): void;
  messageLoading?: string;
}

/**
 * Salva valores no banco de dados.
 * @param values IOperatorValues
 * @param param1 FormikHelpers
 */
export const SubmitForm = async <T>({
  values,
  formikHelper,
  saveData,
  dispatch,
  messageLoading,
}: ISubmitForm<T>): Promise<void | Promise<any>> => {
  dispatch(
    loadingModal({
      show: true,
      message: messageLoading || "Carregando Informações",
    })
  );
  const res = await saveData(values);
  if (res.status === 200 || res.status === 201) {
    dispatch(
      successModal({
        show: true,
        redirect: null,
        textSuccess: res.response,
        textButton: "Retornar",
      })
    );
  } else {
    dispatch(
      listAlert({
        hidden: false,
        message: res.response,
        variant: "danger",
      })
    );
  }
  formikHelper.setSubmitting(false);
  dispatch(loadingModal({ show: false }));
  return res;
};
