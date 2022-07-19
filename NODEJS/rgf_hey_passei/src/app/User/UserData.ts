import { IDataSave, IDataValue } from "../../core/interfaces/DataInterface";
import { IDisciplina } from "../Disciplina/DisciplinaData";
import { emptyGroup, IGroup } from "../Group/GroupData";
import {
  create,
  findAll,
  searchById,
  update,
} from "../helper/AirtableCRUDHelper";

export interface IUsers {
  id: string;
  primeiroNome: string;
  sobrenome: string;
  login: string;
  whatsApp: string;
  password: string;
  passwordConfirm?: string;
  active: boolean;
  group: IGroup[];
}

export const emptyUsers: IUsers = {
  id: "",
  primeiroNome: "",
  sobrenome: "",
  login: "",
  whatsApp: "55",
  password: "",
  passwordConfirm: "",
  active: true,
  group: [emptyGroup],
};

const pathURL = "/users";

export const displayName = { many: "Usuários", one: "Usuário" };

export const joinNome = (primeiroNome: string, segundoNome: string): string => {
  return `${primeiroNome} ${segundoNome}`;
};

export const whatsAppFormat = (whatsApp: string): string => {
  return "+" + whatsApp.replace(/[^\w\s]/gi, "");
};

export const createUser = async (
  values: IUsers
): Promise<IDataSave<IUsers>> => {
  delete values.passwordConfirm;
  values.whatsApp = whatsAppFormat(values.whatsApp);
  // console.log(values);

  return await create<IUsers>({
    pathURL: pathURL,
    displayName: displayName,
    textShow: joinNome(values.primeiroNome, values.sobrenome),
    value: values,
  });
};

export const updateUser = async (
  values: IUsers
): Promise<IDataSave<IUsers>> => {
  delete values.passwordConfirm;
  values.whatsApp = whatsAppFormat(values.whatsApp);
  console.log(values);
  return await update<IUsers>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: values,
    textShow: joinNome(values.primeiroNome, values.sobrenome),
  });
};

/**
 * Recupera valores de login do usuário.
 */
export const existsUser = async (
  login: string
): Promise<IDataValue<{ active: boolean }[]>> => {
  const pathURI = encodeURI(
    `?fields[]=active&maxRecords=1&filterByFormula=({login} = '${login}')`
  );
  const data = await findAll<{ active: boolean }[] | any>({
    pathURL,
    pathURI,
    displayName,
  });
  return data;
};

export const findById = async (id: string): Promise<IDataValue<IUsers>> => {
  return await searchById<IUsers>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });
};
