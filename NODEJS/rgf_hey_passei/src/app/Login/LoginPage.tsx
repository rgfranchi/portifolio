import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./LoginService";

/**
 * Função com o roteamento para as funcionalidades das entidades Empresas.
 * Tutorial sub pagina : https://reactrouter.com/web/example/nesting
 */
const LoginPage = () => {
  // console.log("LOGIN PAGE");
  return <Login />;
};
export default LoginPage;
