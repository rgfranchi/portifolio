import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import { Nav } from "react-bootstrap";

import LoginForm from "./LoginForm";
import { loadCurrentUser, logout } from "../redux/sessionSlice";

import { ILogin, emptyLogin, authenticationUser } from "./LoginData";
import { listAlert } from "../redux/alertSlice";
import { loadingModal } from "../redux/modalSlice";

let dispatch: any = null;
let history: any = null;

export const Login: React.FC = () => {
  dispatch = useDispatch();
  history = useHistory();
  return <LoginForm initValues={emptyLogin} submitForm={submitForm} />;
};
/**
 * Solicita login ao sistema.
 * @todo: Realiza encriptação simples do password, melhorar porcesso.
 * @param values : ILoginValues
 * @param param1 : FormikHelpers
 */
const submitForm = (
  values: ILogin,
  { setSubmitting }: FormikHelpers<ILogin>
) => {
  values.password = btoa(values.password);
  const authentication = async () => {
    dispatch(loadingModal({ show: true, message: "Verificando Usuário ... " }));
    const auth = await authenticationUser(values.email, values.password);
    if (auth.status === 200) {
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
      }
      history.push("/");
    } else {
      dispatch(
        listAlert({
          hidden: false,
          message: auth.response.toString(),
          variant: "warning",
        })
      );
      history.push("/login");
    }
    dispatch(loadingModal({ show: false }));
  };
  authentication();
  setSubmitting(false);
};

export const Logout: React.FC = () => {
  dispatch = useDispatch();
  history = useHistory();
  return (
    <Nav.Item>
      <Nav.Link href="#" onClick={confirmLogout}>
        Logout
      </Nav.Link>
    </Nav.Item>
  );
};

const confirmLogout = () => {
  if (window.confirm("Encerrar seção?")) {
    dispatch(logout());
    history.push("/");
  }
};
