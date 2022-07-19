import { Response } from "miragejs";
import {
  ISessionAccess,
  ISessionGroup,
} from "../../interfaces/SessionInterface";
const baseURL = "group";

export const groupRoutes = (actions: any) => {
  let headers = {};
  actions.get(`${baseURL}/findAll`, (schema: any) => {
    const dataBase = schema.db.groups;
    if (dataBase.length === 0) {
      return new Response(204, headers, "");
    }
    return new Response(200, headers, dataBase);
  });
  actions.get(`${baseURL}/listGroupSelect`, (schema: any) => {
    const dataBase: any = [];
    schema.db.groups.forEach((value: any) => {
      // @ts-ignore
      dataBase.push({ id: parseInt(value.id), nome: value.nome });
    });
    if (dataBase.length === 0) {
      return new Response(204, headers, "");
    }
    return new Response(200, headers, dataBase);
  });
};

const user: ISessionAccess = {
  label: "Usuário",
  page: {
    // leitura em ...Page.tsx
    create: {
      path: "/new",
      label: "Novo Usuário",
    },
    update: {
      path: "/update",
    },
    delete: {
      path: "/delete",
    },
  },
  path: "/user", // leitura em routes.tsx
};

const company: ISessionAccess = {
  path: "/company", // leitura em routes.tsx
  label: "Empresas",
  page: {
    // leitura em ...Page.tsx
    create: {
      path: "/new",
      label: "Nova Empresa",
    },
    update: {
      path: "/update",
    },
    delete: {
      path: "/delete",
    },
  },
};

const operator: ISessionAccess = {
  path: "/operator",
  label: "Operadores",
  page: {
    // leitura em ...Page.tsx
    create: {
      path: "/new",
      label: "Inserir Operador",
    },
    update: {
      path: "/update",
    },
    delete: {
      path: "/delete",
    },
  },
};

const forklift: ISessionAccess = {
  path: "/forklift",
  label: "Equipamentos",
  page: {
    // leitura em ...Page.tsx
    create: {
      path: "/new",
      label: "Inserir Equipamento",
    },
    update: {
      path: "/update",
    },
    delete: {
      path: "/delete",
    },
  },
};

const register: ISessionAccess = {
  label: "Cadastro",
  sub_item: [
    user,
    {
      path: "/machine",
      label: "Máquina",
      page: {
        create: {
          path: "/new",
          label: "Nova Máquina",
        },
        update: {
          path: "/update",
        },
        delete: {
          path: "/delete",
        },
      },
    },
  ],
};

/**
 * Valores MOCk para teste da entidade.
 */
export const listGroupMock: ISessionGroup[] = [
  {
    id: 1,
    nome: "Root",
    access: [company, operator, register, forklift],
  },
  {
    id: 2,
    nome: "Administrador",
    access: [company, operator],
  },
  {
    id: 3,
    nome: "Usuário Comum",
    access: [operator],
  },
];
