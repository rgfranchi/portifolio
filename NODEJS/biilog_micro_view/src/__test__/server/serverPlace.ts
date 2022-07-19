import { Response } from "miragejs";
import { IFormSelectValue } from "../../components/FormsComponent";
import { IPlace } from "../../Place/PlaceData";
const baseURL = "place";

export const placeRoutes = (actions: any) => {
  let headers = {};
  // actions.get(`${baseURL}/findAll`, (schema: any) => {
  //   const dataBase = schema.db.groups;
  //   if (dataBase.length === 0) {
  //     return new Response(204, headers, "");
  //   }
  //   return new Response(200, headers, dataBase);
  // });
  actions.get(
    `${baseURL}/listPlaceSelect/:companyId`,
    (schema: any, request: any) => {
      const company_id = request.params.companyId;
      if (company_id.toString() === "9999") {
        return new Response(404, headers, {
          errors: ["Place Id Not Found"],
        });
      }
      const dataBase = schema.db.places.where(
        (places: IPlace) =>
          places.companyId.toString() === company_id.toString()
      );
      let dataSelect: IFormSelectValue[] = [];
      dataBase.forEach((value: any) => {
        // @ts-ignore
        dataSelect.push({ id: parseInt(value.id), value: value.nome });
      });
      if (dataSelect.length === 0) {
        return new Response(204, headers, "");
      }
      return new Response(200, headers, dataSelect);
    }
  );
};

/**
 * Valores MOCk para teste da entidade.
 */
export const listPlaceMock: IPlace[] = [
  {
    id: 1,
    nome: "BIILOG",
    codPostal: "04557-030",
    pais: "Brasil",
    cidade: "São Paulo",
    bairro: "Brooklin Paulista",
    logradouro: "Rua Marquês de Cascais",
    numero: "152",
    complemento: "Sala 2",
    latitude: -23.60362371,
    longitude: -46.68348267,
    cercaVirtual:
      "[{-23.60294043790386, -46.6841210389477},{-23.60415459596241, -46.682597544328736},{-23.60491159570152, -46.68327346095547},{-23.60367778219504, -46.68484523533348}]",
    observacao: "Informações de teste",
    companyId: 1,
  },
  {
    id: 2,
    nome: "WINE",
    codPostal: "29168-090",
    pais: "Brasil",
    cidade: "Serra",
    bairro: "Civit II",
    logradouro: "Rua Comendador Alcídes Simão Helou",
    numero: "1478",
    complemento: null,
    latitude: -20.18118613,
    longitude: -40.23491962,
    cercaVirtual:
      "[{-20.17906131735574, -40.235627718837044},{-20.179428882535753, -40.231615134418085},{-20.181926288755346, -40.23581010903791},{-20.180632274801525, -40.23177070253059}]",
    observacao: "Informações de teste",
    companyId: 2,
  },
  {
    id: 3,
    nome: "LinconLN",
    codPostal: "07170-350",
    pais: "Brasil",
    cidade: "Guarulhos",
    bairro: "Vila Aeroporto",
    logradouro: "Av. Papa João Paulo I",
    numero: "1818",
    complemento: null,
    latitude: -23.4360454,
    longitude: -46.44681009,
    cercaVirtual:
      "[{-23.433722250373634, -46.4492133459274},{-23.437334923017147, -46.44861253114809},{-23.437482577836786, -46.44419225098603},{-23.433978192284833, -46.44422443749206}]",
    observacao: "Informações de teste",
    companyId: 3,
  },
  {
    id: 4,
    nome: "CNHi",
    codPostal: "18087-220",
    pais: "Brasil",
    cidade: "Sorocaba",
    bairro: "Éden",
    logradouro: "Avenida Jerome Case",
    numero: "1801",
    complemento: null,
    latitude: -23.43962332,
    longitude: -47.39056233,
    cercaVirtual:
      "[{-23.43669977065856, -47.39243987717196},{-23.438068038911084, -47.387933766327144},{-23.44110967801963, -47.38826636022283},{-23.440893123504654, -47.39275101339696}]",
    observacao: "Informações de teste",
    companyId: 4,
  },
];

export let loadPlacesByCompany = (company_id: number): IPlace[] => {
  return listPlaceMock.filter((places) => {
    return places.companyId === company_id;
  });
};
