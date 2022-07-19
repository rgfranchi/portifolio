import { ICompanySlice } from "./ReduxInterface";

export interface ISessionSlice {
  userId: number;
  company: ICompanySlice;
  group: ISessionGroup;
}

export interface ISessionGroup {
  id: number;
  nome: string;
  access: ISessionAccess[];
}

/**
 * label ->  nome que é exibido no menu
 * page -> acesso as páginas: create/update/delete
 * path -> url de acesso incia com '/'
 * sub_item -> utilizado para gerar Dropdown
 */
export interface ISessionAccess {
  path?: string;
  label?: string;
  page?: ISessionPage; // create: { path: "/new", label: "Inserir Operador", },,},
  sub_item?: ISessionAccess[];
}

export interface ISessionList {
  update?: ISessionAccess;
  delete?: ISessionAccess;
}

export interface ISessionPage extends ISessionList {
  create?: ISessionAccess;
}
