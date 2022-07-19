import { forceEmpty, getIsEmpty, mockServer } from "../server/server";
import {
  companyMock as entityMock,
  listCompanyMock as listMock,
} from "../server/serverCompany";

import {
  emptyCompany,
  getList,
  getDropdown,
  findById,
  saveData,
  deleteData,
} from "../../Company/CompanyData";
import { convertIdToNumeric } from "../testHelper/test-convert";
import { defaultMessageTextData } from "../testHelper/test-text-defaults";

let server: any;

let total: number = 0;

let startTotal = 4;

// atualiza schema
let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.companies;
};

beforeEach(() => {
  server = mockServer();
  server.logging = false;
  if (!getIsEmpty()) {
    schemaUpdate();
    total = schema.length;
    expect(total).toBe(startTotal);
  }
});

afterEach(() => {
  server.shutdown();
});

describe("Company variables", () => {
  /**
   * verifica variáveis que influencia na atualização/criação
   */
  test("emptyData", () => {
    expect(emptyCompany.id).toEqual(0);
  });
});

describe("Company read", () => {
  /**
   * Recebe valores id e nome da empresa.
   */
  test("getDropdown", async () => {
    const listDropdown = await getDropdown();
    // @ts-ignore
    expect(listDropdown.response[2].id).toEqual(listMock[2].id.toString());
    // @ts-ignore
    expect(listDropdown.response[2].nome).toEqual(listMock[2].nome);
    expect(listDropdown.response.length).toEqual(startTotal);
  });

  test("getList", async () => {
    const findAll = await getList();
    expect(convertIdToNumeric(findAll.response)).toEqual(listMock);
    expect(findAll.status).toEqual(200);
  });

  test("findById", async () => {
    const id = listMock[2].id;
    const byId = await findById(id.toString());
    const res = listMock.filter((obj) => obj.id === id);
    expect(convertIdToNumeric([byId.response])).toEqual(res);
    expect(byId.status).toEqual(200);
  });
});

describe("Company read empty", () => {
  beforeAll(() => {
    forceEmpty(true);
  });
  afterAll(() => {
    forceEmpty(false);
  });
  /**
   * Recebe valores id e nome da empresa.
   */
  test("getDropdown", async () => {
    const listDropdown = await getDropdown();
    expect(listDropdown.response).toMatch(defaultMessageTextData.vaziaResponse);
    expect(listDropdown.status).toEqual(204);
  });

  test("getList", async () => {
    const findAll = await getList();
    expect(findAll.response).toMatch(defaultMessageTextData.vaziaResponse);
    expect(findAll.status).toEqual(204);
  });

  test("findById", async () => {
    const id = listMock[3].id;
    const byId = await findById(id.toString());
    expect(byId.response).toMatch(defaultMessageTextData.vaziaResponse);
    expect(byId.status).toEqual(204);
  });
});

describe("Company read error", () => {
  beforeEach(() => {
    server.shutdown();
    console.error = function () {}; // desabilita console de erro.
  }); //sobrescreve método global
  afterEach(() => {}); //sobrescreve método global

  test("getDropdown", async () => {
    const listDropdown = await getDropdown();
    expect(listDropdown.response).toMatch(
      defaultMessageTextData.falhaAcessarServidor
    );
    expect(listDropdown.status).toEqual(0);
  });

  test("getList", async () => {
    const findAll = await getList();
    expect(findAll.response).toMatch(
      defaultMessageTextData.falhaAcessarServidor
    );
    expect(findAll.status).toEqual(0);
  });

  test("findById", async () => {
    const id = listMock[2].id;
    const byId = await findById(id.toString());
    expect(byId.response).toMatch(defaultMessageTextData.falhaAcessarServidor);
    expect(byId.status).toEqual(0);
  });

  test("findById undefined", async () => {
    const id = listMock[2].id;
    // @ts-ignore
    const byId = await findById(undefined);
    expect(byId.response).toMatch(defaultMessageTextData.idNaoDefinido);
    expect(byId.status).toEqual(406);
  });
});

describe("Company change", () => {
  let total = 0;

  beforeEach(() => {
    // verifica quantidade de objetos antes de salvar
    expect(server.schema.db.companies.length).toBe(startTotal);
    total = server.schema.db.companies.length;
  });

  test("create", async () => {
    // iguala id a 0 para criar novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.criadoValor;
    entityMock.logradouro = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.criadoSucesso);
    expect(save.status).toEqual(201);
    schemaUpdate();
    // Busca no banco pelo valor id
    const inserted = schema.where({
      logradouro: valorControle,
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
    entityMock.logradouro = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.atualizadoSucesso);
    expect(save.status).toEqual(200);
    schemaUpdate();
    // Busca no banco pelo valor id
    // @ts-ignore
    const updated = schema.find(entityMock.id);
    // verifica valor atualizado.
    expect(updated.logradouro).toBe(valorControle);
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

describe("Company change error", () => {
  test("save 208", async () => {
    // iguala id a 0 para criar novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.erro208;
    entityMock.logradouro = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.erro208Mensagem);
    expect(save.status).toEqual(208);
    schemaUpdate();
    // verifica quantidade inserida.
    expect(schema.length).toBe(total);
  });

  test("save 400", async () => {
    // iguala id a 0 para criar novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.erro400;
    entityMock.logradouro = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.erro400Mensagem);
    expect(save.status).toEqual(400);
    schemaUpdate();
    // verifica quantidade inserida.
    expect(schema.length).toBe(total);
  });

  test("delete 400", async () => {
    // iguala id ao segundo registro para excluir.
    const deleteId = 9999;
    // Exclui registro
    const ret = await deleteData(deleteId.toString());
    expect(ret.status).toBe(400);
    expect(ret.response).toMatch(defaultMessageTextData.erro400Mensagem);
    schemaUpdate();
    expect(schema.length).toBe(total);
  });
});
