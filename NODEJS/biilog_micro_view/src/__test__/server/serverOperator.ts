import { Response } from "miragejs";
import { IOperator } from "../../Operator/OperatorData";
import { convertDateYYYYMMDDToDD_MM_YYYY } from "../testHelper/test-convert";

export const operatorRoutes = (actions: any) => {
  let headers = {};
  actions.get(
    "operator/findByCompany/:companyId",
    (schema: any, request: any) => {
      const company_id = request.params.companyId;
      if (company_id.toString() === "9999") {
        return new Response(404, headers, {
          errors: ["Company Id Not Found"],
        });
      }
      const dataBase = schema.db.operators.where({ companyId: company_id });
      if (dataBase.length === 0) {
        return new Response(204, headers, "");
      }
      return new Response(200, headers, dataBase);
    }
  );
  actions.get("operator/findAll", (schema: any) => {
    return schema.db.operators;
  });
  actions.delete("operator/:id", (schema: any, request: any) => {
    const id = request.params.id;
    if (request.params.id === "9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Delete Error 400"],
      });
    }
    schema.operators.find(id).destroy();
    return new Response(202, headers, { errors: ["Fake Server Delete"] });
  });
  actions.get("operator/findById/:id", (schema: any, request: any) => {
    if (request.params.id === "-9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Error 400"],
      });
    }
    if (request.params.id === "-1") {
      return new Response(299, headers, { errors: ["Fake Server Error"] });
    }
    const operator_id = schema.operators.find(request.params.id);
    if (operator_id === null) {
      return new Response(204, headers);
    }
    return new Response(200, headers, operator_id.attrs);
    // return schema.operators.find(request.params.id).attrs;
  });
  actions.post("/operator", async (schema: any, request: any) => {
    let attrs = JSON.parse(request.requestBody);
    delete attrs.id;
    if (attrs.rfid === "RETORNA_ERRO_208") {
      // resposta Valida porem não esperada.
      return new Response(208, headers, "Erro FAKE");
    }
    if (attrs.rfid === "RETORNA_ERRO_400") {
      // resposta Valida porem não esperada.
      return new Response(400, headers, "Erro FAKE 400");
    }
    if (attrs.rfid === "RETORNA_ERRO_4XX") {
      // resposta Valida porem não esperada.
      return new Response(499, headers, "Erro FAKE 4XX");
    }
    if (attrs.companyId <= 0) {
      return new Response(417, headers, "Codigo id da Empresa invalido");
    } else {
      // teste falha no servidor.
      // return new Response(417, headers, schema.operators.create(attrs));
      return new Response(201, headers, schema.operators.create(attrs));
      // return schema.operators.create(attrs);
    }
  });
  actions.put("/operator", (schema: any, request: any) => {
    let attrs = JSON.parse(request.requestBody);
    // return new Response(200, headers, "schema.operators.create(attrs)");
    return new Response(200, headers, schema.operators.create(attrs));
    // return schema.operators.create(attrs);
  });
};

/**
 * Valores MOCk para teste da entidade.
 * @type {import("../../Operator/OperatorData").IOperator[]}
 */
export const listOperatorMock: IOperator[] = [
  {
    id: 1,
    nome: "Thiago de Lima Esmero",
    codOperador: "105",
    email: "email@wine.com",
    sexo: "Masculino",
    funcao: "Operador",
    acessoDataInicial: "2010-01-01",
    acessoDataFinal: "2050-01-01",
    senha: "22765",
    rfid: "4719A&k",
    digital: "VEVTVEU=",
    observacao: "Operador WINE TESTE",
    companyId: 2,
  },
  {
    id: 2,
    nome: "JN Manutenções",
    codOperador: "051",
    email: "manutencao@wine.com",
    sexo: "Masculino",
    funcao: "Manutenção",
    acessoDataInicial: "2010-01-01",
    acessoDataFinal: "2050-01-01",
    senha: "44551",
    rfid: "LFNOFSN",
    digital: "OJDN*DPS",
    observacao: "Operador WINE TESTE",
    companyId: 2,
  },
  {
    id: 3,
    nome: "Josemar Sotero",
    codOperador: "106",
    email: "operador@lincoln.com",
    sexo: "Masculino",
    funcao: "Operador",
    acessoDataInicial: "2020-03-13",
    acessoDataFinal: "2021-03-12",
    senha: "02324",
    rfid: "LFNOFSN",
    digital: "OJDN*LIN",
    observacao: "Operador LINCO TESTE",
    companyId: 3,
  },
  {
    id: 4,
    nome: "Emergência",
    codOperador: "002",
    email: "emergencia@lincoln.com",
    sexo: "Masculino",
    funcao: "Supervisor",
    acessoDataInicial: "2010-11-10",
    acessoDataFinal: "2050-11-10",
    senha: "34577",
    rfid: "LFNOFSN",
    digital: "OJDN*LIN",
    observacao: "Operador LINCO TESTE",
    companyId: 3,
  },
  {
    id: 5,
    nome: "Cesar Benedito De Lima",
    codOperador: "121",
    email: "operador@cnhi.com",
    sexo: "Masculino",
    funcao: "Operador",
    acessoDataInicial: "2021-04-26",
    acessoDataFinal: "2022-04-26",
    senha: "53076",
    rfid: "LFNOFSN",
    digital: "OJDN*CNH",
    observacao: "Operador CNHi TESTE",
    companyId: 4,
  },
  {
    id: 6,
    nome: "Claudinei Xavier Dos Santos",
    codOperador: "126",
    email: "operador@cnhi.com",
    sexo: "Masculino",
    funcao: "Operador",
    acessoDataInicial: "2021-01-13",
    acessoDataFinal: "2022-01-17",
    senha: "55856",
    rfid: "LFNOFSN",
    digital: "OJDN*CNH",
    observacao: "Operador CNHi TESTE",
    companyId: 4,
  },
  {
    id: 7,
    nome: "Operador padrão WINE",
    codOperador: "115",
    email: "email@wine.com",
    sexo: "Masculino",
    funcao: "Operador",
    acessoDataInicial: "2010-01-01",
    acessoDataFinal: "2050-01-01",
    senha: "22768",
    rfid: "4719A&k",
    digital: "VEVTVEU=",
    observacao: "Operador WINE NEW",
    companyId: 2,
  },
];

// objeto deve ter mesma ordem do teste na comparação.
export const operatorMock: IOperator = {
  id: 8,
  nome: "NOME TESTE",
  codOperador: "88888",
  email: "operador@teste.com",
  sexo: "Masculino",
  funcao: "OPERADOR",
  acessoDataFinal: "2021-01-11",
  acessoDataInicial: "2021-01-11",
  senha: "Senha 9999",
  rfid: "RF 8888", // campo eleito para realizar teste de erro
  digital: "aadaksndpa",
  observacao: "Isto é um teste teste",
  companyId: 3, // company utilizada no dispatch session/currentUser
};

let setDelay = 100;

export let loadOperatorValidValues = async (userEvent: any, screen: any) => {
  userEvent.selectOptions(screen.getByLabelText("Sexo"), [operatorMock.sexo]);
  await userEvent.type(screen.getByLabelText("E-mail"), operatorMock.email);
  await userEvent.type(screen.getByLabelText("Nome"), operatorMock.nome);
  await userEvent.type(
    screen.getByLabelText("Código"),
    operatorMock.codOperador
  );
  await userEvent.type(screen.getByLabelText("Senha"), operatorMock.senha);
  await userEvent.type(screen.getByLabelText("Código RFID"), operatorMock.rfid);
  await userEvent.type(screen.getByLabelText("Função"), operatorMock.funcao);
  await userEvent.type(
    screen.getByLabelText("Acesso Inicial"),
    convertDateYYYYMMDDToDD_MM_YYYY(operatorMock.acessoDataInicial)
  );
  await userEvent.type(
    screen.getByLabelText("Acesso Final"),
    convertDateYYYYMMDDToDD_MM_YYYY(operatorMock.acessoDataFinal)
  );
  await userEvent.type(
    screen.getByLabelText("Observações"),
    operatorMock.observacao,
    {
      delay: setDelay,
    }
  );
};

export let loadOperatorInvalidValues = async (userEvent: any, screen: any) => {
  setDelay = 0;
  operatorMock.acessoDataInicial = "2021-01-11";
  operatorMock.acessoDataFinal = "2021-01-05";
  operatorMock.companyId = 0; // company utilizada no dispatch session/currentUser
  operatorMock.email = "operado.com";
  operatorMock.id = 0;
  operatorMock.nome = "NO";
  operatorMock.observacao = "Isto é um teste teste";
  operatorMock.rfid = "RF 8888"; // campo eleito para realizar teste de erro
  operatorMock.senha = "Senha 9999";
  operatorMock.sexo = "";
  operatorMock.funcao = ""; // ENUM
  operatorMock.codOperador = "";
  await loadOperatorValidValues(userEvent, screen);
};

export let loadOperatorsByCompany = (company_id: number): IOperator[] => {
  return listOperatorMock.filter((operator) => {
    return operator.companyId === company_id;
  });
};

export let loadOperatorPanelForm = async (
  fireEvent: any,
  screen: any,
  company_id: number
) => {
  let loadOperator: IOperator[] = loadOperatorsByCompany(company_id);
  if (loadOperator) {
    await fireEvent.click(screen.getByText(loadOperator[0].nome));
  } else {
    console.log("Operadores não cadastrado");
  }
};
