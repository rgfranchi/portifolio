import { Response } from "miragejs";
import { IUser } from "../../User/UserData";
import { listGroupMock } from "./serverGroup";

export const userRoutes = (actions: any) => {
  let headers = {};
  actions.get("user/findByCompany/:companyId", (schema: any, request: any) => {
    const companyId = request.params.companyId;

    if (companyId.toString() === "9999") {
      return new Response(404, headers, {
        errors: ["Company Id Not Found"],
      });
    }
    const dataBase = schema.db.users.where({ companyId: companyId });

    if (dataBase.length === 0) {
      return new Response(204, headers, "");
    }
    return new Response(200, headers, dataBase);
  });
  actions.get(
    "user/authentication/:email/:password",
    (schema: any, request: any) => {
      const email = request.params.email;
      // recupera password simples.
      const password = request.params.password;
      if (email === "fake@erro.com") {
        return new Response(404, headers, {
          errors: [
            "Servidor não respondeu a solicitação, Entre em contato com o suporte",
          ],
        });
      }
      if (email === "fake@text.com") {
        return new Response(206, headers, {
          errors: ["Servidor respondeu parcialmente a solicitação."],
        });
      }
      if (email === "reposta@text.com") {
        return new Response(200, headers, "Servidor respondeu com texto.");
      }
      const user = schema.db.users.where({
        email: email,
        password: password,
      })[0];
      if (user === undefined) {
        return new Response(401, headers, "Usuário ou Senha inválido");
      }
      const company = schema.db.companies.find(user.companyId);
      const group = schema.db.groups.find(user.groupId);
      const currentUser = {
        userId: parseInt(user.id),
        company: { id: parseInt(company.id), nome: company.nome },
        group: group,
      };
      return new Response(200, headers, currentUser);
    }
  );

  actions.delete("user/:id", (schema: any, request: any) => {
    const id = request.params.id;
    if (id === "1") {
      return new Response(203, headers, { errors: ["Fake Server Delete"] });
    }
    if (id === "9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Delete Error 400"],
      });
    }
    schema.users.find(id).destroy();
    return new Response(202, headers, { errors: ["Fake Server Delete"] });
  });
  actions.get("user/findById/:id", (schema: any, request: any) => {
    if (request.params.id === "-9999") {
      return new Response(400, headers, {
        errors: ["Fake Server Error 400"],
      });
    }
    if (request.params.id === "-1") {
      return new Response(299, headers, { errors: ["Fake Server Error"] });
    }
    const entity = schema.users.find(request.params.id);

    if (entity === null) {
      return new Response(204, headers);
    }
    entity.attrs.password = "";
    return new Response(200, headers, entity.attrs);
    // return schema.operators.find(request.params.id).attrs;
  });

  actions.post("/user", async (schema: any, request: any) => {
    let attrs = JSON.parse(request.requestBody);
    delete attrs.id;
    if (attrs.nome === "RETORNA_ERRO_208") {
      // resposta Valida porem não esperada.
      return new Response(208, headers, "Erro FAKE");
    }
    if (attrs.nome === "RETORNA_ERRO_400") {
      // resposta Valida porem não esperada.
      return new Response(400, headers, "Erro FAKE 400");
    }
    if (attrs.nome === "RETORNA_ERRO_4XX") {
      // resposta Valida porem não esperada.
      return new Response(499, headers, "Erro FAKE 4XX");
    }
    if (attrs.companyId <= 0) {
      return new Response(417, headers, "Codigo id da Empresa invalido");
    } else {
      // attrs.group = schema.db.groups.find(attrs.groupId);
      // delete attrs.group.access;
      return new Response(201, headers, schema.users.create(attrs));
      // return schema.operators.create(attrs);
    }
  });
  actions.put("/user", (schema: any, request: any) => {
    let attrs = JSON.parse(request.requestBody);
    // attrs.group = schema.db.groups.find(attrs.groupId);
    // return new Response(200, headers, "schema.operators.create(attrs)");
    return new Response(200, headers, schema.users.create(attrs));
    // return schema.operators.create(attrs);
  });
};

/**
 * Valores MOCk para teste da entidade.
 * @type {import("../../User/UserData").IUser[]}
 */
export const listUserMock: IUser[] = [
  {
    id: 1,
    nome: "Administrador Geral",
    email: "root@com.br",
    password: "cm9vdA==", // btoa("root"),
    companyId: 1,
    groupId: listGroupMock[0].id,
    group: { id: listGroupMock[0].id, nome: listGroupMock[0].nome },
  },
  {
    id: 2,
    nome: "Usuário 1",
    email: "adm@com.br",
    password: "YWRt", // btoa("adm"),
    companyId: 1,
    groupId: listGroupMock[1].id,
    group: { id: listGroupMock[1].id, nome: listGroupMock[1].nome },
  },
  {
    id: 3,
    nome: "Usuário",
    email: "teste@com.br",
    password: "dGVzdGU=", // btoa("teste"),
    companyId: 2,
    groupId: listGroupMock[2].id,
    group: { id: listGroupMock[2].id, nome: listGroupMock[2].nome },
  },
];

export const userMock: IUser = {
  id: 4,
  nome: "USUÁRIO TESTE", // campo eleito para realizar teste de erro
  email: "testemock@teste.com.br",
  password: btoa("u5erP@ssword"), // btoa("u5erP@ssword"),
  companyId: 2,
  groupId: listGroupMock[2].id,
  group: { id: listGroupMock[2].id, nome: listGroupMock[2].nome },
};

let confirmPassword = "u5erP@ssword";
// incluído delay pois na localização do erro não funciona se estiver maior que zero
let setDelay = 100;

export let loadUserValidValues = async (userEvent: any, screen: any) => {
  await userEvent.selectOptions(screen.getByLabelText("Grupo"), [
    userMock.groupId.toString(),
  ]);
  await userEvent.type(
    screen.getByLabelText("Senha"),
    atob(userMock.password ? userMock.password : "") //"u5erP@ssword"
  );
  await userEvent.type(
    screen.getByLabelText("Confirmar Senha"),
    confirmPassword
  );
  await userEvent.type(screen.getByLabelText("E-mail"), userMock.email);
  await userEvent.type(screen.getByLabelText("Nome"), userMock.nome, {
    delay: setDelay,
  });
};

export let loadUserInvalidValues = async (userEvent: any, screen: any) => {
  setDelay = 0;
  userMock.id = 0;
  userMock.nome = "AZ";
  userMock.companyId = 0;
  userMock.email = "teste.br";
  userMock.groupId = 0;
  userMock.group = undefined;
  confirmPassword = "32132";
  userMock.password = "Abcdefg8321";
  loadUserValidValues(userEvent, screen);
};

export let loadLoginValidValues = async (userEvent: any, screen: any) => {
  await userEvent.type(
    screen.getByPlaceholderText("E-mail cadastrado"),
    userMock.email
  );
  await userEvent.type(
    screen.getByPlaceholderText("Senha"),
    userMock.password,
    {
      delay: setDelay,
    }
  );
};

export let loadLoginInvalidValues = async (userEvent: any, screen: any) => {
  setDelay = 0;
  userMock.email = "teste.br";
  loadLoginValidValues(userEvent, screen);
};
