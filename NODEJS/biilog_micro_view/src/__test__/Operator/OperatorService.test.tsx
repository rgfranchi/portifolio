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

import { CreateForm, List, UpdateForm } from "../../Operator/OperatorService";
import { loadOperatorValidValues } from "../server/serverOperator";
import { fixedGlobalDate } from "../testHelper/test-globalDate";
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

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.operators;
};

const realDate = Date.bind(global.Date);

beforeAll(() => {
  fixedGlobalDate(2021, 0, 11, 0, 0, 0);
});

afterAll(() => {
  global.Date = realDate;
});

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

describe("OperatorService CreateForm", () => {
  test("success", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await act(async () => {
      await loadOperatorValidValues(userEvent, screen);
      await userEvent.type(screen.getByLabelText("Código RFID"), "12344556", {
        delay: 100,
      });
      fireEvent.click(screen.getByText("Salvar"));
    });
    await verifyScreenAfterSave(true, store);
  });
  test("fail 400", async () => {
    renderProviderRouter(render, <CreateForm />, history, store);
    await act(async () => {
      await loadOperatorValidValues(userEvent, screen);
      await userEvent.type(
        screen.getByLabelText("Código RFID"),
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

describe("OperatorService UpdateForm", () => {
  let updateId = 1;
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
    const dataUpdate = schema.find(updateId);
    // verificar se carregado alguns valores
    // @ts-ignore
    expect(screen.getByLabelText("Nome").value).toEqual(dataUpdate.nome);
    // @ts-ignore
    expect(screen.getByLabelText("Código").value).toEqual(
      dataUpdate.codOperador
    );
    // @ts-ignore
    expect(screen.getByLabelText("Função").value).toEqual(dataUpdate.funcao);
    // @ts-ignore
    expect(screen.getByLabelText("Sexo").value).toEqual(dataUpdate.sexo);
    // @ts-ignore
    expect(screen.getByLabelText("Senha").value).toEqual(dataUpdate.senha);
    // @ts-ignore
    expect(screen.getByLabelText("Código RFID").value).toEqual(dataUpdate.rfid);
    // @ts-ignore
    expect(screen.getByLabelText("E-mail").value).toEqual(dataUpdate.email);
    // @ts-ignore // utilizada a data mock do sistema
    expect(screen.getByLabelText("Acesso Inicial").value).toEqual("11/01/2021");
    // @ts-ignore
    expect(screen.getByLabelText("Acesso Final").value).toEqual("11/01/2021");
    // @ts-ignore
    expect(screen.getByLabelText("Observações").value).toEqual(
      dataUpdate.observacao
    );
    // altera valores
    dataUpdate.nome = "NOME ATUALIZADO";
    dataUpdate.senha = "NOVA SENHA";
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Nome"), dataUpdate.nome, {
        delay: 100,
      });
      await userEvent.type(screen.getByLabelText("Senha"), dataUpdate.senha, {
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

describe("OperatorService List", () => {
  test("UPDATE read", async () => {
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );
    await loadingScreenValues(true, "modal", store);

    // verifica quantidade de links na tabela 1 por linha
    expect(screen.getAllByRole("link").length).toBe(3);
    // localização atual
    expect(history.location.pathname).toBe("/");
    // clica sobre o segundo link
    userEvent.click(screen.getAllByRole("link")[1]);
    // nova localização
    expect(history.location.pathname).toMatch("/mockBaseURL/update/");
  });

  test("DELETE read list", async () => {
    const total = 7;
    expect(schema.length).toBe(total);
    renderProviderRouter(
      render,
      <List baseUrl="mockBaseURL" access={{ update: {}, delete: {} }} />,
      history,
      store
    );
    await loadingScreenValues(true, "modal", store);
    expect(screen.getAllByRole("button").length).toBe(3);
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
