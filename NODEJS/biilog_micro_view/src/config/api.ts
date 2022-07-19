import axios from "axios";
/**
 * Acesso a API Rest do servidor.
 * Configuração para acesso a aplicação micro_manager (SQL)
 */
export const api = axios.create({
  // baseURL:"http://localhost:8080/api/v0", // JAVA LOCAL SERVER
  baseURL: "/api/v0", // MOCK miragejs SERVER -> manter a "/" antes da URL
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
 * Acesso a api do IBG para recuperar de Cidade/Estado/Pais/....
 * https://servicodados.ibge.gov.br/api/docs
 */
// export const apiIBGELocalidades = axios.create({
//     baseURL: "https://servicodados.ibge.gov.br/api/v1/"
// });
