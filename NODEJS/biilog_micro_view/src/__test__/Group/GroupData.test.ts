import { forceEmpty, getIsEmpty, mockServer } from "../server/server";
import { listGroupMock as listMock } from "../server/serverGroup";

import {
  emptyGroup,
  getList,
  listGroupSelect,
  // findById, // não implementado
  // saveData, // não implementado
  // deleteData, // não implementado
} from "../../Group/GroupData";
import { convertIdToNumeric } from "../testHelper/test-convert";
import { defaultMessageTextData } from "../testHelper/test-text-defaults";

let server: any;

let schema: any = null;
const schemaUpdate = () => {
  schema = server.schema.db.groups;
};

beforeEach(() => {
  server = mockServer();
  server.logging = false;
  if (!getIsEmpty()) {
    schemaUpdate();
  }
});

afterEach(() => {
  server.shutdown();
});

describe("Group variables", () => {
  /**
   * verifica variáveis que influencia na atualização/criação
   */
  test("emptyData", () => {
    expect(emptyGroup.id).toEqual(0);
    expect(emptyGroup.access).toEqual([]);
  });
});

describe("Group read", () => {
  /**
   * Lista retornada é a mesma mo MOCK
   */
  test("getList", async () => {
    const findAll = await getList();
    expect(convertIdToNumeric(findAll.response)).toEqual(listMock);
    expect(findAll.status).toEqual(200);
  });

  test("listGroupSelect", async () => {
    const findAll = await listGroupSelect();
    expect(findAll.response.length).toEqual(listMock.length);
    expect(findAll.status).toEqual(200);
    expect(findAll.response[0]).toEqual({
      id: parseInt(schema[0].id),
      nome: schema[0].nome,
    });
  });
});

describe("Group read empty", () => {
  beforeAll(() => {
    forceEmpty(true);
  });
  afterAll(() => {
    forceEmpty(false);
  });
  /**
   * Lista retornada é a mesma mo MOCK
   */
  test("getList", async () => {
    const findAll = await getList();
    expect(findAll.response).toMatch(defaultMessageTextData.vaziaResponse);
    expect(findAll.status).toEqual(204);
  });
  test("listGroupSelect", async () => {
    const findAll = await listGroupSelect();
    expect(findAll.response).toMatch(defaultMessageTextData.vaziaResponse);
    expect(findAll.status).toEqual(204);
  });
});
