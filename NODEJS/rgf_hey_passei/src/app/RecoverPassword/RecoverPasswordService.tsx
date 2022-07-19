import { FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { destroyAlerts, listAlert } from "../../core/redux/slice/alertSlice";
import { loadingModal, successModal } from "../../core/redux/slice/modalSlice";
import { sendEmail } from "../helper/EmailHelper";
import { encryptPassword, temporaryPassword } from "../helper/PasswordHelper";
import {
  emptyRecoverPassword,
  IAirTableRecoverPassword,
  IRecoverPassword,
  recoverPassword,
  updatePassword,
} from "./RecoverPasswordData";
import RecoverPasswordForm from "./RecoverPasswordForm";

let dispatch: any = null;

const RecoverPasswordService = () => {
  dispatch = useDispatch();
  dispatch(destroyAlerts());
  return (
    <RecoverPasswordForm
      initValues={emptyRecoverPassword}
      submitForm={submitForm}
    />
  );
};

const submitForm = (
  values: IRecoverPassword,
  { setSubmitting }: FormikHelpers<IRecoverPassword>
) => {
  const execSubmit = async () => {
    dispatch(destroyAlerts());
    dispatch(loadingModal({ show: true, message: "Verificando Usuário ... " }));
    const recover = await recoverPassword(values.login);
    let confirm = { email_ok: false, update_ok: false };
    console.log(recover);
    switch (recover.status) {
      case 200:
        if (typeof recover.response !== "string") {
          const tmpPassword = temporaryPassword();
          dispatch(
            loadingModal({ show: true, message: "Enviando Email ... " })
          );
          confirm.email_ok = true;
          // await sendEmail(
          //   recover.response.login,
          //   tmpPassword,
          //   "NOME DO CONTADO",
          //   recover.response.name
          // );
          console.log("TMP PASSWORD:", tmpPassword);
          const encrypt = encryptPassword(recover.response.login, tmpPassword);
          console.log(encrypt);
          let update: IRecoverPassword = {
            id: recover.response.id,
            login: recover.response.login,
            password: encrypt,
          };
          dispatch(
            loadingModal({ show: true, message: "Atualizando Usuário ... " })
          );
          const success = await updatePassword(update);
          confirm.update_ok = success.status === 200;
          console.log(success);
        }
        break;
      case 202:
        dispatch(
          listAlert({
            hidden: false,
            message:
              typeof recover.response === "string"
                ? recover.response
                : "ERRO AO LOCALIZAR REGISTRO",
            variant: "warning",
          })
        );
        break;
      case 403:
        dispatch(
          listAlert({
            hidden: false,
            message:
              typeof recover.response === "string"
                ? recover.response
                : "ERRO AO ACESSAR REGISTRO",
            variant: "warning",
          })
        );
        break;
      case 401:
        dispatch(
          listAlert({
            hidden: false,
            message:
              typeof recover.response === "string"
                ? recover.response
                : "ERRO AO ACESSAR REGISTRO",
            variant: "warning",
          })
        );

        console.log("REGISTRO NÃO LOCALIZADO:", recover.response);
        break;
      default:
        console.log("ERROR:", recover);
    }
    dispatch(loadingModal({ show: false }));
    console.log(confirm);
    if (confirm.email_ok && confirm.update_ok) {
      console.log("modal confirm");
      dispatch(
        successModal({
          show: true,
          textSuccess: "Nova senha encaminhada por e-mail....",
          redirect: "/login",
          textButton: "LOGIN",
        })
      );
    }
    return recover;
  };
  execSubmit();

  console.log("SUBMIT FORM");
  setSubmitting(false);
};

export default RecoverPasswordService;
