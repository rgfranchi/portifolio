import React from "react";

import { act } from "react-dom/test-utils";
import Enzime, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { mountProviderRouter } from "../testHelper/test-provider";

import CompanyList from "../../Company/CompanyList";
import { listCompanyMock } from "../server/serverCompany";

Enzime.configure({ adapter: new Adapter() });

let wrapper: any = null;
let history: any = null;
const listMock = listCompanyMock;

beforeEach(() => {
  history = createMemoryHistory();
});

describe("CompanyList snapshot", () => {
  test("empty", async () => {
    history.entries[0].key = "EMPTY_01";
    await setWrapperDefault([]);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("with data", async () => {
    history.entries[0].key = "DATA_01";
    await setWrapperDefault(listMock);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("CompanyList actions", () => {
  const count = listMock.length;
  const arrPos = 2;

  test("update", async () => {
    await setWrapperDefault(listMock);
    history.entries[0].key = "ACTION_UPDATE";
    const action = wrapper.find("ButtonIconUpdate");
    expect(action.length).toEqual(count);
    action.at(arrPos).simulate("click", { button: 0 });
    expect(history.location.pathname).toBe(
      "/urlFake/update/" + listMock[arrPos].id
    );
  });
  test("delete", async () => {
    const mockFunctionDelete = jest.fn((x) => x);
    await setWrapperDefault(listMock, mockFunctionDelete);
    history.entries[0].key = "ACTION_DEL";
    const action = wrapper.find("ButtonIconDelete");
    expect(action.length).toEqual(count);
    action.at(arrPos).simulate("click", { button: 0 });
    expect(mockFunctionDelete.mock.results[0].value).toBe(listMock[arrPos].id);
  });
});

describe("CompanyList access", () => {
  const count = listMock.length;

  test("update denied", async () => {
    expect(count).not.toEqual(0);
    await setWrapperDefault(listMock, () => {}, { delete: {} });
    history.entries[0].key = "ACTION_UPDATE";
    const action = wrapper.find("ButtonIconUpdate");
    expect(action.length).toEqual(0);
  });
  test("delete denied", async () => {
    expect(count).not.toEqual(0);
    await setWrapperDefault(listMock, () => {}, { update: {} });
    history.entries[0].key = "ACTION_DEL";
    const action = wrapper.find("ButtonIconDelete");
    expect(action.length).toEqual(0);
  });
});

const setWrapperDefault = async (
  list: any,
  handleDelete: any = () => {},
  access: any = { update: {}, delete: {} }
) => {
  await act(async () => {
    wrapper = await mountProviderRouter(
      mount,
      <CompanyList
        baseUrl="/urlFake"
        access={access}
        list={list}
        handleDeleteOpen={handleDelete}
      />,
      history,
      store
    );
  });
};
