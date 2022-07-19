import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormikHelpers } from "formik";

import LoginForm from "./LoginForm";
import { loadCurrentUser, logout } from "../redux/slice/sessionSlice";

import { ILogin, emptyLogin, authenticationUser } from "./LoginData";
import { destroyAlerts, listAlert } from "../../core/redux/slice/alertSlice";
import { loadingModal } from "../../core/redux/slice/modalSlice";
import { encryptPassword } from "../helper/PasswordHelper";

// import { Buffer } from "buffer";

let dispatch: any = null;
let navigate: any = null;

export const Login: React.FC = () => {
  dispatch = useDispatch();
  navigate = useNavigate();
  console.log("LOGIN SERVICE");
  return <LoginForm initValues={emptyLogin} submitForm={submitForm} />;
};
/**
 * Solicita login ao sistema.
 * @todo: Realiza encriptação simples do password, melhorar processo.
 * @param values : ILoginValues
 * @param param1 : FormikHelpers
 */
const submitForm = (
  values: ILogin,
  { setSubmitting }: FormikHelpers<ILogin>
) => {
  const authentication = async () => {
    dispatch(destroyAlerts());
    dispatch(loadingModal({ show: true, message: "Verificando Usuário ... " }));
    const auth = await authenticationUser(
      values.login,
      encryptPassword(values.login, values.password)
      // Buffer.from(values.password).toString("base64")
    );
    if (auth.status === 200) {
      console.log("Logged:", auth);
      if (typeof auth.response === "string") {
        dispatch(
          listAlert({
            hidden: false,
            message: auth.response,
            variant: "warning",
          })
        );
      } else {
        dispatch(loadCurrentUser(auth.response));
        if (auth.response.group.name === "professor_pre_cadastro") {
          console.log("pre cadastro Professo.");
          navigate("/professor");
        } else {
          //todo: criar página dashboard
        }
      }
    } else {
      console.log("NOT Logged:", auth);
      dispatch(
        listAlert({
          hidden: false,
          message: auth.response.toString(),
          variant: "danger",
        })
      );
      navigate("/login");
    }
    dispatch(loadingModal({ show: false }));
  };
  authentication();
  setSubmitting(false);
};

// export const Logout: React.FC = () => {
//   dispatch = useDispatch();
//   navigate = useNavigate();
//   return (
//     <Nav.Item>
//       <Nav.Link href="#" onClick={confirmLogout}>
//         Logout
//       </Nav.Link>
//     </Nav.Item>
//   );
// };

export const confirmLogout = (dispatch: any) => {
  if (window.confirm("Encerrar seção?")) {
    dispatch(logout());
    navigate("/");
  }
};
