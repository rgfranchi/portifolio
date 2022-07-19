import { IDataSave, IDataValue } from "../../../core/interfaces/DataInterface";
import { findAll, searchById, update } from "../../helper/AirtableCRUDHelper";
import { IProfessor } from "../ProfessorData";

/**
 * Informações de envio para o banco de dados.<br>
 * Encaminha informações para o banco de dados.
 */
export interface IProfessorDocumentoSubmit {}

/**
 * Informações para construir página.<br>
 * Recebe do banco de dados.
 */
export interface IProfessorDocumento extends IProfessorDocumentoSubmit {
  id: string;
  fotoDocumento: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

export const emptyProfessorDocumento: IProfessorDocumento = {
  id: "",
  fotoDocumento: "",
  tipoDocumento: "",
  numeroDocumento: "",
};

const pathURL = "/users";

export const displayName = {
  many: "Professores Documento",
  one: "Professor Documento",
};

export const findById = async (
  id: string
): Promise<IDataValue<IProfessorDocumento>> => {
  const data = await searchById<IProfessorDocumento>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });
  return data;
};

/**
 * Encaminha valores apenas para atualização do professor
 * @param values
 * @returns
 */
export const updateProfessorDocumento = async (
  values: IProfessorDocumento
): Promise<IDataSave<IProfessorDocumentoSubmit>> => {
  return await update<IProfessorDocumentoSubmit>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: {},
    textShow: "Informações Documentais atualizadas com sucesso",
  });
};
