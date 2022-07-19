import * as React from "react";

import { mockServer } from "../server/server";
import { listUserMock as listMock } from "../server/serverUser";

import { authenticationUser, emptyLogin } from "../../Login/LoginData";
import { IUser } from "../../User/UserData";
import { defaultMessageTextData } from "../testHelper/test-text-defaults";

let server: any;

beforeEach(() => {
  server = mockServer();
  server.logging = false;
});

afterEach(() => {
  server.shutdown();
});

describe("Forklift variables", () => {
  /**
   * verifica variáveis que influencia na atualização/criação
   */
  test("emptyData", () => {
    expect(emptyLogin.email).toEqual("");
    expect(emptyLogin.password).toEqual("");
  });
});

describe("Login read", () => {
  /**
   * Lista de operador associado a uma empresa.
   */
  test("authenticationUser", async () => {
    const user = listMock[2];
    const currentUser = await authenticationUser(
      user.email,
      user.password || ""
    );

    expect(currentUser.status).toEqual(200);
    expect(currentUser.response).toEqual({
      userId: 3,
      company: { id: 2, nome: "WINE" },
      group: {
        id: "3",
        nome: "Usuário Comum",
        access: [
          {
            label: "Operadores",
            page: {
              create: {
                label: "Inserir Operador",
                path: "/new",
              },
              delete: {
                path: "/delete",
              },
              update: {
                path: "/update",
              },
            },
            path: "/operator",
          },
        ],
      },
    });
  });
});

describe("Login read empty", () => {
  test("authenticationUser not found", async () => {
    const currentUser = await authenticationUser(
      "nao@cadastrado.com",
      "123654"
    );
    expect(currentUser.status).toEqual(401);
    expect(currentUser.response).toMatch(/Usuário ou Senha inválido/i);
  });
});

describe("Forklift read error", () => {
  test("authenticationUser Server fail 404", async () => {
    const currentUser = await authenticationUser("fake@erro.com", "123654");
    expect(currentUser.status).toEqual(404);
    expect(currentUser.response).toMatch(
      defaultMessageTextData.erro400Mensagem
    );
  });
});
