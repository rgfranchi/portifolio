import {
  waitForElement,
  waitForElementToBeRemoved,
  wait,
} from "@testing-library/dom";
import { Response } from "miragejs";
import { IForklift } from "../../Forklift/ForkliftData";
import {
  listModuleMock,
  moduleMock,
  loadModuleValidValues,
  loadModuleInvalid,
} from "./serverModule";
const baseURL = "forklift";

export const forkliftRoutes = (actions: any) => {
  let headers = {};
  actions.get(`${baseURL}/findAll`, (schema: any) => {
    const dataBase = schema.db.forklifts;
    if (dataBase.length === 0) {
      return new Response(204, headers, "");
    }
    return new Response(200, headers, dataBase);
  });
  actions.get(
    `${baseURL}/findByCompany/:companyId`,
    (schema: any, request: any) => {
      const company_id = request.params.companyId;
      if (company_id.toString() === "9999") {
        return new Response(404, headers, {
          errors: ["Company Id Not Found"],
        });
      }
      const dataBase = schema.db.forklifts.where(
        (forklift: IForklift) =>
          forklift.module.companyId.toString() === company_id.toString()
      );
      if (dataBase.length === 0) {
        return new Response(204, headers, "");
      }
      return new Response(200, headers, dataBase);
    }
  );

  actions.get(`${baseURL}/findById/:id`, (schema: any, request: any) => {
    if (request.params.id === "-9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Error 400"],
      });
    }
    if (request.params.id === "-1") {
      return new Response(299, headers, { errors: ["Fake Server Error"] });
    }
    const data = schema.forklifts.find(request.params.id);
    if (data === null) {
      return new Response(204, headers);
    }
    return new Response(200, headers, data.attrs);
  });

  actions.post(`/${baseURL}`, (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    delete attrs.id;
    if (attrs.modelo === "RETORNA_ERRO_208") {
      return new Response(208, headers, "Erro FAKE");
    }
    if (attrs.modelo === "RETORNA_ERRO_400") {
      return new Response(400, headers, "Erro FAKE 400");
    }
    if (attrs.modelo === "RETORNA_ERRO_4XX") {
      return new Response(499, headers, "Erro FAKE 4XX");
    }
    return new Response(201, headers, schema.forklifts.create(attrs));
    // return schema.companies.create(attrs);
  });

  actions.put(`/${baseURL}`, (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    if (attrs.modelo === "RETORNA_ERRO_400") {
      // resposta Valida porem não esperada.
      return new Response(400, headers, "Erro FAKE 400");
    }
    return new Response(200, headers, schema.forklifts.create(attrs));
    // return schema.companies.create(attrs);
  });

  actions.delete(`${baseURL}/:id`, (schema: any, request: any) => {
    const id = request.params.id;
    if (id === "1") {
      return new Response(203, headers, { errors: ["Fake Server Delete"] });
    }
    if (id === "9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Invalid Delete"],
      });
    }
    schema.forklifts.find(id).destroy();
    return new Response(202, headers, { errors: ["Fake Server Delete"] });
  });

  // // Company.
  // actions.get("company/findDropdown", (schema) => {
  //   // retornar ID E NOME.
  //   let dataDropdown = schema.db.companies.map(({ id, nome }) => ({
  //     id,
  //     nome,
  //   }));
  //   return new Response(200, headers, dataDropdown);
  // });
};

/**
 * Valores MOCk para teste da entidade.
 * @type {import("../../Forklift/ForkliftData").IForklift[]}
 */
export const listForkliftMock: IForklift[] = [
  {
    id: 1,
    codigo: "201 EGU_20",
    fabricante: "Still",
    modelo: "Transp Eletr 24",
    motor: "Combustão",
    anoFabricacao: "2099",
    horimetroInicial: 99999,
    hodometroInicial: 99999,
    module: listModuleMock[0],
  },
  {
    id: 2,
    codigo: "103 R20_T.Baixa",
    fabricante: "Linde",
    modelo: "R20",
    motor: "Combustão",
    anoFabricacao: "2099",
    horimetroInicial: 99999,
    hodometroInicial: 99999,
    module: listModuleMock[1],
  },
  {
    id: 3,
    codigo: "67",
    fabricante: "Hyster",
    modelo: "Matrix R1.6 2015",
    motor: "Elétrica 48v",
    anoFabricacao: "2099",
    horimetroInicial: 99999,
    hodometroInicial: 99999,
    module: listModuleMock[2],
  },
  {
    id: 4,
    codigo: "599",
    fabricante: "Hyster",
    modelo: "Fortis",
    motor: "Combustão",
    anoFabricacao: "2099",
    horimetroInicial: 99999,
    hodometroInicial: 99999,
    module: listModuleMock[3],
  },
  {
    id: 5,
    codigo: "R-07 TKP3000",
    fabricante: "Kontatec",
    modelo: "TKP3000",
    motor: "Elétrica 24v",
    anoFabricacao: "2099",
    horimetroInicial: 99999,
    hodometroInicial: 99999,
    module: listModuleMock[4],
  },
  {
    id: 6,
    codigo: "ES-18 R30XMA3",
    fabricante: "Hyster",
    modelo: "R30XMA3",
    motor: "Elétrica 36v",
    anoFabricacao: "2099",
    horimetroInicial: 99999,
    hodometroInicial: 99999,
    module: listModuleMock[5],
  },
];

// objeto deve ter mesma ordem do teste na comparação.
export const forkliftMock: IForklift = {
  id: 7,
  codigo: "ES-18 NEW",
  fabricante: "Hyster NEW",
  modelo: "R30XMA3",
  motor: "Elétrica 36v",
  anoFabricacao: "2099",
  horimetroInicial: 77777,
  hodometroInicial: 77777,
  module: moduleMock,
};

// incluído delay pois na localização do erro não funciona se estiver maior que zero
let setDelay: number = 100;

export let loadForkliftValidValues = async (
  userEvent: any,
  fireEvent: any,
  screen: any
) => {
  // Aguarda carregar toda a página com o botão Salvar.
  await wait(() => expect(screen.getByText(/Salvar/i)).toBeInTheDocument());
  await userEvent.type(screen.getByLabelText("Código"), forkliftMock.codigo, {
    delay: 500,
  });
  await userEvent.type(
    screen.getAllByLabelText("Fabricante")[0],
    forkliftMock.fabricante
  );
  await userEvent.type(
    screen.getAllByLabelText("Modelo")[0],
    forkliftMock.modelo
  );
  await userEvent.type(screen.getByLabelText("Motor"), forkliftMock.motor);
  await userEvent.type(
    screen.getByLabelText("Ano de Fabricação"),
    forkliftMock.anoFabricacao
  );

  await loadModuleValidValues(userEvent, fireEvent, screen);

  await userEvent.type(
    screen.getByLabelText("Horímetro inicial"),
    forkliftMock.horimetroInicial.toString()
  );
  await userEvent.type(
    screen.getByLabelText("Hodômetro inicial"),
    forkliftMock.hodometroInicial.toString(),
    {
      delay: setDelay,
    }
  );
};

export let loadForkliftInvalidValues = async (
  userEvent: any,
  fireEvent: any,
  screen: any
) => {
  setDelay = 0;
  forkliftMock.codigo = "";
  loadModuleInvalid();
  await loadForkliftValidValues(userEvent, fireEvent, screen);
};
