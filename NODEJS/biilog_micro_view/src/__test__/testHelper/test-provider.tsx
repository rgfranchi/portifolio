import React from "react";
import { MemoryRouter, Route, Router } from "react-router-dom";

import { objMockSession } from "./test-session";

import { Provider } from "react-redux";

//componentes de tela.
import { ModalLoading } from "../../components/ModalsComponent";

/**
 * Renderiza valores para teste.
 * Utilizando o render do framework @testing-library/react
 * Componente ModalLoading.
 * @param {*} render
 * @param {*} ui
 * @param {*} history
 * @param {*} store
 * @returns
 */
export const renderProviderRouter = (
  render: any,
  ui: any,
  history: any,
  store: any,
  modal: boolean = true
) => {
  // @ts-ignore
  function Wrapper({ children }) {
    return providerRouter(children, history, store, modal);
  }
  // @ts-ignore
  return render(ui, { wrapper: Wrapper });
};

/**
 * Constrói com base no renderProviderRouter incluindo MemoryRouter e Router.
 * @param {*} render
 * @param {*} ui
 * @param {*} history
 * @param {*} store
 * @param {*} initialEntries
 * @param {*} path
 * @returns
 */
export const renderProviderMemoryRouter = (
  render: any,
  ui: any,
  history: any,
  store: any,
  initialEntries: any,
  path: string,
  modal: boolean = true
) => {
  const wrapper = (
    <MemoryRouter initialEntries={[initialEntries]}>
      <Route path={path}>{ui}</Route>
    </MemoryRouter>
  );
  return renderProviderRouter(render, wrapper, history, store, modal);
};

/**
 * Cria as funcionalidades do Provider e Router
 * Utilizando o mount do framework Enzyme
 * @param {*} mount
 * @param {*} children
 * @param {*} history
 * @param {*} store
 * @param {boolean} modal
 * @returns
 */
export const mountProviderRouter = async (
  mount: any,
  children: any,
  history: any,
  store: any,
  modal: boolean = true
) => {
  return await mount(providerRouter(children, history, store, modal));
};

export const createSessionCurrentUser = (store: any) => {
  store.dispatch({
    type: "session/currentUser",
    payload: objMockSession,
  });
};

const providerRouter = (
  children: any,
  history: any,
  store: any,
  modal: boolean
) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        {modal && <ModalLoading />}
        {children}
      </Router>
    </Provider>
  );
};
