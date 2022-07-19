/**
 * Ações a serem executadas com servidores para manutenção da entidade.
 * Matem premissas de dados ex: validação, valor vazio, etc...
 */
import { api } from "../../app/config/api";
import {
  httpErrorRequest,
  httpRequestDelete,
  httpRequestList,
  httpRequestSave,
  httpRequestValue,
} from "./HttpRequestHelper";

import {
  IDataDelete,
  IDataList,
  IDataSave,
  IDataValue,
} from "../interfaces/DataInterface";

interface ICRUDValues {
  pathURL: string;
  pathURI?: string;
  displayName: { many: string; one: string };
}

export interface IList extends ICRUDValues {}

export interface IFindById extends ICRUDValues {
  id: string;
}

export interface ICreate<T> extends ICRUDValues {
  value: T;
  textShow: string;
}

export interface IUpdate<T> extends ICRUDValues {
  valueId: string;
  value: T;
  textShow: string;
}

export interface ICreateUpdate<T> extends ICRUDValues {
  valueId?: string;
  value: T;
  textShow: string;
}

export interface IDropById extends ICRUDValues {
  id: string;
}

/**
 * Recupera lista do servidor de informações da entidade.
 * T: Interface do objeto de entrada.
 * @param IList
 */
export const findAll = async <T>({
  pathURL,
  displayName,
  pathURI = "",
}: IList): Promise<IDataList<T>> => {
  let data: IDataList<T> = { response: "", status: 0 };
  await api
    .get<T[]>(`${pathURL}${pathURI}`)
    .then((resp) => {
      data = httpRequestList<T>(resp, displayName.many);
    })
    .catch((error) => {
      data = httpErrorRequest(error, displayName.many);
    });
  return data;
};

/**
 * Busca entidade pelo ID.
 * T: Interface do objeto de entrada.
 * @param IFindById
 */
export const searchById = async <T>({
  pathURL,
  displayName,
  pathURI = "",
  id,
}: IFindById): Promise<IDataValue<T>> => {
  let data: IDataValue<T> = { response: "", status: 0 };
  if (id === undefined) {
    data = {
      response: `ID não definido [${displayName.one}]`,
      status: 406,
    };
  } else {
    // console.log(`${pathURL}${pathURI}${id}`);
    await api
      .get<T>(`${pathURL}${pathURI}${id}`)
      .then((resp) => {
        // console.log(resp);
        data = httpRequestValue<T>(resp, displayName.one);
      })
      .catch((error) => {
        data = httpErrorRequest(error, displayName.one);
      });
  }
  // console.log(data);
  return data;
};

/**
 * Cria novo registro por post.
 * T: Tipo de Objeto original.
 * R: Tipo de objeto convertido.
 * @param ICreateUpdate
 */
export const create = async <T, R = T>({
  pathURL,
  pathURI = "",
  displayName,
  value,
  textShow,
}: ICreate<R>): Promise<IDataSave<T>> => {
  let data: IDataSave<T> = { response: "", status: 0 };
  console.log("create -> POST:", pathURL);
  await api
    .post(pathURL + pathURI, value)
    .then((resp) => {
      // console.log(resp.data);
      data = httpRequestSave(resp, textShow);
    })
    .catch((error) => {
      data = httpErrorRequest(error, displayName.one);
    });
  // console.log(data);
  return data;
};

/**
 * Atualiza registro por patch.
 * T: Tipo de Objeto original.
 * R: Tipo de objeto convertido.
 * @param ICreateUpdate
 */
export const update = async <T, R = T>({
  pathURL,
  pathURI = "",
  displayName,
  valueId,
  value,
  textShow,
}: IUpdate<R>): Promise<IDataSave<T>> => {
  let data: IDataSave<T> = { response: "", status: 0 };
  if (valueId === "" || valueId == "0") {
    console.error("NOT FIND UPDATE ID");
    Error("NOT FIND UPDATE ID");
    data.response = "ID NOT FOUND";
  } else {
    await api
      .patch(pathURL + pathURI, value)
      .then((resp) => {
        data = httpRequestSave(resp, textShow);
      })
      .catch((error) => {
        data = httpErrorRequest(error, displayName.one);
      });
  }
  return data;
};

/**
 * Salva entidade.
 * Status 200 Update (put) / 201 Create (post)
 * T: Tipo de Objeto original.
 * R: Tipo de objeto convertido.
 * @param ICreateUpdate
 */
export const createUpdate = async <T, R = T>({
  pathURL,
  pathURI = "",
  displayName,
  valueId,
  value,
  textShow,
}: ICreateUpdate<R>): Promise<IDataSave<T>> => {
  let data: IDataSave<T> = { response: "", status: 0 };
  console.log("SAVE ID:", valueId);
  if (
    (typeof valueId === "string" && valueId !== "" && valueId !== "0") ||
    (typeof valueId === "number" && valueId > 0)
  ) {
    console.log("PUT:", pathURL + pathURI);
    await api
      .put(pathURL + pathURI, value)
      .then((resp) => {
        data = httpRequestSave(resp, textShow);
      })
      .catch((error) => {
        data = httpErrorRequest(error, displayName.one);
      });
  } else {
    console.log("function create:", pathURL);
    data = await create<T, R>({
      pathURL,
      pathURI,
      displayName,
      value,
      textShow,
    });
    //   await api
    //     .post(pathURL, value)
    //     .then((resp) => {
    //       data = httpRequestSave(resp, textShow);
    //     })
    //     .catch((error) => {
    //       data = httpErrorRequest(error, displayName.one);
    //     });
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
        data = httpRequestDelete(resp, displayName.one);
      })
      .catch((error) => {
        data = httpErrorRequest(error, displayName.many);
      });
  }
  return data;
};
