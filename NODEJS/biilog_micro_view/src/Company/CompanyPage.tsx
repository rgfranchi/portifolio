/**
 * Controle a principal das Entidade que será utilizada.
 * Realiza o carregamento de cada funcionalidade.
 */
import * as React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { CreateForm, UpdateForm, List } from "./CompanyService";

import TitleComponent from "../components/TitleComponent";
import { ButtonCreate } from "../components/ButtonsComponent";
import { ICRUDAccess } from "../interfaces/PagesInterface";

/**
 * Função com o roteamento para as funcionalidades das entidades Empresas.
 * Tutorial sub pagina : https://reactrouter.com/web/example/nesting
 */
const CompanyPage: React.FC<ICRUDAccess> = ({ access }) => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact={true} path={path}>
        <TitleComponent
          title="Empresas"
          description="Empresas cadastradas que tem acesso ao sistema."
          actions={
            access.create && <ButtonCreate linkTo={url + access.create.path} />
          }
        />
        <List baseUrl={url} access={access} />
      </Route>
      {access.create && (
        <Route exact={true} path={`${path}/new`}>
          <TitleComponent
            title="Cadastrar Empresa"
            description="Criar nova empresa."
          />
          <CreateForm />
        </Route>
      )}
      {access.update && (
        <Route path={`${path}/update/:id`} exact={true}>
          <TitleComponent
            title="Atualizar Empresa"
            description="Mantenha as informações atualizadas da empresas"
          />
          <UpdateForm />
        </Route>
      )}
    </Switch>
  );
};
export default CompanyPage;
