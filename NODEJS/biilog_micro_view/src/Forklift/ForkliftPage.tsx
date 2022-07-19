import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { ButtonCreate } from "../components/ButtonsComponent";
import TitleComponent from "../components/TitleComponent";

import { ICRUDAccess } from "../interfaces/PagesInterface";
import { CreateForm, List, UpdateForm } from "./ForkliftService";

const ForkliftPage: React.FC<ICRUDAccess> = ({ access }) => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact={true} path={path}>
        <TitleComponent
          title="Equipamento"
          description="Equipamento cadastrados no sistema."
          actions={
            access.create && <ButtonCreate linkTo={url + access.create.path} />
          }
        />
        <List baseUrl={url} access={access} />
      </Route>
      {access.create && (
        <Route exact={true} path={`${path}/new`}>
          <TitleComponent
            title="Cadastrar Equipamento"
            description="Cadastro de módulo, equipamento, associa localização e operadores."
          />
          <CreateForm />
        </Route>
      )}
      {access.update && (
        <Route path={`${path}/update/:id`} exact={true}>
          <TitleComponent title="Atualizar Equipamento" />
          <UpdateForm />
        </Route>
      )}
    </Switch>
  );
};

export default ForkliftPage;
