import { IDataSave } from "../../../core/interfaces/DataInterface";
import { findAll, searchById, update } from "../../helper/AirtableCRUDHelper";
import { IProfessor } from "../ProfessorData";

/**
 * Informações de envio para o banco de dados.<br>
 * Encaminha informações para o banco de dados.
 */
export interface IProfessorAcademicaSubmit {}

/**
 * Informações para construir página.<br>
 * Recebe do banco de dados.
 */
export interface IProfessorAcademica extends IProfessorAcademicaSubmit {
  id: string;
}

export const emptyProfessorAcademica: IProfessorAcademica = {
  id: "",
};

const pathURL = "/users";

export const displayName = {
  many: "Professores Informações Acadêmicas",
  one: "Professor Informações Acadêmicas",
};

export const findById = async (id: string): Promise<IProfessorAcademica> => {
  const data = await searchById<IProfessorAcademica>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });
  return data.response as IProfessorAcademica;
};

/**
 * Encaminha valores apenas para atualização do professor
 * @param values
 * @returns
 */
export const updateProfessorAcademica = async (
  values: IProfessorAcademica
): Promise<IDataSave<IProfessorAcademicaSubmit>> => {
  return await update<IProfessorAcademicaSubmit>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: {},
    textShow: "Informações Acadêmicas atualizadas com sucesso",
  });
};
