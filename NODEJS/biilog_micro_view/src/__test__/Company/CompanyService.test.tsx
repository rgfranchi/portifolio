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

import { mockServer, forceEmpty, getIsEmpty } from "../server/server";
import store from "../../redux/store";
import { logout } from "../../redux/sessionSlice";

import { CreateForm, List, UpdateForm } from "../../Company/CompanyService";
import { companyMock, loadCompanyValidValues } from "../server/serverCompany";
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

let server: any;
let history: any = null;
// let storeSpyDispatch = jest.spyOn(store, "dispatch"); // or "dispatch" | "getState" | "subscribe" | "replaceReducer".

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.companies;
};

beforeEach(() => {
  cleanup();
  store.dispatch(logout());
  createSessionCurrentUser(store);
  jest.setTimeout(20000);
  history = createMemoryHistory();
  server = mockServer();
  server.logging = false;
  if (!getIsEmpty()) {
    schemaUpdate();
  }
});

afterEach(() => {
  server.shutdown();
});

describe("CompanyService CreateForm", () => {
  test("success", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await act(async () => {
      await loadCompanyValidValues(userEvent, screen);
      await userEvent.type(
        screen.getByLabelText("Logradouro"),
        companyMock.logradouro,
        {
          delay: 100,
        }
      );
      fireEvent.click(screen.getByText("Salvar"));
    });

    await verifyScreenAfterSave(true, store);
  });

  test("fail 400", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await act(async () => {
      await loadCompanyValidValues(userEvent, screen);
      await userEvent.type(
        screen.getAllByLabelText("Logradouro")[0],
        "RETORNA_ERRO_400",
        {
          delay: 100,
        }
      );
      fireEvent.click(screen.getByText("Salvar"));
    });
    await verifyScreenAfterSave(false, store);
  });
});

describe("CompanyService UpdateForm", () => {
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
    // Verifica valores em Tela
    // @ts-ignore
    expect(screen.getByLabelText("Nome").value).toEqual(dataUpdate.nome);
    // @ts-ignore
    expect(screen.getByLabelText("Contato").value).toEqual(
      dataUpdate.nomeContato
    );
    // @ts-ignore
    expect(screen.getByLabelText("CNPJ").value).toEqual(dataUpdate.cnpj);
    // @ts-ignore
    expect(screen.getByLabelText("E-mail").value).toEqual(dataUpdate.email);
    // @ts-ignore
    expect(screen.getByLabelText("Logradouro").value).toEqual(
      dataUpdate.logradouro
    );
    // altera valores
    dataUpdate.logradouro = "LOGRADOURO ATUALIZADO";
    dataUpdate.email = "novo@email.com";
    await act(async () => {
      await userEvent.type(
        screen.getByLabelText("Logradouro"),
        dataUpdate.logradouro,
        {
          delay: 100,
        }
      );
      await userEvent.type(screen.getByLabelText("E-mail"), dataUpdate.email, {
        delay: 100,
      });
      fireEvent.click(screen.getByText("Salvar"));
    });

    await verifyScreenAfterSave(true, store);

    schemaUpdate();
    // busca e compara com o registro
    expect(schema).toEqual(expect.arrayContaining([dataUpdate]));
  });

  test("fail 204 not found", async () => {
    updateId = 9999;
    history = createMemoryHistory();
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

describe("CompanyService List", () => {
  test("UPDATE read", async () => {
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );

    await loadingScreenValues(true, "modal", store);

    // verifica quantidade de links na tabela 1 por linha update
    expect(screen.getAllByRole("link").length).toBe(schema.length);

    expect(history.location.pathname).toBe("/");
    // clica sobre o segundo link
    userEvent.click(screen.getAllByRole("link")[1]);
    // nova localização
    expect(history.location.pathname).toMatch("/mockBaseURL/update/");
  });

  test("DELETE read list", async () => {
    expect(schema.length).toBe(4);
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );
    await loadingScreenValues(true, "modal", store);
    const total = schema.length;
    expect(screen.getAllByRole("button").length).toBe(total);

    // clica sobre o segundo link
    await verifyExecuteScreenDelete(1, store);

    schemaUpdate();
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
