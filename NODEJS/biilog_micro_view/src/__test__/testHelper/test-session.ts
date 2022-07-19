import { listGroupMock } from "../server/serverGroup";
import {
  ISessionAccess,
  ISessionSlice,
} from "../../interfaces/SessionInterface";

/**
 * Todo: Utilizar interface :ISessionSlice
 */
export const objMockEmptySession: ISessionSlice = {
  userId: 0,
  company: { id: 0, nome: "" },
  group: { id: 0, nome: "", access: [] },
};

export const objMockSession: ISessionSlice = {
  userId: 3,
  company: { id: 2, nome: "WINE SESSION" },
  group: listGroupMock[0],
};

export const objMockMenuAccess: ISessionAccess[] = [
  {
    path: "/company",
    page: {
      create: {
        label: "Nova Empresa",
        path: "/new",
      },
      delete: {
        path: "/delete",
      },
      update: {
        path: "/update",
      },
    },
  },
  {
    path: "/operator",
    page: {
      create: {
        label: "Inserir Operador",
        path: "/new",
      },
      delete: {
        path: "/delete",
      },
      update: {
        path: "/update",
      },
    },
  },
  {
    path: "/user",
    page: {
      create: {
        label: "Novo Usuário",
        path: "/new",
      },
      delete: {
        path: "/delete",
      },
      update: {
        path: "/update",
      },
    },
  },
  {
    path: "/machine",
    page: {
      create: {
        label: "Nova Máquina",
        path: "/new",
      },
      delete: {
        path: "/delete",
      },
      update: {
        path: "/update",
      },
    },
  },
  {
    path: "/forklift",
    page: {
      create: {
        label: "Inserir Equipamento",
        path: "/new",
      },
      delete: {
        path: "/delete",
      },
      update: {
        path: "/update",
      },
    },
  },
];
