import * as React from "react";

import { act } from "@testing-library/react";

import { createMemoryHistory } from "history";

import { mountProviderRouter } from "../testHelper/test-provider";

import Enzime, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import store from "../../redux/store";
import LoginPage from "../../Login/LoginPage";

Enzime.configure({ adapter: new Adapter() });

let history: any = null;
let wrapper: any = null;

beforeEach(() => {
  history = createMemoryHistory();
});

describe("LoginPage Snapshot", () => {
  test("Login", async () => {
    history.entries[0].key = "LOGIN_KEY_1";
    await setWrapperDefault();
    expect(wrapper.find("Login").exists()).toBeTruthy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

const setWrapperDefault = async () => {
  await act(async () => {
    wrapper = await mountProviderRouter(mount, <LoginPage />, history, store);
  });
};
