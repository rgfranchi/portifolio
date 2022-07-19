import { ISessionList } from "./SessionInterface";

export interface IUpdateDeleteListAccess {
  baseUrl: string;
  access: ISessionList;
}

export interface IListLoad<entity> {
  loaded: boolean; // controla se foi ou não carregada a página.
  values: entity[];
}
