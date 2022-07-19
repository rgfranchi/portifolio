import { apiViaCEP } from "../../app/config/api";
import { IDataValue } from "../interfaces/DataInterface";
import { httpErrorRequest, httpRequestValue } from "./HttpRequestHelper";

/**
 * Interface de controle dos objetos da Entidade.
 */
export interface ICep {
  error?: boolean;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

/**
 * Mascara para ser utilizada com o react-text-mask
 * Identifica posições do CEP
 */
export const CEPMask = [
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  "-",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
];

/**
 * Busca endereço pelo valor do CEP utilizando a API (https://viacep.com.br/).
 * @param CEP
 */
export const findCEP = async (cep: string): Promise<IDataValue<ICep>> => {
  let data: IDataValue<ICep> = { response: "", status: 0 };
  if (cep === undefined || cep.length < 9) {
    data = {
      response: `CEP não definido ou inválido`,
      status: 406,
    };
  } else {
    await apiViaCEP
      .get<ICep>(`${cep}/json/`)
      .then((resp) => {
        data = httpRequestValue<ICep>(resp, "ERRO DE RESPOSTA CEP");
      })
      .catch((error) => {
        data = httpErrorRequest(error, "ERRO NO SERVIDOR CEP");
      });
  }
  return data;
};
