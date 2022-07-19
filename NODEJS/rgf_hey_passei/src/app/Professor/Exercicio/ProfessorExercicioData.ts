import { IDataSave, IDataValue } from "../../../core/interfaces/DataInterface";
import { findAll, searchById, update } from "../../helper/AirtableCRUDHelper";
import { IProfessor } from "../ProfessorData";

/**
 * Informações de envio para o banco de dados.<br>
 * Encaminha informações para o banco de dados.
 */
export interface IProfessorExercicioSubmit {}

/**
 * Informações para construir página.<br>
 * Recebe do banco de dados.
 */
export interface IProfessorExercicio extends IProfessorExercicioSubmit {
  id: string;
  arquivoExercicio: string;
}

export const emptyProfessorExercicio: IProfessorExercicio = {
  id: "",
  arquivoExercicio: "",
};

const pathURL = "/users";

export const displayName = {
  many: "Professores Exercícios",
  one: "Professor Exercício",
};

export const findById = async (
  id: string
): Promise<IDataValue<IProfessorExercicio>> => {
  const data = await searchById<IProfessorExercicio>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });

  if ((data.response as IProfessorExercicio).arquivoExercicio === undefined) {
    (data.response as IProfessorExercicio).arquivoExercicio = "";
  }

  return data;
};

/**
 * Encaminha valores apenas para atualização do professor
 * @param values
 * @returns
 */
export const updateProfessorExercicio = async (
  values: IProfessorExercicio
): Promise<IDataSave<IProfessorExercicioSubmit>> => {
  return await update<IProfessorExercicioSubmit>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: {},
    textShow: "Informações Acadêmicas atualizadas com sucesso",
  });
};
