import * as React from "react";

import TitleComponent from "../../core/components/TitleComponent";
import { ButtonCreate } from "../../core/components/ButtonsComponent";
import { List, CreateForm, UpdateForm } from "./PessoaService";

import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";

import { api } from "../config/api";

import { ICRUDAccess } from "../../core/interfaces/PagesInterface";
import PessoaForm from "./PessoaForm";


const PessoaPage: React.FC<ICRUDAccess> = ({ access }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <TitleComponent
              title="Pessoa"
              description="Lista pessoas"
              actions={
                access.create && (
                  <ButtonCreate linkTo={access.create.path} text="NOVO" />
                )
              }
            />
            <List access={access} />
          </>
        }
      />
      <Route
        path="/create"
        element={
          <>
            <TitleComponent
              title="Cadastrar Pessoa"
              description="Criar novo registro."
            />
            <CreateForm />
          </>
        }
      />
      <Route
        path="/update/:id"
        element={
          <>
            <TitleComponent
              title="Atualizar Pessoa"
              description="Atualiza o registro de pessoa."
            />
            <UpdateForm />
          </>
        }
      />
    </Routes>
  );
};
export default PessoaPage;
