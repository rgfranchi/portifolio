import React from "react";
import { createMemoryHistory } from "history";
import {
  act,
  render,
  fireEvent,
  screen,
  cleanup,
  waitForElement,
} from "@testing-library/react";

import Enzime, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import { NavigationBarComponent } from "../../components/NavigationBarComponent";
import { listGroupMock } from "../server/serverGroup";

import { Provider } from "react-redux";
import store from "../../redux/store";
import ReadSession from "../../helper/SessionHelper";
import { objMockSession } from "../testHelper/test-session";
import {
  createSessionCurrentUser,
  renderProviderRouter,
} from "../testHelper/test-provider";
import { findCompanyDropdownMock } from "../server/serverCompany";
import { mockServer } from "../server/server";
import { ICompanySlice } from "../../interfaces/ReduxInterface";

let wrapper: any = null;
let history: any = null;
// const objectMock = companyMock;
// const objectEmpty = emptyCompany;
const submitMock = jest.fn();
let server: any;

beforeEach(() => {
  jest.setTimeout(20000);
  cleanup();
  server = mockServer();
  server.logging = false;
  store.dispatch({
    type: "company/companiesLoaded",
    payload: findCompanyDropdownMock(),
  });
  history = createMemoryHistory();
  createSessionCurrentUser(store);
});

afterEach(() => {
  server.shutdown();
});

Enzime.configure({ adapter: new Adapter() });

describe("NavigationBarComponent Administrator", () => {
  let listCompanies: ICompanySlice[];
  beforeEach(async () => {
    listCompanies = server.schema.db.companies;
    await setWrapperDefault(objMockSession.company, true);
    // expect(screen.getByText(/Carregando Empresas/i)).toBeInTheDocument();
    await waitForElement(
      () => screen.getAllByText(objMockSession.company.nome).length === 2
    );
  });

  test("snapshot", async () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  test("Menu Elements", async () => {
    const container = wrapper.container;
    // Primeiro item do menu
    expect(
      container.getElementsByClassName("navbar-brand")[0].textContent
    ).toEqual(objMockSession.company.nome);

    // Simula click no menu dropdown
    fireEvent.click(screen.getAllByText(objMockSession.company.nome)[1]);

    // verifica valores dropdown
    listCompanies.forEach((element: ICompanySlice) => {
      expect(screen.getAllByText(element.nome)).toBeTruthy();
    });

    // valores antes de acessar company
    const keyHistoryBefore = history.location.key;
    //@ts-ignore
    expect(store.getState().session.company.nome).toEqual(
      objMockSession.company.nome
    );
    const clickCompanyName = listCompanies[3].nome;
    fireEvent.click(screen.getByText(clickCompanyName));
    // valores após de acessar company
    expect(history.location.key).toEqual(keyHistoryBefore);
    //@ts-ignore
    expect(store.getState().session.company.nome).toEqual(clickCompanyName);

    // expect(wrapper.find("Link").at(0).text()).toEqual(
    //   objMockSession.company.nome
    // );
  });
});

const setWrapperDefault = async (company: ICompanySlice, isAdm: boolean) => {
  await act(async () => {
    wrapper = await renderProviderRouter(
      render,
      <NavigationBarComponent
        // listCompanies={session.getNavbarArray()}
        company={company}
        isAdministrator={isAdm}
      />,
      history,
      store
    );
  });
};

// /**
//  * @Todo Verificar chamada de HOME e LOGOUT ainda não criado
//  */
// test("NavigationBar NavigationBar", () => {
//   const session = new ReadSession(store.getState().session);
//   const history = createMemoryHistory();
//   history.entries[0].key = "KEY01";

//   let pushSpy = jest.spyOn(history, "push"); // or 'replace', 'goBack', etc.
//   //criar teste nav bar.
//   const wrapper = mount(
//     <Router history={history}>
//       <Provider store={store}>
//         <NavigationBarComponent
//           listCompanies={session.getNavbarArray()}
//           company={{ id: "3", nome: "Exemplo Nome 3" }}
//           loadCompanies={true}
//         />
//       </Provider>
//     </Router>
//   );
//   // Valores preenchidos
//   expect(toJson(wrapper)).toMatchSnapshot();
//   // Primeiro item do menu
//   expect(wrapper.find("Link").at(0).text()).toEqual("BIILOG");

//   // Simula click no menu dropdown
//   wrapper.find("a#nav-dropdown-company").at(0).simulate("click");

//   // Empresa selecionada
//   expect(wrapper.find("a#nav-dropdown-company").at(0).text()).toEqual(
//     "Exemplo Nome 3"
//   );
//   // Verifica snapshot com opções do menu
//   expect(toJson(wrapper)).toMatchSnapshot();
//   // Clica em outra empresa realiza primera ação (onClick)
//   wrapper.find("div.dropdown-menu").childAt(1).simulate("click");
//   // Verifica se empresa foi carregada no lugar da primeira.
//   expect(wrapper.find("a#nav-dropdown-company").at(0).text()).toEqual(
//     "Exemplo Nome 5"
//   );
//   // quantidade de link disponivel.
//   expect(wrapper.find("a.nav-link").length).toEqual(5);
//   // verifica link com valor correspondente.
//   const linkTest = wrapper.find("a[href='/company']").at(0);
//   expect(linkTest.text()).toEqual("Empresas");
//   // realiza segunda uma ação. link (https://github.com/enzymejs/enzyme/issues/516#issuecomment-511330390)
//   linkTest.simulate("click", { button: 0 });
//   expect(pushSpy).toHaveBeenCalledTimes(2);
// });
