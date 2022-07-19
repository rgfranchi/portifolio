import React from "react";

import { createMemoryHistory } from "history";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";

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

import { CreateForm, List, UpdateForm } from "../../Forklift/ForkliftService";

import store from "../../redux/store";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { loadForkliftValidValues } from "../server/serverForklift";
import { forceEmpty, getIsEmpty, mockServer } from "../server/server";
import { logout } from "../../redux/sessionSlice";

let server: any;
let history: any = null;

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.forklifts;
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

describe("ForkliftService CreateForm", () => {
  test("success", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await act(async () => {
      await loadForkliftValidValues(userEvent, fireEvent, screen);
      await userEvent.type(screen.getAllByLabelText("Modelo")[0], "12344556", {
        delay: 100,
      });
      fireEvent.click(screen.getByText("Salvar"));
    });
    await verifyScreenAfterSave(true, store);
  });

  test("fail 400", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await act(async () => {
      await loadForkliftValidValues(userEvent, fireEvent, screen);
      await userEvent.type(
        screen.getAllByLabelText("Modelo")[0],
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

describe("ForkliftService UpdateForm", () => {
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
    expect(screen.getByLabelText("Código").value).toEqual(dataUpdate.codigo);
    // @ts-ignore
    expect(screen.getByLabelText("Ano de Fabricação").value).toEqual(
      dataUpdate.anoFabricacao
    );

    expect(
      // @ts-ignore
      screen.getByPlaceholderText("Informações do módulo ...").value
    ).toEqual(dataUpdate.module.observacoes);
    // altera valores
    dataUpdate.codigo = "CODIGO ATUALIZADO";
    dataUpdate.anoFabricacao = "1999";
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Código"), dataUpdate.codigo, {
        delay: 100,
      });
      await userEvent.type(
        screen.getByLabelText("Ano de Fabricação"),
        dataUpdate.anoFabricacao,
        {
          delay: 100,
        }
      );
      fireEvent.click(screen.getByText("Salvar"));
    });
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

describe("ForkliftService List", () => {
  test("UPDATE read", async () => {
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );
    await loadingScreenValues(true, "modal", store);

    // verifica quantidade de links na tabela 1 por linha
    expect(screen.getAllByRole("link").length).toBe(2);
    // localização atual
    expect(history.location.pathname).toBe("/");
    // clica sobre o segundo link
    userEvent.click(screen.getAllByRole("link")[1]);
    // nova localização
    expect(history.location.pathname).toMatch("/mockBaseURL/update/");
  });

  test("DELETE read list", async () => {
    const total = 6;
    expect(schema.length).toBe(total);
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );

    await loadingScreenValues(true, "modal", store);

    expect(screen.getAllByRole("button").length).toBe(2);
    // clica sobre o segundo link
    await verifyExecuteScreenDelete(1, store);

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
