import axios from "axios";

/**
 * Acesso a API do air table.
 */
export const api = axios.create({
  baseURL: "https://api.airtable.com/v0/app9AtzxqMPK3jtw0",
  headers: {
    Authorization: "Bearer keypgsbUj8pRiuiDi",
  },
});

/**
 * Consulta de CEP.
 * https://viacep.com.br/
 * https://www.gov.br/conecta/catalogo/apis/cep-codigo-de-enderecamento-postal
 * Outro Serviço: http://cep.la/api
 *
 */
export const apiViaCEP = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

/**
 * Acesso a aplicação RGF Server Google.
 */
export const serverGoogleDrive = axios.create({
  baseURL: "http://localhost:3001/apiV1/fileBase64/",
});
