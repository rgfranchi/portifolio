import { IDataSave, IDataValue } from "../../../core/interfaces/DataInterface";
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
  formacao: string;
  instituicao_sigla: string;
  instituicao: string;
  disponibilidade: string[];
  tipo_servico: string[];
  horario_inicial: string;
  horario_final: string;
}

export const emptyProfessorAcademica: IProfessorAcademica = {
  id: "",
  formacao: "",
  instituicao_sigla: "",
  instituicao: "",
  disponibilidade: [],
  tipo_servico: [],
  horario_inicial: "",
  horario_final: "",
};

const pathURL = "/users";

export const displayName = {
  many: "Professores Informações Acadêmicas",
  one: "Professor Informação Acadêmica",
};

export const findById = async (
  id: string
): Promise<IDataValue<IProfessorAcademica>> => {
  const data = await searchById<IProfessorAcademica>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });
  let tmpResponse = data.response as IProfessorAcademica;
  if (typeof tmpResponse.disponibilidade === "undefined") {
    tmpResponse.disponibilidade = [];
  }
  if (typeof tmpResponse.tipo_servico === "undefined") {
    tmpResponse.tipo_servico = [];
  }
  data.response = tmpResponse;
  // else {
  //   tmpResponse.disponibilidade = JSON.parse(tmpResponse.disponibilidade);
  // }

  // console.log(data);
  return data;
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
