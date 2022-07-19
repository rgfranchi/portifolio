import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./LoginService";

/**
 * Função com o roteamento para as funcionalidades das entidades Empresas.
 * Tutorial sub pagina : https://reactrouter.com/web/example/nesting
 */
const LoginPage = () => {
  return (
    <Switch>
      <Route exact={true} path={["/", "/login"]}>
        <Login />
      </Route>
    </Switch>
  );
};
export default LoginPage;
