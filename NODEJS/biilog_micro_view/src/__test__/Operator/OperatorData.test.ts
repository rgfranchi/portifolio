import { getIsEmpty, mockServer } from "../server/server";
import {
  listOperatorMock as listMock,
  operatorMock as entityMock,
} from "../server/serverOperator";

import {
  emptyOperator,
  getList,
  getListByCompany,
  findById,
  saveData,
  deleteData,
} from "../../Operator/OperatorData";
import { convertIdToNumeric } from "../testHelper/test-convert";
import { defaultMessageTextData } from "../testHelper/test-text-defaults";

let server: any;

let total: number = 0;

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.operators;
};

beforeEach(() => {
  server = mockServer();
  server.logging = false;
  if (!getIsEmpty()) {
    schemaUpdate();
    total = schema.length;
    expect(total).toBe(7);
  }
});

afterEach(() => {
  server.shutdown();
});

describe("Operator variables", () => {
  /**
   * verifica variáveis que influencia na atualização/criação
   */
  test("emptyData", () => {
    expect(emptyOperator.id).toEqual(0);
    expect(emptyOperator.companyId).toEqual(0);
  });
});

describe("Operator read", () => {
  /**
   * Lista de operador associado a uma empresa.
   */
  test("getListByCompany", async () => {
    const companyId = listMock[3].companyId;
    const listByCompany = await getListByCompany(companyId.toString());
    const res = listMock.filter((obj) => obj.companyId === companyId);
    expect(convertIdToNumeric(listByCompany.response)).toEqual(res);
    expect(listByCompany.status).toEqual(200);
  });

  /**
   * Lista retornada é a mesma mo MOCK
   */
  test("getList", async () => {
    const findAll = await getList();
    expect(convertIdToNumeric(findAll.response)).toEqual(listMock);
    expect(findAll.status).toEqual(200);
  });

  /**
   * Localiza operador pelo ID
   */
  test("findById", async () => {
    const id = listMock[2].id;
    const byId = await findById(id.toString());
    const res = listMock.filter((obj) => obj.id === id);
    expect(convertIdToNumeric([byId.response])).toEqual(res);
    expect(byId.status).toEqual(200);
  });
});

/**
 * Altera registros no banco de dados.
 */
describe("Operator change", () => {
  test("create", async () => {
    // iguala id a 0 para criar novo registro.
    entityMock.id = 0;
    // cria valor de controle pra localizar registro
    const valorControle = defaultMessageTextData.criadoValor;
    entityMock.rfid = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.criadoSucesso);
    expect(save.status).toEqual(201);
    schemaUpdate();
    // Busca no banco pelo valor id
    const inserted = schema.where({
      rfid: valorControle,
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
    entityMock.rfid = valorControle;
    // Salva novo valor
    const save = await saveData(entityMock);
    expect(save.response).toMatch(defaultMessageTextData.atualizadoSucesso);
    expect(save.status).toEqual(200);
    schemaUpdate();
    // Busca no banco pelo valor id
    // @ts-ignore
    const updated = schema.find(entityMock.id);
    // verifica valor atualizado.
    expect(updated.rfid).toBe(valorControle);
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
