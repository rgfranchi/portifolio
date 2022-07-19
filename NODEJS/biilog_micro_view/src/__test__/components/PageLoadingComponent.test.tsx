import React from "react";

import Enzime, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { mountProviderRouter } from "../testHelper/test-provider";

import PageLoadingComponent from "../../components/PageLoadingComponent";

Enzime.configure({ adapter: new Adapter() });

describe("PageLoadingComponent ", () => {
  test("PageLoading", async () => {
    const history = createMemoryHistory();
    history.entries[0].key = "KEY01";
    const wrapper = await mountProviderRouter(
      mount,
      <PageLoadingComponent />,
      history,
      store
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
