import ReadSession from "../../helper/SessionHelper";
import { ISessionSlice } from "../../interfaces/SessionInterface";
import { listGroupMock } from "../server/serverGroup";
import {
  objMockEmptySession,
  objMockMenuAccess,
  objMockSession,
} from "../testHelper/test-session";

describe("SessionHelper empty", () => {
  const session: ISessionSlice = objMockEmptySession;
  test("ReadSession getPaths", () => {
    const getPaths = new ReadSession(session);
    expect(getPaths.getAccess()).toEqual([]);
  });
});

describe("SessionHelper data", () => {
  const session: ISessionSlice = objMockSession;
  test("ReadSession data", () => {
    const getPaths = new ReadSession(session);
    expect(getPaths.getAccess()).toEqual(objMockMenuAccess);
  });
});
