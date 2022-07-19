/**
 * Converte data Airtable para objeto JSON padronizado.
 * API: "https://airtable.com/app9AtzxqMPK3jtw0/api"
 * Utiliza core da aplicação para execução.
 */

import { httpRequestValue as verifyRequestValueOrig } from "../../core/helper/HttpRequestHelper";

import { IDataValue } from "../../core/interfaces/DataInterface";
import { IAirtableObject } from "./AirtableCRUDHelper";

export interface IAirtableFormat<T> {
  id: number;
  fields: T;
  createdTime: string;
}

/**
 * AirTable campos "field" e Relacionamento separado campos por "."<br>
 * @param airtable_data Objeto com campos AirTable
 * @returns Objeto linear.
 */
export const convertFromAirtable = <T>(airtable_data: any) => {
  // console.log(JSON.stringify(airtable_data));

  if (typeof airtable_data === "string") {
    return airtable_data;
  }

  //1 - verifica se esta no objeto com fields (fim do processo).
  if (airtable_data.hasOwnProperty("fields")) {
    airtable_data = { ...airtable_data, ...airtable_data.fields };
    delete airtable_data.fields;

    // 1.1 Verifica se tem sub objeto.
    Object.keys(airtable_data).map((data_key: string) => {
      const i = data_key.indexOf(".");
      if (i > 0) {
        airtable_data = convertSubObject(airtable_data, data_key);
      }
    });
    return airtable_data;
  }

  //2 - Retira valor fields de cada resultado
  if (Array.isArray(airtable_data)) {
    airtable_data = airtable_data.map((res: any) => {
      return convertFromAirtable(res);
    });
  } else {
    console.error(airtable_data);
    new Error("It's NOT Airtable Object");
  }

  // console.log(airtable_data);
  // retorna valores do array
  return airtable_data as T;
};

export const convertSubObject = (currentObj: any, obj_key: any): any => {
  let subObj = {};
  const posLastIndex = obj_key.lastIndexOf(".");
  const newObj = obj_key.substring(0, posLastIndex);
  const newKey: string = obj_key.substring(posLastIndex + 1, obj_key.length);
  let value: any = currentObj[obj_key];

  // obriga valor como array
  if (!Array.isArray(value)) {
    value = [value];
  }
  // se não existe chave cria como array
  if (typeof currentObj[newObj] === "undefined") {
    currentObj[newObj] = [];
  }

  // lê valores do array e inclui na chave atual.
  if (Array.isArray(value) && value.length > 0) {
    value.forEach((item: any, i: number) => {
      if (typeof currentObj[newObj][i] === "undefined") {
        let tmpObj: any = new Object();
        tmpObj[newKey] = item;
        currentObj[newObj].push(tmpObj);
        // console.log(currentObj[newObj]);
      } else {
        currentObj[newObj][i][newKey] = item;
      }
      delete currentObj[obj_key];
    });
  }
  return currentObj;
};

// export const dataArrayToObjectArray = (
//   dataArray: any,
//   objKeys: any,
//   tmpArr: any = []
// ) => {
//   dataArray.forEach((item: any, i: number) => {
//     let obj: any = tmpArr[i] ? tmpArr[i] : {};
//     obj[objKeys] = item;
//     tmpArr[i] = obj;
//   });
//   return tmpArr;
// };

/**
 * Converte objeto linear em objeto com valores no format Airtable.<br>
 * Obs: Retira campos id e createdTime<br>
 *
 * @todo: incluir na resposta elementos relacionados. ex pessoa : [{grupo : { access = 'adm' }}] = 'adm' => "pessoa.grupo.access" = ['adm']
 *
 * @param data Data linear.
 * @returns Campos no formato AirTable
 */
export const convertToAirtable = <T>(
  data: any,
  addId = false,
  addCreatedTime = false
): IAirtableObject<T> => {
  let ret: any = {};
  // console.log(data);
  if (data.hasOwnProperty("id")) {
    if (addId) {
      ret.id = data.id;
    }
    delete data.id;
  }
  if (data.hasOwnProperty("createdTime")) {
    if (addCreatedTime) {
      ret.createdTime = data.createdTime;
    }
    delete data.createdTime;
  }

  Object.keys(data).forEach((key: string) => {
    if (Array.isArray(data[key])) {
      let delKey = false;
      data[key].forEach((obj: any) => {
        if (typeof obj === "object" && "id" in obj) {
          if (obj.id != "") {
            Array.isArray(data[key + ".id"])
              ? data[key + ".id"].push(obj.id)
              : (data[key + ".id"] = [obj.id]);
          }
          delKey = true;
        }
      });
      delKey && delete data[key];
    }
  });

  ret.fields = data;
  console.log(ret);
  return ret as IAirtableObject<T>;
};

/**
 * Utiliza um objeto base para retirar campos que são recebidos pelo Airtable mas não respondido.
 * @param loadObject Objeto a ser avaliado.
 * @param baseObject Objeto modelo
 * @returns
 */
export const clearAirtableObject = (loadObject: any, baseObject: any) => {
  // console.log("clearPostObject");
  Object.keys(loadObject).map((keys: string) => {
    if (!baseObject.hasOwnProperty(keys)) {
      delete loadObject[keys];
    }
  });
  return loadObject;
};

export const verifyRequestValue = <T>(
  resp: any,
  name: string,
  textNotFound?: string
): IDataValue<T> => {
  resp.data = convertFromAirtable(resp.data).response;
  if (resp.data.length === 0) {
    resp.status = 401; // acesso não permitido.
    resp.response = textNotFound ? textNotFound : "Valor não encontrado";
    //delete resp.data;
    return resp;
  } else {
    return verifyRequestValueOrig<T>(resp, name);
  }
};
