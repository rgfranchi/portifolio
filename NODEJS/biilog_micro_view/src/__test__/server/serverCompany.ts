import { Response } from "miragejs";
import { ICompany } from "../../Company/CompanyData";
import { ICompanySlice } from "../../interfaces/ReduxInterface";

export const companyRoutes = (actions: any) => {
  let headers = {};
  // Company.
  actions.get("company/findDropdown", (schema: any) => {
    // retornar ID E NOME.
    let dataDropdown = schema.db.companies.map(
      ({ id, nome }: ICompanySlice) => ({
        id,
        nome,
      })
    );
    if (dataDropdown.length === 0) {
      return new Response(204, headers, "");
    }
    return new Response(200, headers, dataDropdown);
  });
  actions.get("company/findAll", (schema: any) => {
    const dataBase = schema.db.companies;
    if (dataBase.length === 0) {
      return new Response(204, headers, "");
    }
    return new Response(200, headers, dataBase);
  });
  actions.get("company_erro/findAll", () => {
    return new Response(500, headers, { errors: ["FAKE Server not respond"] });
  });
  actions.delete("company/:id", (schema: any, request: any) => {
    const id = request.params.id;
    if (id === "1") {
      return new Response(203, headers, { errors: ["Fake Server Delete"] });
    }
    if (id === "9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Invalid Delete"],
      });
    }
    schema.companies.find(id).destroy();
    return new Response(202, headers, { errors: ["Fake Server Delete"] });
  });
  actions.get("company/findById/:id", (schema: any, request: any) => {
    if (request.params.id === "-9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Error 400"],
      });
    }
    if (request.params.id === "-1") {
      return new Response(299, headers, { errors: ["Fake Server Error"] });
    }
    const company_data = schema.companies.find(request.params.id);
    if (company_data === null) {
      return new Response(204, headers);
    }
    return new Response(200, headers, company_data.attrs);
  });
  actions.post("/company", (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    delete attrs.id;
    if (attrs.logradouro === "RETORNA_ERRO_208") {
      // resposta Valida porem não esperada.
      return new Response(208, headers, "Erro FAKE");
    }
    if (attrs.logradouro === "RETORNA_ERRO_400") {
      // resposta Valida porem não esperada.
      return new Response(400, headers, "Erro FAKE 400");
    }
    if (attrs.logradouro === "RETORNA_ERRO_4XX") {
      // resposta Valida porem não esperada.
      return new Response(499, headers, "Erro FAKE 4XX");
    }

    return new Response(201, headers, schema.companies.create(attrs));
    // return schema.companies.create(attrs);
  });
  actions.put("/company", (schema: any, request: any) => {
    let attrs = JSON.parse(request.requestBody);
    if (attrs.logradouro === "RETORNA_ERRO_4XX") {
      // resposta Valida porem não esperada.
      return new Response(499, headers, "Erro FAKE 4XX");
    }
    return new Response(200, headers, schema.companies.create(attrs));
    // return schema.companies.create(attrs);
  });
};

/**
 * Valores MOCk para teste da entidade.
 * @type {import("../../Company/CompanyData").ICompany[]}
 */

export const listCompanyMock: ICompany[] = [
  {
    id: 1,
    nome: "BIILOG",
    codPostal: "04557-030",
    pais: "Brasil",
    estado: "São Paulo",
    cidade: "São Paulo",
    bairro: "Brooklin Paulista",
    logradouro: "Rua Marquês de Cascais",
    numero: "152",
    complemento: "Sala 2",
    nomeContato: "Edmondo Gazzillo",
    email: "edmondo.gazzillo@gmail.com",
    telefone1: "1132051654",
    telefone2: "11996135016",
    cnpj: "39.282.099/0001-05",
  },
  {
    id: 2,
    nome: "WINE",
    codPostal: "29168-090",
    pais: "Brasil",
    estado: "Espirito Santo",
    cidade: "Serra",
    bairro: "Civit II",
    logradouro: "Rua Comendador Alcídes Simão Helou",
    numero: "1478",
    complemento: null,
    nomeContato: "Fábio Ferreira",
    email: "fabioferreira@wine.com.br",
    telefone1: "11968574521",
    telefone2: null,
    cnpj: "03.640.467/0001-94",
  },
  {
    id: 3,
    nome: "LinconLN",
    codPostal: "07170-350",
    pais: "Brasil",
    estado: "São Paulo",
    cidade: "Guarulhos",
    bairro: "Vila Aeroporto",
    logradouro: "Av. Papa João Paulo I",
    numero: "1818",
    complemento: null,
    nomeContato: "Vander Levorato",
    email: "vander_levorato@lincolnelectric.com.br",
    telefone1: "1135284700 ",
    telefone2: null,
    cnpj: "78.803.809/0001-49",
  },
  {
    id: 4,
    nome: "CNHi",
    codPostal: "18087-220",
    pais: "Brasil",
    estado: "São Paulo",
    cidade: "Sorocaba",
    bairro: "Éden",
    logradouro: "Avenida Jerome Case",
    numero: "1801",
    complemento: null,
    nomeContato: "Não Informado",
    email: "servicos.rental@brasif.com.br",
    telefone1: "1533341700",
    telefone2: null,
    cnpj: "80.783.926/0001-30",
  },
];

// export const listCompanyMock: ICompany[] = [
//   {
//     id: 1,
//     nome: "instituto Charles Xavier UPDATE",
//     cnpj: "01.968.344/0001-51",
//     email: "xavier@xmen.hqs",
//     nomeContato: "",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "São Paulo",
//     logradouro: "Rua UPDATE",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A1",
//   },
//   {
//     id: 2,
//     nome: "Empresa Bootstrap A2",
//     cnpj: "07.717.737/0001-79",
//     email: "empresa@bootstrap2.com",
//     nomeContato: "Contato Bootstrap2",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "Piracicaba",
//     logradouro: "Rua .....",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A2",
//   },
//   {
//     id: 4,
//     nome: "Empresa Bootstrap B1",
//     cnpj: "07.717.737/0001-79",
//     email: "empresa@bootstrap.com",
//     nomeContato: "Contato Bootstrap",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "São Joaquim",
//     logradouro: "Rua .....",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A4",
//   },
//   {
//     id: 5,
//     nome: "Empresa Bootstrap B2",
//     cnpj: "07.717.737/0001-79",
//     email: "empresa@bootstrap2.com",
//     nomeContato: "Contato Bootstrap2",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "Leme",
//     logradouro: "Rua .....",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A5",
//   },
//   {
//     id: 6,
//     nome: "Empresa Bootstrap B3",
//     cnpj: "07.717.737/0001-79",
//     email: "empresa@bootstrap3.com",
//     nomeContato: "Contato Bootstrap3",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "São Roque",
//     logradouro: "Rua .....",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A6",
//   },
//   {
//     id: 7,
//     nome: "Empresa Bootstrap C1",
//     cnpj: "07.717.737/0001-79",
//     email: "empresa@bootstrap.com",
//     nomeContato: "Contato Bootstrap",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "Pirassununga",
//     logradouro: "Rua .....",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A7",
//   },
//   {
//     id: 8,
//     nome: "Empresa Bootstrap C2",
//     cnpj: "07.717.737/0001-79",
//     email: "empresa@bootstrap2.com",
//     nomeContato: "Contato Bootstrap2",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "Araras",
//     logradouro: "Rua .....",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A8",
//   },
//   {
//     id: 9,
//     nome: "Empresa Bootstrap C3",
//     cnpj: "07.717.737/0001-79",
//     email: "empresa@bootstrap3.com",
//     nomeContato: "Contato Bootstrap3",
//     codPostal: "05625-984",
//     pais: "Brasil",
//     cidade: "São Pedro",
//     logradouro: "Rua .....",
//     bairro: "Vila Mock",
//     numero: "123",
//     complemento: "Apto A9",
//   },
// ];

// objeto deve ter mesma ordem do teste na comparação.
/**
 * @type {import("../../Company/CompanyData").ICompany}
 */
export const companyMock: ICompany = {
  id: 5,
  nome: "BIILOG MOCK",
  codPostal: "04557-030",
  pais: "Brasil",
  estado: "São Paulo",
  cidade: "São Paulo",
  bairro: "Brooklin Paulista",
  logradouro: "Rua Marquês de Cascais",
  numero: "152",
  complemento: "Sala 2",
  nomeContato: "Edmondo Gazzillo",
  email: "edmondo.gazzillo@gmail.com",
  telefone1: "(11)3205-1654",
  telefone2: "(11)3205-1654",
  cnpj: "39.282.099/0001-05",
};

let setDelay = 100;

export let loadCompanyValidValues = async (userEvent: any, screen: any) => {
  await userEvent.type(screen.getByLabelText("Nome"), companyMock.nome);
  await userEvent.type(
    screen.getByLabelText("Contato"),
    companyMock.nomeContato
  );
  await userEvent.type(screen.getByLabelText("CNPJ"), companyMock.cnpj);
  await userEvent.type(screen.getByLabelText("E-mail"), companyMock.email);
  await userEvent.type(screen.getByLabelText("CEP"), companyMock.codPostal);
  await userEvent.type(screen.getByLabelText("Cidade"), companyMock.cidade);
  await userEvent.type(screen.getByLabelText("Bairro"), companyMock.bairro);
  await userEvent.type(screen.getByLabelText("Número"), companyMock.numero);
  await userEvent.type(
    screen.getByLabelText("Telefone Principal"),
    companyMock.telefone1
  );
  await userEvent.type(
    screen.getByLabelText("Complemento"),
    companyMock.complemento,
    {
      delay: setDelay,
    }
  );
};

export let loadCompanyInvalidValues = async (userEvent: any, screen: any) => {
  setDelay = 0;
  companyMock.nome = "AB";
  companyMock.nomeContato = "CT";
  companyMock.cnpj = "42.724.607/0001-98";
  companyMock.email = "company@xxxxx";
  companyMock.codPostal = "05625-98";
  companyMock.telefone1 = "";
  await loadCompanyValidValues(userEvent, screen);
};

export const findCompanyDropdownMock = () => {
  return listCompanyMock.map(({ id, nome }) => ({
    id,
    nome,
  }));
};
