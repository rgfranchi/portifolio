import { emptyGroup } from "../../Group/GroupData";
import { IUsers } from "../../User/UserData";
import {
  create,
  createUpdate,
  findAll,
  searchById,
  update,
} from "../AirtableCRUDHelper";

/**
 * Configurações em 'config/api'
 */

const pathURL = "/users";
const pathURI = "";
const displayName = { many: "Users TESTE", one: "User TESTE" };
const id = "rec0HzEz7sky3jHcK";
let new_user = {
  id: "",
  primeiroNome: "JEST",
  login: "professor@teste.com",
  password: "cHJvZmVzc29yMTIzNDU2dGVzdGUuY29t",
  active: true,
  sobrenome: "NEW USER TEST",
  whatsApp: "5512345678798",
  group: [{ ...emptyGroup, ...{ id: "recIe3VV9NTrD9uUL" } }],
};

let update_user = {
  id: "reccyBABnoQyHc58Q",
  primeiroNome: "JEST",
  login: "aluno@teste.com",
  password: "YWx1bm95a3Y0b2NlbXh1dGVzdGUuY29t",
  active: true,
  sobrenome: "UPDATE USER TEST",
  whatsApp: "5512345678798",
  group: [{ ...emptyGroup, ...{ id: "recLAiWJhfsFm8Mjl" } }],
};

describe("Operações no banco de dados:", () => {
  console.log("TESTES DEPENDE DE ACESSO AO SERVIÇO: https://airtable.com/");
  // console.log("ARQUIVOS COM FORMATO DA TABELA NA PASTA 'DOCUMENTOS'")
  test("Busca findAll", async () => {
    const resp = await findAll<IUsers>({
      pathURL: pathURL,
      displayName: displayName,
      pathURI: pathURI,
    });
    // console.log(resp);
    expect(resp.response).not.toBeUndefined();
    expect(resp.response.length).toBeGreaterThan(2);
    expect(resp.status).toEqual(200);
  });
  test("Busca searchById", async () => {
    const resp = await searchById<IUsers>({
      pathURL,
      displayName,
      id: "/" + id,
    });
    // console.log(resp.response);
    expect(resp.response).not.toBeUndefined();

    // console.log(resp.response);
    // @ts-ignore
    expect(resp.response.id).toEqual(id); // quantidade de valores.
  });

  test("Novo create: objeto completo (post)", async () => {
    const resp = await create<IUsers>({
      pathURL,
      displayName,
      value: new_user,
      textShow: "TESTE CRIAR USUÁRIO",
    });
    // console.log(resp);
    expect(resp.response).toEqual(
      "Atualizado com sucesso [TESTE CRIAR USUÁRIO]"
    );
    expect(resp.status).toEqual(200);
    expect(resp.data).not.toBeUndefined();
  });

  test("Atualizar update: objeto parcial (patch) ", async () => {
    const date = new Date();
    update_user.primeiroNome =
      date.toUTCString() + " " + update_user.primeiroNome;

    const resp = await update<IUsers>({
      pathURL,
      displayName,
      valueId: update_user.id,
      value: update_user,
      textShow: "TESTE ATUALIZAR USUÁRIO",
    });
    console.log(resp);
    expect(resp.response).toEqual(
      "Atualizado com sucesso [TESTE ATUALIZAR USUÁRIO]"
    );
    expect(resp.status).toEqual(200);
    expect(resp.data).not.toBeUndefined();
  });

  test("Cria ou Atualiza: objeto completo (post ou put) ", async () => {
    const date = new Date();
    new_user.primeiroNome = date.toUTCString() + " " + new_user.primeiroNome;

    // console.log("create USER: Não envia ID");
    const resp_create = await createUpdate<IUsers>({
      pathURL,
      displayName,
      valueId: new_user.id,
      value: new_user,
      textShow: "TESTE createUpdate CRIA USUÁRIO",
    });
    // console.log(resp_create);
    expect(resp_create.response).toEqual(
      "Atualizado com sucesso [TESTE createUpdate CRIA USUÁRIO]"
    );
    expect(resp_create.status).toEqual(200);
    expect(resp_create.data).not.toBeUndefined();

    new_user.sobrenome = date.toUTCString() + " " + new_user.sobrenome;
    const resp_update = await createUpdate<IUsers>({
      pathURL,
      displayName,
      valueId: resp_create.data?.id,
      value: new_user,
      textShow: "TESTE createUpdate ATUALIZA USUÁRIO",
    });
    // console.log(resp_update);
    expect(resp_update.response).toEqual(
      "Atualizado com sucesso [TESTE createUpdate ATUALIZA USUÁRIO]"
    );
    expect(resp_update.status).toEqual(200);
    expect(resp_update.data).not.toBeUndefined();
  });
});
