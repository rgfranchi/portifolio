import { mockServer, getIsEmpty } from "../server/server";
import {
  listUserMock as listMock,
  userMock as entityMock,
} from "../server/serverUser";

import {
  deleteData,
  emptyUser,
  findById,
  getListByCompany,
  IUser,
  saveData,
} from "../../User/UserData";
import { convertIdToNumeric } from "../testHelper/test-convert";
import { defaultMessageTextData } from "../testHelper/test-text-defaults";

let server: any;

let total: number = 0;

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.users;
};

beforeEach(() => {
  server = mockServer();
  server.logging = false;
  if (!getIsEmpty()) {
    schemaUpdate();
    total = schema.length;
    expect(total).toBe(3);
  }
});

afterEach(() => {
  server.shutdown();
});

describe("User variables", () => {
  test("emptyData", () => {
    expect(emptyUser.id).toEqual(0);
    expect(emptyUser.password).toEqual("");
    expect(emptyUser.email).toEqual("");
  });
});

describe("User read", () => {
  test("getListByCompany", async () => {
    const companyId = listMock[2].companyId;
    const listByCompany = await getListByCompany(companyId.toString());
    const res = listMock.filter((obj) => obj.companyId === companyId);
    expect(convertIdToNumeric(listByCompany.response)).toEqual(res);
    expect(listByCompany.status).toEqual(200);
  });

  test("findById", async () => {
    const id = listMock[2].id;
    const byId = await findById(id.toString());
    const res = listMock.filter((obj) => obj.id === id);
    res[0].password = "";
    expect([convertIdToNumeric(byId.response)]).toEqual(res);
    expect(byId.status).toEqual(200);
  });
});

describe("User change", () => {
  test("create", async () => {
    // iguala id a 0 para criar novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.criadoValor;
    entityMock.nome = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.criadoSucesso);
    expect(save.status).toEqual(201);
    schemaUpdate();
    // Busca no banco pelo valor id
    const inserted = schema.where({
      nome: valorControle,
    })[0];
    // insere id recuperado para comparar todo objeto.
    entityMock.id = inserted.id;
    // verifica se o novo valor é igual ao inserido.
    expect(inserted).toEqual(entityMock);
    // verifica quantidade inserida.
    expect(schema.length).toBe(total + 1);
  });

  test("update", async () => {
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.atualizadoValor;
    // iguala id ao segundo registro para update.
    entityMock.id = schema[1].id;
    // atualiza campo nome do registro inserido.
    entityMock.nome = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.atualizadoSucesso);
    expect(save.status).toEqual(200);
    schemaUpdate();
    // Busca no banco pelo valor id
    // @ts-ignore
    const updated = schema.find(entityMock.id);
    // verifica valor atualizado.
    expect(updated.nome).toBe(valorControle);
    // // verifica quantidade inserida.
    expect(schema.length).toBe(total);
  });

  test("delete", async () => {
    // iguala id ao segundo registro para excluir.
    const deleteId = schema[1].id;
    // Exclui registro
    const ret = await deleteData(deleteId);
    expect(ret.status).toBe(202);
    expect(ret.response).toEqual(defaultMessageTextData.excluidoSucesso);
    schemaUpdate();
    // Tenta recuperar valor
    const deleted = schema.find(deleteId);
    // verifica se o novo valor não existe
    expect(deleted).toBeNull();
    // verifica quantidade de registros.
    expect(schema.length).toBe(total - 1);
  });
});
