import { ISessionAccess, ISessionSlice } from "../interfaces/SessionInterface";

/**
 * Leitura da seção. <br>
 * Realiza a separação por conteúdos em:
 * tobBarMenuList
 * navigationMenuList;
 * isAdministrator
 */
export const ReadSession = (session: ISessionSlice) => {
  let ret: any = {
    tobBarMenuList: null,
    navigationMenuList: [],
    isAdministrator: false,
    userName: "",
  };
  console.log(session);
  const access = [...session.group.access];
  console.log("ReadSession:my_session", access);

  // Verifica e recebe tobBarMenuList "my_account" de group
  let my_account_index = access.findIndex(
    (value) => value.path === "my_account"
  );
  if (my_account_index > -1) {
    ret.tobBarMenuList = access.splice(my_account_index, 1)[0];
  }
  ret.navigationMenuList = access;

  ret.isAdministrator = session.group.name === "administrador";

  ret.userName = session.activeUser.name;

  console.log("ReadSession:ret", ret);

  return ret;

  // private paths: ISessionAccess[] = [];
  // constructor(session: ISessionSlice) {
  //   console.log(session);
  //   this.parseAccess(session.group.access);
  // }
  // parseAccess(arrayAccess: ISessionAccess[]) {
  //   // console.log(arrayAccess);
  //   arrayAccess.forEach((access: ISessionAccess) => {
  //     if (access.sub_item) {
  //       this.parseAccess(access.sub_item);
  //       return;
  //     }
  //     if (access.path) {
  //       this.paths.push({ path: access.path, page: access.page });
  //     }
  //   });
  // }
  // public getAccess(): ISessionAccess[] {
  //   return this.paths;
  // }
};

export default ReadSession;
