/**
 * Converte data Airtable para objeto JSON padronizado.
 * API: "https://airtable.com/app9AtzxqMPK3jtw0/api"
 * Sobrescreve ".../core/helper/CRUDDataHelper.ts" da aplicação.
 */
import {
  dropById as dropByIdOrig,
  searchById as searchByIdOrig,
  create as createOrig,
  update as updateOrig,
  createUpdate as createUpdateOrig,
  IList,
  IFindById,
  ICreate,
  IUpdate,
  ICreateUpdate,
  IDropById,
} from "../../core/helper/CRUDDataHelper";
import {
  httpErrorRequest,
  httpRequestList,
} from "../../core/helper/HttpRequestHelper";

import {
  IDataDelete,
  IDataList,
  IDataSave,
  IDataValue,
} from "../../core/interfaces/DataInterface";
import { api } from "../config/api";
import {
  convertFromAirtable,
  convertToAirtable,
} from "./AirtableConvertHelper";

export interface IAirtableObject<T> {
  id: number;
  fields: T;
  createdTime: string;
}

export interface IAirtableData<T> {
  records: IAirtableObject<T>[];
}

/**
 * Recupera lista do servidor de informações da entidade.
 * T: Interface do objeto de entrada.
 * @param IList
 * @todo:  Reconstruído de "../core/helper/CRUDDataHelper.ts"
 */
export const findAll = async <T>({
  pathURL,
  displayName,
  pathURI = "",
}: IList): Promise<IDataList<T>> => {
  let ret: IDataList<T> = { response: "", status: 0 };
  // console.log(`${pathURL}${pathURI}`);
  await api
    .get<IAirtableData<T>>(`${pathURL}${pathURI}`)
    .then((resp) => {
      ret = httpRequestList<T>(
        {
          data: convertFromAirtable<T[]>(resp.data.records),
          status: resp.status,
        },
        displayName.many
      );
    })
    .catch((error) => {
      ret = httpErrorRequest(error, displayName.many);
    });
  // console.log(ret);
  return ret;
};

/**
 * Busca entidade pelo ID.
 * Sobrescreve "../core/helper/CRUDDataHelper.ts" e converte resultado.
 * @param IFindById
 */
export const searchById = async <T>({
  pathURL,
  displayName,
  id,
}: IFindById): Promise<IDataValue<T>> => {
  let data = await searchByIdOrig<T>({
    pathURL,
    displayName,
    id,
  });

  data.response = convertFromAirtable(data.response);
  // console.log(data);
  return data;
};

/**
 * Sobrescreve CRUD Create
 * @param ICreate
 */
export const create = async <T>({
  pathURL,
  displayName,
  value,
  textShow,
}: ICreate<T>): Promise<IDataSave<T>> => {
  let save_value = convertToAirtable<T>(value);
  const resp = await createOrig<T, IAirtableObject<T>>({
    pathURL,
    displayName,
    value: save_value,
    textShow,
  });
  return resp;
};

/**
 * Sobrescreve CRUD Update
 * @param ICreate
 */

export const update = async <T>({
  pathURL,
  displayName,
  valueId,
  value,
  textShow,
}: IUpdate<T>): Promise<IDataSave<T>> => {
  let update_value = convertToAirtable<T>(value);
  return await updateOrig<T, IAirtableObject<T>>({
    pathURL,
    pathURI: "/" + valueId,
    displayName,
    valueId,
    value: update_value,
    textShow,
  });
};

/**
 * Sobrescreve CRUD createUpdate
 * @param ICreateUpdate
 */
export const createUpdate = async <T>({
  pathURL,
  pathURI = "",
  displayName,
  valueId,
  value,
  textShow,
}: ICreateUpdate<T>): Promise<IDataSave<T>> => {
  if (valueId !== undefined && valueId !== "") {
    pathURI = "/" + valueId;
  }
  let createUpdate_value = convertToAirtable<T>(value);
  return await createUpdateOrig<T, IAirtableObject<T>>({
    pathURL,
    pathURI,
    displayName,
    valueId,
    value: createUpdate_value,
    textShow,
  });
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
  let data = await dropByIdOrig({ pathURL, displayName, id });
  if (data.status == 200) {
    data.status = 202;
  }
  return data;
};
