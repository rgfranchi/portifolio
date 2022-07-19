/**
 * Carrega informações de usuário.
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

export interface IGroupSelect {
  id: number;
  nome: string;
}

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface IUser {
  id: number;
  nome: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  groupId: number;
  group?: IGroupSelect;
  companyId: number;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyUser: IUser = {
  id: 0,
  nome: "",
  email: "",
  password: "",
  passwordConfirm: "",
  groupId: 0,
  // group: emptyGroup,
  companyId: 0,
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/user";

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Users", one: "User" };

// export const getListByCompany = (
//   companyId: number
// ): Promise<AxiosResponse<IUser[]>> => {
//   return api.get<IUser[]>(`${pathURL}/findByCompany/${companyId}`);
// };

export const getListByCompany = async (
  companyId: string
): Promise<IDataList<IUser>> => {
  return await listAll<IUser>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: `/findByCompany/${companyId}`,
  });
};

/**
 * Busca entidade pelo ID.
 * @param id
 */
// export const findById = (id: number): Promise<AxiosResponse<IUser>> => {
//   return api.get<IUser>(`${pathURL}/findById/${id}`);
// };
export const findById = async (id: string): Promise<IDataValue<IUser>> => {
  return await searchById<IUser>({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};

// /**
//  * Converte o objeto Grupo para {id e nome} Select.
//  */
// export const findAllGroup = async (): Promise<IGroupSelect[]> => {
//   let result: IGroupSelect[] = [];
//   await getList()
//     .then((resp) => {
//       resp.data.forEach((value) => {
//         // @ts-ignore
//         result.push({ id: parseInt(value.id), nome: value.nome });
//       });
//     })
//     .catch((error) => {
//       console.error(error.toString());
//     });
//   return result;
// };

/**
 * Salva entidade.
 * @param id
 */
// export const saveData = (
//   data: IUser
// ): Promise<AxiosResponse<boolean | string>> => {
//   delete data.passwordConfirm;
//   if (data.id !== null && data.id > 0) {
//     if (data.password === "") {
//       delete data.password;
//     }
//     return api.put(pathURL, data);
//   }
//   return api.post(pathURL, data);
// };
export const saveData = async (value: IUser): Promise<IDataSave<IUser>> => {
  return await createUpdate<IUser>({
    displayName: displayName,
    pathURL: pathURL,
    valueId: value.id.toString(),
    value: value,
    textShow: value.nome,
  });
};

/**
 * Exclui entidade
 * @param id
 */
// export const deleteData = (
//   id: number
// ): Promise<AxiosResponse<boolean | string>> => {
//   return api.delete(`${pathURL}/${id}`);
// };
export const deleteData = async (id: string): Promise<IDataDelete> => {
  return await dropById({
    displayName: displayName,
    pathURL: pathURL,
    id: id,
  });
};
