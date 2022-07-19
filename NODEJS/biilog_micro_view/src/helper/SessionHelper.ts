import { ISessionAccess, ISessionSlice } from "../interfaces/SessionInterface";

// interface IRouteLink {
//   path: string;
//   page: {};
// }

/**
 * Transforma array de ISessionAccess de muitos néveis para um único nível
 * Leitura em Routes.
 */
class ReadSession {
  private paths: ISessionAccess[] = [];
  constructor(session: ISessionSlice) {
    this.parseAccess(session.group.access);
  }

  parseAccess(arrayAccess: ISessionAccess[]) {
    arrayAccess.forEach((access: ISessionAccess) => {
      //      const key = element[0];
      if (access.sub_item) {
        this.parseAccess(access.sub_item);
        return;
      }
      if (access.path) {
        this.paths.push({ path: access.path, page: access.page });
      }
    });
  }

  public getAccess(): ISessionAccess[] {
    return this.paths;
  }
}

export default ReadSession;
