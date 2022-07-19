/**
 * Controle principal da Entidade.
 * Realiza o carregamento para página de list update create.
 */
import * as React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ICRUDAccess } from "../interfaces/PagesInterface";

import TitleComponent from "../components/TitleComponent";
import { ButtonCreate } from "../components/ButtonsComponent";

import { CreateForm, UpdateForm, List } from "./UserService";

const UserPage: React.FC<ICRUDAccess> = ({ access }) => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact={true} path={path}>
        <TitleComponent
          title="Usuário"
          description="Usuários cadastrados no sistema."
          actions={
            access.create && <ButtonCreate linkTo={url + access.create.path} />
          }
        />
        <List baseUrl={url} access={access} />
      </Route>
      {access.create && (
        <Route exact={true} path={`${path}/new`}>
          <TitleComponent
            title="Cadastra Usuário"
            description="Insere usuários no sistema."
          />
          <CreateForm />
        </Route>
      )}
      {access.update && (
        <Route path={`${path}/update/:id`}>
          <TitleComponent
            title="Atualiza Usuário"
            description="Atualiza registro do usuário no sistema."
          />
          <UpdateForm />
        </Route>
      )}
    </Switch>
  );
};
export default UserPage;
