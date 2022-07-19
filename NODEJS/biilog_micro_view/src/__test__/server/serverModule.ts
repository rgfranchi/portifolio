import { IModule } from "../../Module/ModuleData";
import { loadOperatorPanelForm } from "./serverOperator";
import {
  listTransmissionMock,
  loadTransmissionValidValues,
  transmissionMock,
} from "./serverTransmission";

/**
 * Valores MOCk para teste da entidade.
 * @type {import("../../Forklift/ForkliftData").IForklift[]}
 */
export const listModuleMock: IModule[] = [
  {
    id: 1,
    codigo: "1086",
    modelo: "BII_MSO",
    fabricante: "BIILOG",
    ativo: true,
    observacoes: "WINE Modulo Antigo 238",
    companyId: 2,
    listOperatorId: [1, 2],
    placeId: 2,
    transmission: listTransmissionMock[0],
  },
  {
    id: 2,
    codigo: "1089",
    modelo: "BII_MSO",
    fabricante: "BIILOG",
    ativo: true,
    observacoes: "WINE Modulo Antigo 310",
    companyId: 2,
    listOperatorId: [1, 2],
    placeId: 2,
    transmission: listTransmissionMock[1],
  },
  {
    id: 3,
    codigo: "1165",
    modelo: "BII_MSO",
    fabricante: "BIILOG",
    ativo: true,
    observacoes: "LINCO Modulo Antigo 387",
    companyId: 3,
    listOperatorId: [4, 3],
    placeId: 3,
    transmission: listTransmissionMock[2],
  },
  {
    id: 4,
    codigo: "1167",
    modelo: "BII_MSO",
    fabricante: "BIILOG",
    ativo: true,
    observacoes: "LINCO Modulo Antigo 389",
    companyId: 3,
    listOperatorId: [4],
    placeId: 3,
    transmission: listTransmissionMock[3],
  },
  {
    id: 5,
    codigo: "1132",
    modelo: "BII_MSO",
    fabricante: "BIILOG",
    ativo: true,
    observacoes: "CNHi Modulo Antigo",
    companyId: 4,
    listOperatorId: [6, 5],
    placeId: 4,
    transmission: listTransmissionMock[4],
  },
  {
    id: 6,
    codigo: "1148",
    modelo: "BII_MSO",
    fabricante: "BIILOG",
    ativo: true,
    observacoes: "CNHi Modulo Antigo 368",
    companyId: 4,
    listOperatorId: [5],
    placeId: 4,
    transmission: listTransmissionMock[5],
  },
];

// objeto deve ter mesma ordem do teste na comparação.
export const moduleMock: IModule = {
  id: 7,
  codigo: "99ABCNEW",
  modelo: "ELÉTRICO New",
  fabricante: "BIILOG",
  ativo: true,
  observacoes: "CNHi Modulo MOCK NEW",
  companyId: 2,
  listOperatorId: [3],
  placeId: 3,
  transmission: transmissionMock,
};

// incluído delay pois na localização do erro não funciona se estiver maior que zero
let setDelay = 100;

export let loadModuleValidValues = async (
  userEvent: any,
  fireEvent: any,
  screen: any
) => {
  await userEvent.type(
    screen.getByLabelText("Código Modulo"),
    moduleMock.codigo
  );

  await loadTransmissionValidValues(userEvent, screen);
  await loadOperatorPanelForm(fireEvent, screen, moduleMock.companyId);

  await fireEvent.change(screen.getByLabelText("Localização"), {
    target: { value: moduleMock.placeId },
  });

  await userEvent.type(
    screen.getByPlaceholderText("Modelo Modulo"), //Modulo
    moduleMock.modelo
  );
  await userEvent.type(
    screen.getByPlaceholderText("Fabricante do módulo"), //Modulo
    moduleMock.fabricante
  );
  await userEvent.type(screen.getByLabelText("Ativo"), moduleMock.ativo);
  await userEvent.type(
    screen.getByPlaceholderText("Informações do módulo ..."),
    moduleMock.observacoes,
    {
      delay: setDelay,
    }
  );
};

export let loadModuleInvalidValues = async (
  userEvent: any,
  fireEvent: any,
  screen: any
) => {
  setDelay = 0;
  loadModuleInvalid();
  await loadModuleValidValues(userEvent, fireEvent, screen);
};

export let loadModuleInvalid = () => {
  moduleMock.codigo = "";
};
