/**
 * Controle principal da Entidade.
 * Realiza o carregamento para página de list update create.
 */
import * as React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import TitleComponent from "../components/TitleComponent";
import { ButtonCreate } from "../components/ButtonsComponent";
import { ICRUDAccess } from "../interfaces/PagesInterface";

import { CreateForm, UpdateForm, List } from "./OperatorService";

/**
 * Função com o roteamento para as funcionalidades das entidades Empresas.
 * Tutorial sub pagina : https://reactrouter.com/web/example/nesting
 */
const OperatorPage: React.FC<ICRUDAccess> = ({ access }) => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact={true} path={path}>
        <TitleComponent
          title="Operador"
          description="Operadores castrados no sistema"
          actions={
            access.create && <ButtonCreate linkTo={url + access.create.path} />
          }
        />
        <List baseUrl={url} access={access} />
      </Route>
      {access.create && (
        <Route exact={true} path={`${path}/new`}>
          <TitleComponent
            title="Cadastrar Operador"
            description="Criar novo operador."
          />
          <CreateForm />
        </Route>
      )}
      {access.update && (
        <Route path={`${path}/update/:id`} exact={true}>
          <TitleComponent title="Atualizar Operador" />
          <UpdateForm />
        </Route>
      )}
    </Switch>
  );
};
export default OperatorPage;
