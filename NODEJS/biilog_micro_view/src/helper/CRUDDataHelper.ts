/**
 * Ações a serem executadas com servidores para manutenção da entidade.
 * Matem premissas de dados ex: validação, valor vazio, etc...
 */
import { api } from "../config/api";
import {
  errorRequest,
  verifyRequestDelete,
  verifyRequestList,
  verifyRequestSave,
  verifyRequestValue,
} from "./HttpRequestHelper";

import {
  IDataDelete,
  IDataList,
  IDataSave,
  IDataValue,
} from "../interfaces/DataInterface";

interface CRUDValues {
  pathURL: string;
  displayName: { many: string; one: string };
}

interface IList extends CRUDValues {
  pathURI?: string;
}

interface IFindById extends CRUDValues {
  id: string;
}

interface ICreateUpdate<T> extends CRUDValues {
  valueId?: string;
  value: T;
  textShow: string;
}

interface IDropById extends CRUDValues {
  id: string;
}

/**
 * Recupera lista do servidor de informações da entidade .
 * @param IList
 */
export const listAll = async <T>({
  pathURL,
  displayName,
  pathURI = "/findAll",
}: IList): Promise<IDataList<T>> => {
  let data: IDataList<T> = { response: "", status: 0 };
  await api
    .get<T[]>(`${pathURL}${pathURI}`)
    .then((resp) => {
      data = verifyRequestList<T>(resp, displayName.many);
    })
    .catch((error) => {
      data = errorRequest(error, displayName.many);
    });
  return data;
};

/**
 * Busca entidade pelo ID.
 * @param IFindById
 */
export const searchById = async <T>({
  pathURL,
  displayName,
  id,
}: IFindById): Promise<IDataValue<T>> => {
  let data: IDataValue<T> = { response: "", status: 0 };
  if (id === undefined) {
    data = {
      response: `ID não definido [${displayName.one}]`,
      status: 406,
    };
  } else {
    await api
      .get<T>(`${pathURL}/findById/${id}`)
      .then((resp) => {
        data = verifyRequestValue<T>(resp, displayName.one);
      })
      .catch((error) => {
        data = errorRequest(error, displayName.one);
      });
  }
  return data;
};

/**
 * Salva entidade.
 * Status 200 Update (put) / 201 Create (post)
 * @param ICreateUpdate
 */
export const createUpdate = async <T>({
  pathURL,
  displayName,
  valueId,
  value,
  textShow,
}: ICreateUpdate<T>): Promise<IDataSave<T>> => {
  let data: IDataSave<T> = { response: "", status: 0 };
  if (valueId !== null && 0 < (valueId || 0)) {
    await api
      .put(pathURL, value)
      .then((resp) => {
        data = verifyRequestSave(resp, textShow);
      })
      .catch((error) => {
        data = errorRequest(error, displayName.one);
      });
  } else {
    await api
      .post(pathURL, value)
      .then((resp) => {
        data = verifyRequestSave(resp, textShow);
      })
      .catch((error) => {
        data = errorRequest(error, displayName.one);
      });
  }
  return data;
};

/**
 * Exclui entidade
 * @param IDropById
 */
export const dropById = async ({
  pathURL,
  displayName,
  id,
}: IDropById): Promise<IDataDelete> => {
  let data: IDataDelete = { response: "", status: 0 };
  if (id <= "0") {
    data = {
      response: `Registro Inválido ID [${id}] ${displayName.one}`,
      status: 406,
    };
  } else {
    await api
      .delete(`${pathURL}/${id}`)
      .then((resp) => {
        data = verifyRequestDelete(resp, displayName.one);
      })
      .catch((error) => {
        data = errorRequest(error, displayName.many);
      });
  }
  return data;
};
