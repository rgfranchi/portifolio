/**
 * Sites protocolo HTTP;
 * https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
 * https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_estado_HTTP
 */

import {
  IDataDelete,
  IDataError,
  IDataList,
  IDataSave,
  IDataValue,
} from "../interfaces/DataInterface";

/**
 * Realiza leitura da lista recebida.
 * Utiliza 'resp.status' para idenficar a requisição recebida
 * @param resp -> Resposta recebida pelo servidor
 * @param name -> nome da listagem recebida.
 * @returns Objeto  valores ou String se resposta vazia ou não reconhecida.
 */
const verifyRequest = <T>(resp: any, name: string): any => {
  let ret: any = { response: "", status: resp.status | 0 };
  switch (ret.status) {
    case 200:
      ret.response = resp.data;
      break;
    case 201:
      ret.response = `SAVED`;
      break;
    case 202:
      ret.response = `DELETED`;
      break;
    case 204:
      ret.response = `Resposta ${name}:vazia`;
      break;
    default:
      ret.response = `Resposta ${name}:INVALIDO Status[${resp.status}]:${resp.statusText}`;
  }
  return ret as T;
};
export const verifyRequestList = <T>(resp: any, name: string): IDataList<T> => {
  return verifyRequest<IDataList<T>>(resp, name);
};
export const verifyRequestValue = <T>(
  resp: any,
  name: string
): IDataValue<T> => {
  return verifyRequest<IDataValue<T>>(resp, name);
};
export const verifyRequestSave = <T>(resp: any, name: string): IDataSave<T> => {
  let ret = verifyRequest<IDataSave<T>>(resp, name);
  if (ret.status === 200 || ret.status === 201) {
    ret.data = resp.data;
    ret.status === 201 && (ret.response = `Criado com sucesso [${name}]`);
    ret.status === 200 && (ret.response = `Atualizado com sucesso [${name}]`);
  }
  return ret;
};
export const verifyRequestDelete = (resp: any, name: string): IDataDelete => {
  return verifyRequest<IDataDelete>(resp, name);
};

/**
 * Realiza leitura do erro.
 * Utiliza 'error.request.status' para identificar o erro.
 * @param name -> Nome de acesso ao erro.
 * @param error -> Objeto de erro recebido
 * @returns Objeto com informação do erro
 */
export const errorRequest = (error: any, name: string): IDataError => {
  let ret: any = { response: "", status: error.request.status | 0 };
  let tmpResponse = `ERROR STATUS[${ret.status}]:`;
  switch (ret.status) {
    case 0:
      tmpResponse += "Falha ao acessar servidor";
      break;
    case 400:
    case 401: // acesso não permitido sem usuário se senha.
    case 403: // acesso não autorizado mesmo se possuir usuário e senha.
      tmpResponse += error.request.responseText;
      break;
    case 417:
      tmpResponse += JSON.stringify(error.response.data);
      break;
    case 500:
      tmpResponse += error.request.responseText;
      break;
    default:
      tmpResponse += error.request.responseText;
  }
  ret.response = `${tmpResponse} [${name}]`;
  return ret;
};

// /**
//  * Retirado por não localizar referências no codigo.
//  * @param name
//  * @param error
//  */
// export const errorSave = (name: string, error: any): string => {
//   const statusCode = error.request.status;
//   let ret: string = `Status[${statusCode}]:`;
//   switch (statusCode) {
//     case 0:
//       ret += "Falha ao acessar servidor";
//       break;
//     case 400:
//     case 417:
//       ret += error.request.response;
//       break;
//     default:
//       ret += error;
//   }
//   ret += ` (${name})`;
//   return ret;
// };
