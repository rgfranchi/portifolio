import React from "react";

import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  screen,
  act,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { forceEmpty, getIsEmpty, mockServer } from "../server/server";
import store from "../../redux/store";
import { logout } from "../../redux/sessionSlice";

import { CreateForm, List, UpdateForm } from "../../User/UserService";
import {
  createSessionCurrentUser,
  renderProviderMemoryRouter,
  renderProviderRouter,
} from "../testHelper/test-provider";
import {
  loadingScreenValues,
  verifyExecuteScreenDelete,
  verifyScreenAfterSave,
} from "../testHelper/test-service";
import { loadUserValidValues } from "../server/serverUser";

let server: any;
let history: any = null;

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.users;
};

beforeEach(() => {
  cleanup();
  store.dispatch(logout());
  createSessionCurrentUser(store);
  jest.setTimeout(20000);
  server = mockServer();
  server.logging = false;
  history = createMemoryHistory();
  if (!getIsEmpty()) {
    schemaUpdate();
  }
});

afterEach(() => {
  server.shutdown();
});

describe("UserService CreateForm", () => {
  test("success", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await loadingScreenValues(true, "modal", store);
    await act(async () => {
      await loadUserValidValues(userEvent, screen);
      await userEvent.type(screen.getByLabelText("Nome"), "NOME TESTE CREATE", {
        delay: 100,
      });
      fireEvent.click(screen.getByText("Salvar"));
    });

    await verifyScreenAfterSave(true, store);
  });

  test("fail 400", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await loadingScreenValues(true, "modal", store);
    await act(async () => {
      await loadUserValidValues(userEvent, screen);
      await userEvent.type(screen.getByLabelText("Nome"), "RETORNA_ERRO_400", {
        delay: 100,
      });
      fireEvent.click(screen.getByText("Salvar"));
    });
    await verifyScreenAfterSave(false, store);
  });
});

describe("UserService UpdateForm", () => {
  let updateId = 2;
  test("success", async () => {
    renderProviderMemoryRouter(
      render,
      <UpdateForm />,
      history,
      store,
      `/mockUpdate/${updateId}`,
      "/mockUpdate/:id"
    );

    await loadingScreenValues(true, "modal", store);
    // busca objeto por id
    const dataUpdate = schema.find(updateId);
    // verificar se carregado alguns valores
    // @ts-ignore
    expect(screen.getByLabelText("Nome").value).toEqual(dataUpdate.nome);
    // @ts-ignore
    expect(screen.getByLabelText("E-mail").value).toEqual(dataUpdate.email);
    // @ts-ignore
    expect(screen.getByLabelText("Senha").value).toEqual(""); // não deve carregar a senha.
    // @ts-ignore
    expect(screen.getByLabelText("Grupo").value).toEqual(
      dataUpdate.groupId.toString()
    );
    // altera valores
    dataUpdate.password = "SENHA ATuAL1ZAD@";
    dataUpdate.nome = "UPDATE NOME";
    await act(async () => {
      await userEvent.type(
        screen.getByLabelText("Senha"),
        dataUpdate.password,
        {
          delay: 100,
        }
      );
      await userEvent.type(screen.getByLabelText("Nome"), dataUpdate.nome, {
        delay: 100,
      });
      fireEvent.click(screen.getByText("Salvar"));
    });
    dataUpdate.password = btoa(dataUpdate.password); // criptografa a senha
    await verifyScreenAfterSave(true, store);
    schemaUpdate();
    // busca e compara com o registro
    expect(schema).toEqual(expect.arrayContaining([dataUpdate]));
  });

  test("fail 204 not found", async () => {
    updateId = 9999;
    renderProviderMemoryRouter(
      render,
      <UpdateForm />,
      history,
      store,
      `/mockUpdate/${updateId}`,
      "/mockUpdate/:id"
    );
    await loadingScreenValues(false, "modal", store);
  });
});

describe("UserService List", () => {
  test("UPDATE read", async () => {
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );
    await loadingScreenValues(true, "modal", store);

    // verifica quantidade de links na tabela 1 por linha
    expect(screen.getAllByRole("link").length).toBe(1);
    // localização atual
    expect(history.location.pathname).toBe("/");
    // clica sobre o segundo link
    userEvent.click(screen.getAllByRole("link")[0]);
    // nova localização
    expect(history.location.pathname).toMatch("/mockBaseURL/update/");
  });

  test("DELETE read list", async () => {
    const total: number = 3;
    expect(schema.length).toBe(total);
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );

    await loadingScreenValues(true, "modal", store);

    expect(screen.getAllByRole("button").length).toBe(1);
    // clica sobre o segundo link
    await verifyExecuteScreenDelete(0, store);

    schemaUpdate();
    // contabiliza elementos no banco de dados.
    expect(schema.length).toBe(total - 1);
  });

  test("Empty", async () => {
    // altera variável do servidor para valor vazio
    forceEmpty(true);
    // reinicia servidor.
    server.shutdown();
    server = mockServer();
    server.logging = false;

    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );

    await loadingScreenValues(true, "alert", store);

    forceEmpty(false);
  });
});
