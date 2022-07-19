import { mockServer, forceEmpty, getIsEmpty } from "../server/server";
import {
  forkliftMock as entityMock,
  listForkliftMock as listMock,
} from "../server/serverForklift";

import {
  emptyForklift,
  getList,
  getListByCompany,
  findById,
  saveData,
  deleteData,
} from "../../Forklift/ForkliftData";
import { convertIdToNumeric } from "../testHelper/test-convert";
import { emptyModule } from "../../Module/ModuleData";
import { defaultMessageTextData } from "../testHelper/test-text-defaults";

let server: any;

let total: number = 0;

let startTotal = 6;

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.forklifts;
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

describe("Forklift variables", () => {
  /**
   * verifica variáveis que influencia na atualização/criação
   */
  test("emptyData", () => {
    expect(emptyForklift.id).toEqual(0);
    expect(emptyForklift.module).toEqual(emptyModule);
  });
});

describe("Forklift read", () => {
  /**
   * Lista de operador associado a uma empresa.
   */
  test("getListByCompany", async () => {
    const companyId = listMock[2].module.companyId;
    const listByCompany = await getListByCompany(companyId.toString());
    const res = listMock.filter((obj) => obj.module.companyId === companyId);
    expect(convertIdToNumeric(listByCompany.response)).toEqual(
      convertIdToNumeric(res)
    );
    expect(listByCompany.status).toEqual(200);
  });

  /**
   * Lista retornada é a mesma do MOCK
   */
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

describe("Forklift read empty", () => {
  beforeAll(() => {
    forceEmpty(true);
  });
  afterAll(() => {
    forceEmpty(false);
  });

  test("getListByCompany", async () => {
    const companyId = listMock[3].module.companyId;
    const listByCompany = await getListByCompany(companyId.toString());
    expect(listByCompany.response).toMatch(
      defaultMessageTextData.vaziaResponse
    );
    expect(listByCompany.status).toEqual(204);
  });

  test("getList", async () => {
    const findAll = await getList();
    expect(findAll.response).toMatch(defaultMessageTextData.vaziaResponse);
    expect(findAll.status).toEqual(204);
  });

  test("findById", async () => {
    const id = listMock[2].id;
    const byId = await findById(id.toString());
    expect(byId.response).toMatch(defaultMessageTextData.vaziaResponse);
    expect(byId.status).toEqual(204);
  });
});

describe("Forklift read error", () => {
  beforeEach(() => {
    server.shutdown();
    console.error = function () {}; // desabilita console de erro.
  }); //sobrescreve método global
  afterEach(() => {}); //sobrescreve método global

  test("getListByCompany", async () => {
    const companyId = listMock[3].module.companyId;
    const listByCompany = await getListByCompany(companyId.toString());
    expect(listByCompany.response).toMatch(
      defaultMessageTextData.falhaAcessarServidor
    );
    expect(listByCompany.status).toEqual(0);
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

describe("Forklift change", () => {
  test("create", async () => {
    // iguala id a 0 para criar novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.criadoValor;
    entityMock.modelo = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.criadoSucesso);
    expect(save.status).toEqual(201);
    schemaUpdate();
    // Busca no banco pelo valor id
    const inserted = schema.where({
      modelo: valorControle,
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
    entityMock.modelo = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.atualizadoSucesso);
    expect(save.status).toEqual(200);
    schemaUpdate();
    // Busca no banco pelo valor id
    // @ts-ignore
    const updated = schema.find(entityMock.id);
    // verifica valor atualizado.
    expect(updated.modelo).toBe(valorControle);
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

describe("Forklift change error", () => {
  test("save 208", async () => {
    // iguala id a 0 para tentativa de novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.erro208;
    entityMock.modelo = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.erro208Mensagem);
    expect(save.status).toEqual(208);
    schemaUpdate();
    // verifica quantidade inserida.
    expect(schema.length).toBe(total);
  });

  test("save 400", async () => {
    // iguala id a 0 para tentativa de novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.erro400;
    entityMock.modelo = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.erro400Mensagem);
    expect(save.status).toEqual(400);
    // verifica quantidade inserida.
    expect(schema.length).toBe(total);
  });

  test("delete 400", async () => {
    // iguala id a um valor inexistente.
    const deleteId = 9999;
    // Exclui registro
    const ret = await deleteData(deleteId.toString());
    expect(ret.status).toBe(400);
    expect(ret.response).toMatch(defaultMessageTextData.erro400Mensagem);
    schemaUpdate();
    expect(schema.length).toBe(total);
  });
});
