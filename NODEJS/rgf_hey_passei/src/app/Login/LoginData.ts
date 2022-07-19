/**
 * Carrega informações de usuário.
 */
import { IDataValue } from "../../core/interfaces/DataInterface";
import { ISessionSlice } from "../../core/interfaces/SessionInterface";
import { findAll } from "../helper/AirtableCRUDHelper";
import { IUsers, joinNome } from "../User/UserData";

export interface ILogin {
  login: string;
  password: string;
}

/**
 * Texto das entidades no singular e plural.
 */
export const displayName = { many: "Login", one: "Login" };

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyLogin: ILogin = {
  login: "",
  password: "",
};

const pathURL = "/users";

/**
 * Recupera valores de login do usuário.
 */
export const authenticationUser = async (
  login: string,
  password: string
): Promise<IDataValue<ISessionSlice>> => {
  const pathURI = encodeURI(
    `?fields[]=primeiroNome&fields[]=sobrenome&fields[]=group.id&fields[]=group.access&fields[]=group.name&fields[]=active&maxRecords=1&filterByFormula=AND({login} = '${login}', {password} = '${password}')`
  );
  let data_session: IDataValue<ISessionSlice> = { response: "", status: 0 };
  // recebe valores do usuário login.
  const data = await findAll<IUsers>({
    pathURL,
    pathURI,
    displayName,
  });
  console.log(data);
  if (Array.isArray(data.response)) {
    if (data.response.length === 1) {
      const user_login = data.response[0];
      console.log(user_login);
      if (user_login.active) {
        data_session.response = {
          userId: user_login.id,
          activeUser: {
            id: user_login.id,
            name: joinNome(user_login.primeiroNome, user_login.sobrenome),
          },
          group: {
            id: user_login.group[0].id,
            name: user_login.group[0].name,
            access: JSON.parse(user_login.group[0].access),
          },
        };
        data_session.status = 200;
      } else {
        data_session.response = "Usuário Inativo";
        data_session.status = 401;
      }
    } else {
      data_session.response = "Usuário ou Senha inválido";
      data_session.status = 204;
    }
  }
  console.log("DATA USER", data_session);
  return data_session;
};

// criar buscas por mail / group e realizar parse;
// console.log(password);
// console.log(login);
// if (login === "adm@com.br" && password === "MTIz") {
//   // FAKE data
//   data.status = 200;
//   // data.response = "teste";
//   data.response = {
//     userId: 1,
//     activeUser: { nome: "FAKE COMPANY", id: 1 },
//     group: {
//       id: 1,
//       nome: "FAKE SESSION",
//       access: [
//         {
//           path: "pessoa",
//           label: "Pessoas",
//           page: {
//             create: {
//               label: "Inserir Operador",
//               path: "create",
//             },
//             delete: {
//               path: "delete",
//             },
//             update: {
//               path: "update",
//             },
//           },
//         },
//         {
//           path: "pagina1",
//           label: "Pagina1",
//           page: {},
//         },
//         {
//           path: "pagina2",
//           label: "Pagina2",
//           page: {},
//         },
//         {
//           path: "pagina3",
//           label: "Pagina3",
//           page: {},
//         },
//         {
//           path: "pagina4",
//           label: "Pagina4",
//           page: {},
//         },
//       ],
//     },
//   };
// } else if (login === "teste@teste.com" && password === "MTIz") {
//   // FAKE data
//   data.status = 200;
//   // data.response = "teste";
//   data.response = {
//     userId: 1,
//     activeUser: { nome: "USER TESTE", id: 1 },
//     group: {
//       id: 1,
//       nome: "FAKE SESSION",
//       access: [
//         {
//           path: "/pessoa",
//           label: "Pessoas",
//           page: {},
//         },
//         {
//           path: "/pagina1",
//           label: "Pagina1",
//           page: {},
//         },
//         {
//           path: "/pagina3",
//           label: "Pagina3",
//           page: {},
//         },
//       ],
//     },
//   };
// } else {
//   data.response = "FALHA AO LOGAR";
// data.status = 400;
// }
