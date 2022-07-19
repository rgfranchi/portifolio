/**
 * Ações a serem executadas com servidores para manutenção da entidade.
 * Matem premissas de dados ex: validação, valor vazio, etc...
 */

import {
  IDataDelete,
  IDataList,
  IDataSave,
  IDataValue,
} from "../interfaces/DataInterface";
import {
  createUpdate,
  dropById,
  listAll,
  searchById,
} from "../helper/CRUDDataHelper";
import { ICompanySlice } from "../interfaces/ReduxInterface";

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface ICompany {
  id: number;
  nome: string;
  codPostal: string;
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  nomeContato: string;
  email: string;
  telefone1: string;
  telefone2?: string | null;
  cnpj: string;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyCompany: ICompany = {
  id: 0,
  nome: "",
  codPostal: "",
  pais: "Brasil",
  estado: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
  nomeContato: "",
  email: "",
  telefone1: "",
  telefone2: "",
  cnpj: "",
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/company";

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Empresas", one: "Empresa" };

/**
 * Recupera lista do servidor de informações da entidade .
 * @todo: implementar no servidor JAVA.
 */
export const getDropdown = async (): Promise<IDataList<ICompanySlice>> => {
  return await listAll<ICompanySlice>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: "/findDropdown",
  });
};

/**
 * Recupera lista do servidor de informações da entidade .
 */
export const getList = async (): Promise<IDataList<ICompany>> => {
  return await listAll<ICompany>({
    displayName: displayName,
    pathURL: pathURL,
  });
};

/**
 * Busca entidade pelo ID.
 * @param id
 */
export const findById = async (id: string): Promise<IDataValue<ICompany>> => {
  return await searchById<ICompany>({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};

/**
 * Salva entidade.
 * @param id
 */
export const saveData = async (
  value: ICompany
): Promise<IDataSave<ICompany>> => {
  return await createUpdate<ICompany>({
    displayName: displayName,
    pathURL: pathURL,
    valueId: value.id.toString(),
    value: value,
    textShow: value.nome,
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
