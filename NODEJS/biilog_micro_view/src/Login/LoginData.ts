/**
 * Carrega informações de usuário.
 */
import { api } from "../config/api";
import { IDataValue } from "../interfaces/DataInterface";
import { errorRequest, verifyRequestValue } from "../helper/HttpRequestHelper";
import { ISessionSlice } from "../interfaces/SessionInterface";

export interface ILogin {
  email: string;
  password: string;
}

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Usuários", one: "Usuário" };

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyLogin: ILogin = {
  email: "",
  password: "",
};

/**
 * Recupera valores de login do usuário.
 */
export const authenticationUser = async (
  email: string,
  password: string
): Promise<IDataValue<ISessionSlice>> => {
  let data: IDataValue<ISessionSlice> = { response: "", status: 0 };
  await api
    .get<ISessionSlice>(`user/authentication/${email}/${password}`)
    .then((resp) => {
      data = verifyRequestValue<ISessionSlice>(resp, displayName.one);
    })
    .catch((error) => {
      data = errorRequest(error, displayName.one);
      if (data.status === 401) {
        data.response = "Usuário ou Senha inválido";
      }
    });
  return data;
};
