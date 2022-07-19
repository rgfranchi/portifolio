import React from "react";

import Enzime, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { mountProviderRouter } from "../testHelper/test-provider";

import TitleComponent from "../../components/TitleComponent";

Enzime.configure({ adapter: new Adapter() });

describe("PageDevelopmentComponent ", () => {
  test("snapshot", async () => {
    const history = createMemoryHistory();
    history.entries[0].key = "KEY01";
    const wrapper = await mountProviderRouter(
      mount,
      <TitleComponent
        title="Titulo Página Teste"
        description="Descrição da página"
        actions={<button>'BOTÃO DE AÇÃO'</button>}
      />,
      history,
      store
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
