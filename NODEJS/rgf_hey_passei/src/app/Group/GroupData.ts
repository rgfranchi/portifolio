/**
 * Carrega informações de usuário.
 */
import { api } from "../config/api";
import { IDataValue } from "../../core/interfaces/DataInterface";
import { httpErrorRequest } from "../../core/helper/HttpRequestHelper";
import { ISessionSlice } from "../../core/interfaces/SessionInterface";
import { verifyRequestValue } from "../helper/AirtableConvertHelper";
import { findAll } from "../helper/AirtableCRUDHelper";

export interface IGroup {
  id: string;
  name: string;
  label: string;
  access: string;
}

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Grupos", one: "Grupo" };

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyGroup: IGroup = {
  id: "",
  name: "aluno",
  label: "",
  access: "",
};

const pathURL = "/groups";

/**
 * Recupera valores de login do usuário.
 */
export const findGroupByName = async (
  name: string
): Promise<IDataValue<IGroup[]>> => {
  // console.log(name);

  const pathURI = encodeURI(
    `?fields[]=name&fields[]=label&fields[]=access&maxRecords=1&filterByFormula={name} = '${name}'`
  );

  const data = await findAll<IGroup>({
    pathURL,
    pathURI,
    displayName,
  });
  // console.log(data);

  return data;
};

export const findGroupById = async (
  id: string
): Promise<IDataValue<IGroup>> => {
  const url = encodeURI(`groups/${id}`);
  let data: IDataValue<IGroup> = { response: "", status: 0 };
  console.log(url);
  await api
    .get<ISessionSlice>(url)
    .then((resp) => {
      data = verifyRequestValue<IGroup>(
        resp,
        displayName.one,
        "Grupo Não Localizado"
      );
    })
    .catch((error) => {
      console.log(error);
      data = httpErrorRequest(error, displayName.one);
    });
  return data;
};
