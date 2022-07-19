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
 * Utiliza 'resp.status' para identificar a requisição<br>
 * Resposta inserida na property "response"<br>
 * property "data" excluída<br>
 * @param resp -> Resposta recebida pelo servidor com property "data"
 * @param name -> nome da listagem recebida.
 * @returns Objeto valores da property "data" ou "String" se resposta vazia ou não reconhecida.
 */
const httpRequest = <T>(resp: any, name: string): T => {
  let ret: any = { response: "", status: resp.status | 0 };
  // console.log(resp.data);
  switch (ret.status) {
    case 200:
      ret.response = resp.data;
      // console.log(ret.response);
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

export const httpRequestList = <T>(resp: any, name: string): IDataList<T> => {
  return httpRequest<IDataList<T>>(resp, name);
};

export const httpRequestValue = <T>(resp: any, name: string): IDataValue<T> => {
  return httpRequest<IDataValue<T>>(resp, name);
};

export const httpRequestSave = <T>(resp: any, name: string): IDataSave<T> => {
  let ret = httpRequest<IDataSave<T>>(resp, name);
  if (ret.status === 200 || ret.status === 201) {
    ret.data = resp.data;
    ret.status === 201 && (ret.response = `Criado com sucesso [${name}]`);
    ret.status === 200 && (ret.response = `Atualizado com sucesso [${name}]`);
  }
  return ret;
};

export const httpRequestDelete = (resp: any, name: string): IDataDelete => {
  return httpRequest<IDataDelete>(resp, name);
};

/**
 * Realiza leitura do erro.
 * Utiliza 'error.request.status' para identificar o erro.
 * @param name -> Nome de acesso ao erro.
 * @param error -> Objeto de erro recebido
 * @returns Objeto com informação do erro
 */
export const httpErrorRequest = (error: any, name: string): IDataError => {
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
