import React from "react";

import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  screen,
  act,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getIsEmpty, mockServer } from "../server/server";
import store from "../../redux/store";
import { logout } from "../../redux/sessionSlice";

import { Login, Logout } from "../../Login/LoginService";
import { listUserMock } from "../server/serverUser";
import {
  objMockEmptySession,
  objMockSession,
} from "../testHelper/test-session";
import {
  createSessionCurrentUser,
  renderProviderRouter,
} from "../testHelper/test-provider";
import { listGroupMock } from "../server/serverGroup";
import { convertIdToNumeric } from "../testHelper/test-convert";

let server: any;
let history: any = null;

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.users;
};

beforeEach(() => {
  cleanup();
  store.dispatch(logout());
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

describe("Login", () => {
  const mockUser = listUserMock[1];
  beforeEach(() => {
    // @ts-ignore
    expect(objMockEmptySession).toEqual(store.getState().session);
    expect(history.location.pathname).toBe("/");
  });
  test("success", async () => {
    renderProviderRouter(render, <Login />, history, store);
    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText("E-mail cadastrado"),
        mockUser.email,
        {
          delay: 100,
        }
      );
      await userEvent.type(
        screen.getByPlaceholderText("Senha"),
        atob(mockUser.password || ""),
        {
          delay: 100,
        }
      );
    });
    await act(async () => {
      fireEvent.click(screen.getByText("Login"));
    });
    // verifica se o modal Loading está ativo
    expect(screen.getByText(/Verificando Usuário/i)).toBeInTheDocument();
    // @ts-ignore verifica mensagem de falha.
    expect(store.getState().alert.hidden).toBe(true);
    // aguarda modal finalizar
    await waitForElementToBeRemoved(() =>
      screen.getByText(/Verificando Usuário/i)
    );
    // @ts-ignore
    expect(convertIdToNumeric(store.getState().session)).toEqual({
      userId: 2,
      company: { id: 1, nome: "BIILOG" },
      group: listGroupMock[1],
    });

    expect(history.location.pathname).toBe("/");
  });
  test("Unauthorized", async () => {
    renderProviderRouter(render, <Login />, history, store);
    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText("E-mail cadastrado"),
        "nao@cadastrado.com",
        {
          delay: 100,
        }
      );
      await userEvent.type(
        screen.getByPlaceholderText("Senha"),
        atob(mockUser.password || ""),
        {
          delay: 100,
        }
      );
    });
    await act(async () => {
      fireEvent.click(screen.getByText("Login"));
    });

    // verifica se o modal Loading está ativo
    expect(screen.getByText(/Verificando Usuário/i)).toBeInTheDocument();
    // @ts-ignore verifica mensagem de falha.
    expect(store.getState().alert.hidden).toBe(true);
    // aguarda modal finalizar
    await waitForElementToBeRemoved(() =>
      screen.getByText(/Verificando Usuário/i)
    );
    // @ts-ignore
    expect(store.getState().session).toEqual(objMockEmptySession);
    expect(history.location.pathname).toBe("/login");
  });

  test("resposta 200 texto", async () => {
    renderProviderRouter(render, <Login />, history, store);
    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText("E-mail cadastrado"),
        "reposta@text.com",
        {
          delay: 100,
        }
      );
      await userEvent.type(
        screen.getByPlaceholderText("Senha"),
        atob(mockUser.password || ""),
        {
          delay: 100,
        }
      );
    });
    await act(async () => {
      fireEvent.click(screen.getByText("Login"));
    });

    // verifica se o modal Loading está ativo
    expect(screen.getByText(/Verificando Usuário/i)).toBeInTheDocument();
    // @ts-ignore verifica mensagem de falha.
    expect(store.getState().alert.hidden).toBe(true);
    // aguarda modal finalizar
    await waitForElementToBeRemoved(() =>
      screen.getByText(/Verificando Usuário/i)
    );
    // @ts-ignore
    expect(store.getState().session).toEqual(objMockEmptySession);
    expect(history.location.pathname).toBe("/");
  });
});

describe("Logout", () => {
  // https://stackoverflow.com/questions/48728167/simulate-clicking-ok-or-cancel-in-a-confirmation-window-using-enzyme
  let confirmSpy: any;
  beforeEach(() => {
    confirmSpy = jest.spyOn(window, "confirm");
    createSessionCurrentUser(store);
    // @ts-ignore
    expect(objMockSession).toEqual(store.getState().session);
  });
  afterEach(() => confirmSpy.mockRestore());
  test("success", async () => {
    // janela de confirmação positiva
    confirmSpy.mockImplementation(jest.fn(() => true));
    renderProviderRouter(render, <Logout />, history, store);
    // verifica se o modal Loading está ativo
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    await act(async () => {
      await act(async () => {
        fireEvent.click(screen.getByText("Logout"));
      });
    });
    // @ts-ignore
    expect(store.getState().session).toEqual(objMockEmptySession);
  });

  test("cancel", async () => {
    // janela de confirmação negativa
    confirmSpy.mockImplementation(jest.fn(() => false));
    renderProviderRouter(render, <Logout />, history, store);
    // verifica se o modal Loading está ativo
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    await act(async () => {
      await act(async () => {
        fireEvent.click(screen.getByText("Logout"));
      });
    });

    window.confirm = jest.fn(() => true);
    // @ts-ignore
    expect(store.getState().session).toEqual(objMockSession);
  });
});
