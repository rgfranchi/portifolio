import { IDataValue } from "../../core/interfaces/DataInterface";
import { findAll, update } from "../helper/AirtableCRUDHelper";

export interface IRecoverPassword {
  id: string;
  login: string;
  password: string;
}

export interface IAirTableRecoverPassword {
  records: {
    id: string;
    fields: {
      login: string;
      active?: boolean;
    };
    createdTime?: string;
  }[];
}

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = {
  many: "Recuperar password",
  one: "Recuperar password",
};

export const emptyRecoverPassword: IRecoverPassword = {
  id: "",
  login: "",
  password: "",
};

/**
 * URL principal de acesso a informação da entidade.
 */
const pathURL = "/users";

export const recoverPassword = async (
  login: string
): Promise<IDataValue<IRecoverPassword>> => {
  let data: IDataValue<IRecoverPassword | any> = {
    response: "",
    status: 0,
  };
  const pathURI = encodeURI(
    `?maxRecords=1&fields[]=active&fields[]=login&filterByFormula=AND({login} = '${login}')`
  );

  data = await findAll<IRecoverPassword>({
    pathURL,
    pathURI,
    displayName,
  });

  // console.log(url);
  // valida email enviado.
  // await api
  //   .get<IAirTableRecoverPassword>(url)
  //   .then((resp) => {
  //     console.log(resp);
  //     data = verifyRequestValue<IRecoverPassword[]>(
  //       resp,
  //       displayName.one,
  //       "Registro não Localizado"
  //     );
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  if (Array.isArray(data.response) && data.response.length === 1) {
    data.response = data.response[0];
    if (data.response.active === undefined || data.response.active === false) {
      data.response = "Usuário Inativo";
      data.status = 403;
    }
  } else {
    data.status = 202;
  }
  console.log("DATA RecoverPassword", data);
  return data;
};

export const updatePassword = async (
  data: IRecoverPassword
): Promise<IDataValue<IRecoverPassword>> => {
  let saveData = await update<IRecoverPassword>({
    displayName: displayName,
    pathURL: pathURL,
    pathURI: "/" + data.id,
    valueId: data.id,
    value: data,
    textShow: data.login,
  });
  return saveData;
};
