import { IFormSelectValue } from "../components/FormsComponent";
import { listAll } from "../helper/CRUDDataHelper";
import { IDataList } from "../interfaces/DataInterface";

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface IPlace {
  id: number;
  nome: string;
  codPostal: string;
  pais: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  latitude: number;
  longitude: number;
  cercaVirtual: string;
  observacao: string;
  companyId: number;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyPlace: IPlace = {
  id: 0,
  nome: "",
  codPostal: "",
  pais: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
  latitude: 0,
  longitude: 0,
  cercaVirtual: "",
  observacao: "",
  companyId: 0,
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/place";

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Localizações", one: "Localização" };

/**
 * Converte o objeto Grupo para {id e nome} Select.
 */
export const listPlaceSelectByCompany = async (
  companyId: number
): Promise<IDataList<IFormSelectValue>> => {
  return await listAll<IFormSelectValue>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: "/listPlaceSelect/" + companyId,
  });
};
