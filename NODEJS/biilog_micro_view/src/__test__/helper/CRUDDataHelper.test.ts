import { ICompany } from "../../Company/CompanyData";
import {
  listAll,
  searchById,
  createUpdate,
  dropById,
} from "../../helper/CRUDDataHelper";
import { mockServer } from "../server/server";
import { companyMock, listCompanyMock } from "../server/serverCompany";
import { convertIdToNumeric } from "../testHelper/test-convert";

let server: any;
const dataMock: ICompany[] = listCompanyMock;

beforeEach(() => {
  server = mockServer();
  server.logging = false;
});

afterEach(() => {
  server.shutdown();
});

describe("listAll", () => {
  test("then", async () => {
    const resp = await listAll({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
    });
    expect(resp.status).toEqual(200);
    expect(convertIdToNumeric(resp.response)).toEqual(dataMock);
  });
  test("catch", async () => {
    const resp = await listAll({
      pathURL: "/company_erro",
      displayName: { one: "MOCK", many: "MOCKs" },
    });
    expect(resp.status).toEqual(500);
    expect(resp.response).toEqual(
      'ERROR STATUS[500]:{"errors":["FAKE Server not respond"]} [MOCKs]'
    );
  });
});

describe("searchById", () => {
  test("then", async () => {
    const resp = await searchById({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      id: "2",
    });
    expect(resp.status).toEqual(200);
    expect(convertIdToNumeric(resp.response)).toEqual(dataMock[1]);
  });
  test("catch", async () => {
    const resp = await searchById({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      id: "-9999",
    });
    expect(resp.status).toEqual(400);
    expect(resp.response).toEqual(
      'ERROR STATUS[400]:{"errors":["Fake Server Error 400"]} [MOCK]'
    );
  });
  test("undefined id", async () => {
    //@ts-ignore não possui id
    const resp = await searchById({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
    });
    expect(resp.status).toEqual(406);
    expect(resp.response).toEqual("ID não definido [MOCK]");
  });
});

describe("createUpdate", () => {
  test("create then", async () => {
    // @ts-ignore
    delete companyMock.id;
    const resp = await createUpdate({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      value: companyMock,
      textShow: "CREATE MOCK",
    });
    // @ts-ignore
    companyMock.id = resp.data.company.id;
    expect(resp.data).toEqual({ company: companyMock });
    expect(resp.status).toEqual(201);
    expect(convertIdToNumeric(resp.response)).toEqual(
      "Criado com sucesso [CREATE MOCK]"
    );
  });
  test("create catch", async () => {
    // @ts-ignore
    delete companyMock.id;
    companyMock.logradouro = "RETORNA_ERRO_4XX";
    const resp = await createUpdate({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      value: companyMock,
      textShow: "CREATE MOCK",
    });
    expect(resp.status).toEqual(499);
    expect(resp.response).toEqual("ERROR STATUS[499]:Erro FAKE 4XX [MOCK]");
  });
  test("update then", async () => {
    const data = dataMock[2];
    const resp = await createUpdate({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      value: data,
      valueId: data.id.toString(),
      textShow: "UPDATE MOCK",
    });
    expect(resp.data).toEqual({ company: data });
    expect(resp.status).toEqual(200);
    expect(convertIdToNumeric(resp.response)).toEqual(
      "Atualizado com sucesso [UPDATE MOCK]"
    );
  });
  test("update catch", async () => {
    let data = dataMock[2];
    data.logradouro = "RETORNA_ERRO_4XX";
    const resp = await createUpdate({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      value: data,
      valueId: data.id.toString(),
      textShow: "UPDATE MOCK",
    });
    expect(resp.status).toEqual(499);
    expect(convertIdToNumeric(resp.response)).toEqual(
      "ERROR STATUS[499]:Erro FAKE 4XX [MOCK]"
    );
  });
});

describe("dropById", () => {
  test("then", async () => {
    const resp = await dropById({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      id: dataMock[2].id.toString(),
    });
    expect(resp.status).toEqual(202);
    expect(convertIdToNumeric(resp.response)).toEqual("DELETED");
  });
  test("catch", async () => {
    const resp = await dropById({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      id: "9999",
    });
    expect(resp.status).toEqual(400);
    expect(convertIdToNumeric(resp.response)).toEqual(
      'ERROR STATUS[400]:{"errors":["Fake Server Invalid Delete"]} [MOCKs]'
    );
  });
  test("invalid id", async () => {
    const resp = await dropById({
      pathURL: "/company",
      displayName: { one: "MOCK", many: "MOCKs" },
      id: "-9999",
    });
    expect(resp.status).toEqual(406);
    expect(convertIdToNumeric(resp.response)).toEqual(
      "Registro Inválido ID [-9999] MOCK"
    );
  });
});
