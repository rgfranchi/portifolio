/**
 * Ações a serem executadas com servidores para manutenção da entidade.
 * Matem premissas de dados ex: validação, valor vazio, etc...
 */
import { emptyModule, IModule } from "../Module/ModuleData";

import {
  createUpdate,
  dropById,
  listAll,
  searchById,
} from "../helper/CRUDDataHelper";

import {
  IDataDelete,
  IDataList,
  IDataSave,
  IDataValue,
} from "../interfaces/DataInterface";

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface IForklift {
  id: number;
  codigo: string;
  fabricante: string;
  modelo: string;
  motor: string;
  anoFabricacao: string;
  horimetroInicial: number;
  hodometroInicial: number;
  module: IModule;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyForklift: IForklift = {
  id: 0,
  codigo: "",
  fabricante: "",
  modelo: "",
  motor: "",
  anoFabricacao: "",
  horimetroInicial: 0,
  hodometroInicial: 0,
  module: emptyModule,
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/forklift";

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Equipamentos", one: "Equipamento" };

export const getListByCompany = async (
  companyId: string
): Promise<IDataList<IForklift>> => {
  return await listAll<IForklift>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: `/findByCompany/${companyId}`,
  });
};

export const getList = async (): Promise<IDataList<IForklift>> => {
  return await listAll<IForklift>({
    displayName: displayName,
    pathURL: pathURL,
  });
};

export const findById = async (id: string): Promise<IDataValue<IForklift>> => {
  return await searchById<IForklift>({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};

/**
 * Salva entidade.
 * Status 200 Update (put) / 201 Create (post)
 * @param id
 */
export const saveData = async (
  value: IForklift
): Promise<IDataSave<IForklift>> => {
  return await createUpdate<IForklift>({
    displayName: displayName,
    pathURL: pathURL,
    valueId: value.id.toString(),
    value: value,
    textShow: value.codigo,
  });
};

/**
 * Exclui entidade
 * @param id
 */
export const deleteData = async (id: string): Promise<IDataDelete> => {
  return await dropById({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};
