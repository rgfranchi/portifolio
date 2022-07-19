/**
 * Carrega informações de usuário.
 */

import { IDataValue } from "../../core/interfaces/DataInterface";

import { findAll } from "../helper/AirtableCRUDHelper";

export interface IDisciplina {
  id: string;
  disciplina?: string;
  engenharia?: string;
}

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Disciplinas", one: "Disciplina" };

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyDisciplina: IDisciplina = {
  id: "",
  disciplina: "",
  engenharia: "",
};

const pathURL = "/disciplinas";

/**
 * Recupera valores de login do usuário.
 */
export const allDisciplinas = async (): Promise<IDataValue<IDisciplina[]>> => {
  const pathURI = encodeURI("?fields[]=disciplina");
  // console.log(pathURI);
  const data = await findAll<IDisciplina>({
    pathURL,
    pathURI,
    displayName,
  });
  return data;
};
