import * as React from "react";

import { act, cleanup } from "@testing-library/react";
import Enzime, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { mockServer } from "../server/server";

import { mountProviderRouter } from "../testHelper/test-provider";
import {
  loadHistoryPageContents,
  verifyNotAccess,
  verifyPageContents,
} from "../testHelper/test-page";
import { defaultPageText } from "../testHelper/test-text-defaults";

import OperatorPage from "../../Operator/OperatorPage";
import { fixedGlobalDate } from "../testHelper/test-globalDate";

Enzime.configure({ adapter: new Adapter() });

let history: any = null;
let wrapper: any = null;
let server: any;

const realDate = Date.bind(global.Date);

beforeAll(() => {
  fixedGlobalDate(2021, 0, 11, 0, 0, 0);
});

afterAll(() => {
  global.Date = realDate;
});

beforeEach(() => {
  cleanup();
  server = mockServer();
  server.logging = false;
  history = createMemoryHistory();
});

afterEach(() => {
  server.shutdown();
});

describe("OperatorPage Snapshot", () => {
  test("List", async () => {
    const values = defaultPageText.list;
    loadHistoryPageContents(values, history);
    await setWrapperDefault(values);
    verifyPageContents(values, wrapper);
  });

  test("Create", async () => {
    const values = defaultPageText.create;
    loadHistoryPageContents(values, history);
    await setWrapperDefault(values);
    verifyPageContents(values, wrapper);
  });

  test("Update", async () => {
    const values = defaultPageText.update;
    loadHistoryPageContents(values, history);
    await setWrapperDefault(values);
    verifyPageContents(values, wrapper);
  });
});

describe("OperatorPage Not Access", () => {
  test("List", async () => {
    let values = defaultPageText.list;
    // @ts-ignore remove acesso ao botão criar.
    delete values.access.create;
    loadHistoryPageContents(values, history);
    await setWrapperDefault(values);
    // mantém somente botão create posição 1 para invalidar
    delete values.find[0];
    delete values.find[2];
    verifyNotAccess(values, wrapper);
  });
  test("Create", async () => {
    let values = defaultPageText.create;
    // @ts-ignore
    delete values.access.create;
    loadHistoryPageContents(values, history);
    await setWrapperDefault(values);
    verifyNotAccess(values, wrapper);
  });
  test("Update", async () => {
    let values = defaultPageText.update;
    // @ts-ignore
    delete values.access.update;
    loadHistoryPageContents(values, history);
    await setWrapperDefault(values);
    verifyNotAccess(values, wrapper);
  });
});

const setWrapperDefault = async (access: any) => {
  await act(async () => {
    wrapper = await mountProviderRouter(
      mount,
      <OperatorPage access={access.access} />,
      history,
      store
    );
  });
};
