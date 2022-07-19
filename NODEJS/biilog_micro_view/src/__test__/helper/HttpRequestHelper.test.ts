import { assert } from "console";
import { Http2ServerRequest } from "http2";
import { ICompany } from "../../Company/CompanyData";
import {
  verifyRequestList,
  verifyRequestValue,
  verifyRequestDelete,
  verifyRequestSave,
  errorRequest,
} from "../../helper/HttpRequestHelper";
import { listCompanyMock } from "../server/serverCompany";

const dataMock: ICompany[] = listCompanyMock;

describe("verifyRequestList", () => {
  let data = { status: 0, statusText: "", data: dataMock };
  test("200", () => {
    data.status = 200;
    const res = verifyRequestList<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe(dataMock);
  });
  test("201", () => {
    data.status = 201;
    const res = verifyRequestList<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("SAVED");
  });
  test("202", () => {
    data.status = 202;
    const res = verifyRequestList<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("DELETED");
  });
  test("204", () => {
    data.status = 204;
    const res = verifyRequestList<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("Resposta MOCK_REQUEST:vazia");
  });
  test("default", () => {
    data.status = 9999;
    data.statusText = "MOCK TEXTO ERRO";
    const res = verifyRequestList<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe(
      "Resposta MOCK_REQUEST:INVALIDO Status[9999]:MOCK TEXTO ERRO"
    );
  });
});

describe("verifyRequestValue", () => {
  let data = { status: 0, statusText: "", data: dataMock[0] };
  test("200", () => {
    data.status = 200;
    const res = verifyRequestValue<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe(dataMock[0]);
  });
  test("201", () => {
    data.status = 201;
    const res = verifyRequestValue<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("SAVED");
  });
  test("202", () => {
    data.status = 202;
    const res = verifyRequestValue<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("DELETED");
  });
  test("204", () => {
    data.status = 204;
    const res = verifyRequestValue<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("Resposta MOCK_REQUEST:vazia");
  });
  test("default", () => {
    data.status = 9999;
    data.statusText = "MOCK TEXTO ERRO";
    const res = verifyRequestValue<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe(
      "Resposta MOCK_REQUEST:INVALIDO Status[9999]:MOCK TEXTO ERRO"
    );
  });
});

describe("verifyRequestSave", () => {
  let data = { status: 0, statusText: "", data: dataMock[0] };
  test("200", () => {
    data.status = 200;
    const res = verifyRequestSave<ICompany>(data, "MOCK_REQUEST");
    expect(res.data).toBe(dataMock[0]);
    expect(res.response).toBe("Atualizado com sucesso [MOCK_REQUEST]");
  });
  test("201", () => {
    data.status = 201;
    const res = verifyRequestSave<ICompany>(data, "MOCK_REQUEST");
    expect(res.data).toBe(dataMock[0]);
    expect(res.response).toBe("Criado com sucesso [MOCK_REQUEST]");
  });
  test("202", () => {
    data.status = 202;
    const res = verifyRequestSave<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("DELETED");
  });
  test("204", () => {
    data.status = 204;
    const res = verifyRequestSave<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe("Resposta MOCK_REQUEST:vazia");
  });
  test("default", () => {
    data.status = 9999;
    data.statusText = "MOCK TEXTO ERRO";
    const res = verifyRequestSave<ICompany>(data, "MOCK_REQUEST");
    expect(res.response).toBe(
      "Resposta MOCK_REQUEST:INVALIDO Status[9999]:MOCK TEXTO ERRO"
    );
  });
});

describe("verifyRequestDelete", () => {
  let data = { status: 0, statusText: "", data: dataMock[0] };
  test("200", () => {
    data.status = 200;
    const res = verifyRequestDelete(data, "MOCK_REQUEST");
    expect(res.response).toBe(dataMock[0]);
  });
  test("201", () => {
    data.status = 201;
    const res = verifyRequestDelete(data, "MOCK_REQUEST");
    expect(res.response).toBe("SAVED");
  });
  test("202", () => {
    data.status = 202;
    const res = verifyRequestDelete(data, "MOCK_REQUEST");
    expect(res.response).toBe("DELETED");
  });
  test("204", () => {
    data.status = 204;
    const res = verifyRequestDelete(data, "MOCK_REQUEST");
    expect(res.response).toBe("Resposta MOCK_REQUEST:vazia");
  });
  test("default", () => {
    data.status = 9999;
    data.statusText = "MOCK TEXTO ERRO";
    const res = verifyRequestDelete(data, "MOCK_REQUEST");
    expect(res.response).toBe(
      "Resposta MOCK_REQUEST:INVALIDO Status[9999]:MOCK TEXTO ERRO"
    );
  });
});

/**
 * @todo: Melhorar restas de erro e verificar HTTPInterface.
 */
describe("errorRequest", () => {
  let data = {
    request: { status: 0, responseText: "MOCK ERROR TEXT" },
    response: { data: dataMock[0] },
  };
  test("0", () => {
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.status).toBe(0);
    expect(res.response).toBe(
      "ERROR STATUS[0]:Falha ao acessar servidor [MOCK_REQUEST]"
    );
  });
  test("400 401 403", () => {
    data.request.status = 400;
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.status).toBe(400);
    expect(res.response).toBe(
      "ERROR STATUS[400]:MOCK ERROR TEXT [MOCK_REQUEST]"
    );
  });
  test("417", () => {
    data.request.status = 417;
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.response).toContain("ERROR STATUS[417]:{");
  });
  test("500", () => {
    data.request.status = 500;
    data.request.responseText = JSON.stringify({ message: "mensagem de erro" });
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.response).toContain('ERROR STATUS[500]:{"message"');
  });
  test("default", () => {
    data.request.status = 9999;
    data.request.responseText = "MOCK TEXTO ERRO";
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.response).toBe(
      "ERROR STATUS[9999]:MOCK TEXTO ERRO [MOCK_REQUEST]"
    );
  });
});

describe("errorSave", () => {
  let data = {
    request: { status: 0, responseText: "MOCK ERROR TEXT" },
    response: { data: dataMock[0] },
  };
  test("0", () => {
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.status).toBe(0);
    expect(res.response).toBe(
      "ERROR STATUS[0]:Falha ao acessar servidor [MOCK_REQUEST]"
    );
  });
  test("400 401 403", () => {
    data.request.status = 400;
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.status).toBe(400);
    expect(res.response).toBe(
      "ERROR STATUS[400]:MOCK ERROR TEXT [MOCK_REQUEST]"
    );
  });
  test("417", () => {
    data.request.status = 417;
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.response).toContain("ERROR STATUS[417]:{");
  });
  test("500", () => {
    data.request.status = 500;
    data.request.responseText = JSON.stringify({ message: "mensagem de erro" });
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.response).toContain('ERROR STATUS[500]:{"message":');
  });
  test("default", () => {
    data.request.status = 9999;
    data.request.responseText = "MOCK TEXTO ERRO";
    const res = errorRequest(data, "MOCK_REQUEST");
    expect(res.response).toBe(
      "ERROR STATUS[9999]:MOCK TEXTO ERRO [MOCK_REQUEST]"
    );
  });
});

// test("200", () => {});
// test("201", () => {});
// test("202", () => {});
// test("204", () => {});
// test("default", () => {});

// const data = [
//   {
//     id: 1,
//     valor: "Valor 1",
//   },
//   {
//     id: 2,
//     valor: "Valor 2",
//   },
//   {
//     id: 3,
//     valor: "Valor 3",
//   },
//   {
//     id: 4,
//     valor: "Valor 4",
//   },
//   {
//     id: 5,
//     valor: "Valor 5",
//   },
// ];

// test("LoadList Retorna status 204", () => {
//   const response = {
//     status: 204,
//     data: data,
//   };
//   expect(verifyRequest(response, "MOCK LIST")).toBe("Listagem MOCK LIST:vazia");
// });
// test("LoadList Retorna status 200", () => {
//   const response = {
//     status: 200,
//     data: data,
//   };
//   expect(verifyRequest(response, "MOCK LIST")).toBe(data);
// });
// test("LoadList Retorna status default", () => {
//   const response = {
//     status: 299,
//     data: data,
//     statusText: "MOCK VALOR INVÁLIDO",
//   };
//   expect(verifyRequest(response, "MOCK LIST")).toBe(
//     "Listagem MOCK LIST:INVALIDO Status[299]:MOCK VALOR INVÁLIDO"
//   );
// });

// test("errorRequest Retorna status '0'", () => {
//   const error = {
//     request: {
//       status: 0,
//     },
//   };
//   expect(errorRequest("MOCK ERROR", error)).toBe(
//     "Status[0]:Falha ao acessar servidor (MOCK ERROR)"
//   );
// });
// test("errorRequest Retorna status 400", () => {
//   const error = {
//     request: {
//       status: 400,
//       responseText: "MOCK ERRO 400",
//     },
//   };
//   expect(errorRequest("MOCK ERROR", error)).toBe(
//     "Status[400]:MOCK ERRO 400 (MOCK ERROR)"
//   );
// });
// test("errorRequest Retorna status 417", () => {
//   const errorData = {
//     "VALOR1.INVALIDO": "DESCRIÇÃO VALOR 1",
//     "VALOR2.INVALIDO": "DESCRIÇÃO VALOR 2",
//     "VALOR3.INVALIDO": "DESCRIÇÃO VALOR 3",
//   };
//   const error = {
//     request: {
//       status: 417,
//       responseText: "Expectation Failed",
//     },
//     response: { data: errorData },
//   };
//   expect(errorRequest("MOCK ERROR", error)).toBe(
//     `Status[417]:${JSON.stringify(errorData)} (MOCK ERROR)`
//   );
// });
