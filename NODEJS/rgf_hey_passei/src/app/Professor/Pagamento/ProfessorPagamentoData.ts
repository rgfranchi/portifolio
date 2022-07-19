import { IDataSave, IDataValue } from "../../../core/interfaces/DataInterface";
import { findAll, searchById, update } from "../../helper/AirtableCRUDHelper";
import { IProfessor } from "../ProfessorData";

/**
 * Informações de envio para o banco de dados.<br>
 * Encaminha informações para o banco de dados.
 */
export interface IProfessorPagamentoSubmit {}

/**
 * Informações para construir página.<br>
 * Recebe do banco de dados.
 */
export interface IProfessorPagamento extends IProfessorPagamentoSubmit {
  id: string;
  tipo: string;
  chave: string;
}

export const emptyProfessorPagamento: IProfessorPagamento = {
  id: "",
  tipo: "",
  chave: "",
};

const pathURL = "/users";

export const displayName = {
  many: "Professores Informações de Pagamento",
  one: "Professor Informações de Pagamento",
};

export const findById = async (
  id: string
): Promise<IDataValue<IProfessorPagamento>> => {
  const data = await searchById<IProfessorPagamento>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });
  let tmpResponse = data.response as IProfessorPagamento;
  if (typeof tmpResponse.tipo === "undefined") {
    tmpResponse.tipo = emptyProfessorPagamento.tipo;
  }
  data.response = tmpResponse;
  return data;
};

/**
 * Encaminha valores apenas para atualização do professor
 * @param values
 * @returns
 */
export const updateProfessorPagamento = async (
  values: IProfessorPagamento
): Promise<IDataSave<IProfessorPagamentoSubmit>> => {
  return await update<IProfessorPagamentoSubmit>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: {},
    textShow: "Informações Acadêmicas atualizadas com sucesso",
  });
};
