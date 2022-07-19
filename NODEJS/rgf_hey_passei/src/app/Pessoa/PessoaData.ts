/**
 * Ações a serem executadas com servidor para manutenção da entidade.
 * Matem premissas de dados ex: validação, valor vazio, etc...
 */
import { clearAirtableObject } from "../helper/AirtableConvertHelper";

import {
  IDataList,
  IDataSave,
  IDataValue,
  IDataDelete,
} from "../../core/interfaces/DataInterface";

import {
  createUpdate,
  dropById,
  findAll,
  searchById,
} from "../helper/AirtableCRUDHelper";

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface IPessoaAirtable {
  id: number;
  fields: { nome: string; idade: number; endereco: string; password: string };
  createdTime: string;
}

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface IPessoa {
  id: number;
  nome: string;
  idade: number;
  endereco: string;
  password: string;
  createdTime: string;
  arquivo: string;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyPessoa: IPessoa = {
  id: 0,
  nome: "",
  idade: 0,
  endereco: "",
  password: "",
  createdTime: "",
  arquivo: "",
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/pessoas";

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Pessoas", one: "Pessoa" };

export const getList = async (): Promise<IDataList<IPessoa>> => {
  return await findAll<IPessoa>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: "?maxRecords=300&view=grid",
  });
};

export const saveData = async (value: IPessoa): Promise<IDataSave<IPessoa>> => {
  console.log("POST DATA:", value);
  const id = value.id ? value.id.toString() : "";
  value = clearAirtableObject(value, emptyPessoa);
  console.log("CLEAR:", value);

  let saveData = await createUpdate<IPessoa>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: "/" + id,
    valueId: id,
    value: value,
    textShow: value.nome,
  });

  if (id === "") {
    saveData.response = saveData.response.replace("Atualizado", "Criado");
  }
  console.log(saveData);

  return saveData;
};

export const findById = async (id: string): Promise<IDataValue<IPessoa>> => {
  return await searchById<IPessoa>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: "",
    id: id,
  });
};

export const deleteData = async (id: string): Promise<IDataDelete> => {
  return await dropById({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};
