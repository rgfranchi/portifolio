import { ITransmission } from "../../Transmission/TransmissionData";

export const listTransmissionMock: ITransmission[] = [
  {
    id: 1,
    tipo: "Zigbee",
    fabricante: "Biilog",
    modelo: "GATEWAY",
    chip: null,
    operadora: null,
    numeroLinha: null,
    pin: null,
    puk1: null,
    puk2: null,
    puk3: null,
    imei: null,
    pan: null,
    observacoes: "Transmissão do WINE MODULO 1",
  },
  {
    id: 2,
    tipo: "Zigbee",
    fabricante: "Biilog",
    modelo: "GATEWAY",
    chip: null,
    operadora: null,
    numeroLinha: null,
    pin: null,
    puk1: null,
    puk2: null,
    puk3: null,
    imei: null,
    pan: null,
    observacoes: "Transmissão do WINE MODULO 2",
  },
  {
    id: 3,
    tipo: "Zigbee",
    fabricante: "Biilog",
    modelo: "GATEWAY",
    chip: null,
    operadora: null,
    numeroLinha: null,
    pin: null,
    puk1: null,
    puk2: null,
    puk3: null,
    imei: null,
    pan: null,
    observacoes: "Transmissão do LincoLn MODULO 3",
  },
  {
    id: 4,
    tipo: "Zigbee",
    fabricante: "Biilog",
    modelo: "GATEWAY",
    chip: null,
    operadora: null,
    numeroLinha: null,
    pin: null,
    puk1: null,
    puk2: null,
    puk3: null,
    imei: null,
    pan: null,
    observacoes: "Transmissão do LincoLn MODULO 4",
  },
  {
    id: 5,
    tipo: "Zigbee",
    fabricante: "Biilog",
    modelo: "GATEWAY",
    chip: null,
    operadora: null,
    numeroLinha: null,
    pin: null,
    puk1: null,
    puk2: null,
    puk3: null,
    imei: null,
    pan: null,
    observacoes: "Transmissão do CNHi MODULO 5",
  },
  {
    id: 6,
    tipo: "Zigbee",
    fabricante: "Biilog",
    modelo: "GATEWAY",
    chip: null,
    operadora: null,
    numeroLinha: null,
    pin: null,
    puk1: null,
    puk2: null,
    puk3: null,
    imei: null,
    pan: null,
    observacoes: "Transmissão do CNHi MODULO 6",
  },
];

// objeto deve ter mesma ordem do teste na comparação.
export const transmissionMock: ITransmission = {
  id: 7,
  tipo: "Zigbee",
  fabricante: "NEW Biilog",
  modelo: "GATEWAY NEW",
  chip: "256325422554",
  operadora: "TIM",
  numeroLinha: "(11)40046895",
  pin: "3698",
  puk1: "3677",
  puk2: "3666",
  puk3: "3655",
  imei: "3132165164554635",
  pan: "AJSPT3216549",
  observacoes: "Transmissão do MOCK NEW",
};

// incluído delay pois na localização do erro não funciona se estiver maior que zero
let setDelay = 100;

export let loadTransmissionValidValues = async (
  userEvent: any,
  screen: any
) => {
  await userEvent.type(
    screen.getByLabelText("Tipo Transmissão"),
    transmissionMock.tipo
  );
  await userEvent.type(
    screen.getByPlaceholderText("Fabricante da Transmissão"), //Transmissão
    transmissionMock.fabricante
  );
  await userEvent.type(
    screen.getByPlaceholderText("Modelo Transmissão"), //Transmissão
    transmissionMock.modelo
  );
  await userEvent.type(screen.getByLabelText("Chip"), transmissionMock.chip);
  await userEvent.type(
    screen.getByLabelText("Operadora"),
    transmissionMock.operadora
  );
  await userEvent.type(
    screen.getByLabelText("Número Linha"),
    transmissionMock.numeroLinha
  );
  await userEvent.type(screen.getByLabelText("PIN"), transmissionMock.pin);
  await userEvent.type(screen.getByLabelText("PUK 1"), transmissionMock.puk1);
  await userEvent.type(screen.getByLabelText("PUK 2"), transmissionMock.puk2);
  await userEvent.type(screen.getByLabelText("PUK 3"), transmissionMock.puk3);
  await userEvent.type(screen.getByLabelText("IMEI"), transmissionMock.imei);
  await userEvent.type(screen.getByLabelText("PAN"), transmissionMock.pan);
  await userEvent.type(
    screen.getByPlaceholderText("Informações da transmissão ..."),
    transmissionMock.observacoes,
    {
      delay: setDelay,
    }
  );
};

export let loadTransmissionInvalidValues = async (
  userEvent: any,
  screen: any
) => {
  setDelay = 0;
  loadTransmissionInvalid();
  await loadTransmissionValidValues(userEvent, screen);
};

export let loadTransmissionInvalid = () => {
  transmissionMock.tipo = "";
};
