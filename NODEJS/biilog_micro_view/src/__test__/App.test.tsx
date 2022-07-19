import React from "react";

import { createMemoryHistory } from "history";
import { act, cleanup } from "@testing-library/react";
import Enzime, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { mountProviderRouter } from "./testHelper/test-provider";

import store from "../redux/store";

// import { render } from "@testing-library/react";

Enzime.configure({ adapter: new Adapter() });

import App from "../App";
import toJson from "enzyme-to-json";

let history: any = null;

beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});

describe("APP", () => {
  test("verify bases", async () => {
    await act(async () => {
      history.entries[0].key = "KEY01";
      const wrapper = await mountProviderRouter(mount, <App />, history, store);
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find("Container").exists()).toBeTruthy();
      expect(wrapper.find("ModalLoading").exists()).toBeTruthy();
      expect(wrapper.find("Routes").exists()).toBeTruthy();
    });
  });
});
