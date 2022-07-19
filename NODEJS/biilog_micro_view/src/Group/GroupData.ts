/**
 * Carrega informações de usuário.
 */
import { listAll } from "../helper/CRUDDataHelper";
import { IDataList } from "../interfaces/DataInterface";

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface IGroup {
  id: number;
  nome: string;
  access: [];
}

export interface IGroupSelect {
  id: number;
  nome: string;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyGroup: IGroup = {
  id: 0,
  nome: "",
  access: [],
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/group";

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Grupos", one: "Grupo" };

/**
 * Recupera lista do servidor de informações da entidade .
 */
export const getList = async (): Promise<IDataList<IGroup>> => {
  return await listAll<IGroup>({
    displayName: displayName,
    pathURL: pathURL,
  });
};

/**
 * Converte o objeto Grupo para {id e nome} Select.
 */
export const listGroupSelect = async (): Promise<IDataList<IGroupSelect>> => {
  return await listAll<IGroupSelect>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: "/listGroupSelect",
  });
};
