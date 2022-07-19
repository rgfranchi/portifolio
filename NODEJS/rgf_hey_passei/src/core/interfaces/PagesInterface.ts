import { ISessionPage } from "./SessionInterface";

export interface ICRUDAccess {
  access: ISessionPage;
}

export interface ICreateUpdateAccess {
  access?: ISessionPage;
}
