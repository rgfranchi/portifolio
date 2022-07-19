import { IDataSave, IDataValue } from "../../../core/interfaces/DataInterface";
import { findAll, searchById, update } from "../../helper/AirtableCRUDHelper";
import { IProfessor } from "../ProfessorData";

/**
 * Informações de envio para o banco de dados.<br>
 * Encaminha informações para o banco de dados.
 */
export interface IProfessorApresentacaoSubmit {}

/**
 * Informações para construir página.<br>
 * Recebe do banco de dados.
 */
export interface IProfessorApresentacao extends IProfessorApresentacaoSubmit {
  id: string;
  arquivoApresentacao: string;
}

export const emptyProfessorApresentacao: IProfessorApresentacao = {
  id: "",
  arquivoApresentacao: "",
};

const pathURL = "/users";

export const displayName = {
  many: "Professores Informações Acadêmicas",
  one: "Professor Informações Acadêmicas",
};

export const findById = async (
  id: string
): Promise<IDataValue<IProfessorApresentacao>> => {
  const data = await searchById<IProfessorApresentacao>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });

  if (
    (data.response as IProfessorApresentacao).arquivoApresentacao === undefined
  ) {
    (data.response as IProfessorApresentacao).arquivoApresentacao = "";
  }

  return data;
};

/**
 * Encaminha valores apenas para atualização do professor
 * @param values
 * @returns
 */
export const updateProfessorApresentacao = async (
  values: IProfessorApresentacao
): Promise<IDataSave<IProfessorApresentacaoSubmit>> => {
  return await update<IProfessorApresentacaoSubmit>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: {},
    textShow: "Informações Acadêmicas atualizadas com sucesso",
  });
};
