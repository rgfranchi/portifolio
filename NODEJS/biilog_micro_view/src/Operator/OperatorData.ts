/**
 * Ações a serem executadas com servidorer para manutenção da entidade.
 * Matem premissas de dadados ex: validação, valor vazio, etc...
 */
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
export interface IOperator {
  id: number;
  nome: string;
  codOperador: string;
  senha: string;
  rfid: string;
  digital: string;
  sexo: string; // ENUM
  funcao: string;
  acessoDataInicial: string;
  acessoDataFinal: string;
  email: string;
  observacao: string;
  companyId: number;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyOperator: IOperator = {
  id: 0,
  nome: "",
  codOperador: "",
  senha: "",
  rfid: "",
  digital: "",
  sexo: "",
  funcao: "",
  acessoDataInicial: "", // data definidas no form para possibilitar testes.
  acessoDataFinal: "", // data definidas no form para possibilitar testes.
  email: "",
  observacao: "",
  companyId: 0,
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/operator";

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Operadores", one: "Operador" };

export const getListByCompany = async (
  companyId: string
): Promise<IDataList<IOperator>> => {
  return await listAll<IOperator>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: `/findByCompany/${companyId}`,
  });
};

export const getList = async (): Promise<IDataList<IOperator>> => {
  return await listAll<IOperator>({
    displayName: displayName,
    pathURL: pathURL,
  });
};

export const findById = async (id: string): Promise<IDataValue<IOperator>> => {
  return await searchById<IOperator>({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};

export const saveData = async (
  value: IOperator
): Promise<IDataSave<IOperator>> => {
  return await createUpdate<IOperator>({
    displayName: displayName,
    pathURL: pathURL,
    valueId: value.id.toString(),
    value: value,
    textShow: value.nome,
  });
};

export const deleteData = async (id: string): Promise<IDataDelete> => {
  return await dropById({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};
