import { IActiveUserSlice } from "./ReduxInterface";

export interface ISessionSlice {
  userId: string;
  activeUser: IActiveUserSlice;
  group: ISessionGroup;
}

export interface ISessionGroup {
  id: string;
  name: string;
  access: ISessionAccess[];
}

/**
 * label ->  nome que é exibido no menu
 * page -> acesso as páginas: create/update/delete
 * path -> url de acesso incia com '/'
 * sub_item -> utilizado para gerar Dropdown
 */
export interface ISessionAccess {
  path: string | "";
  icon?: string | "";
  label?: string;
  page?: ISessionPage; // create: { path: "/new", label: "Inserir Operador", },,},
  sub_item?: ISessionAccess[];
  active?: boolean;
}

export interface ISessionList {
  update?: ISessionAccess;
  delete?: ISessionAccess;
}

export interface ISessionPage extends ISessionList {
  create?: ISessionAccess;
}
