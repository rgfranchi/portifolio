import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { cleanup, fireEvent, render } from "@testing-library/react";
import store from "../../redux/store";

import {
  loadingModal,
  confirmModal,
  failModal,
  successModal,
  destroyAllModals,
} from "../../redux/modalSlice";
import {
  ModalConfirm,
  ModalLoading,
  ModalFail,
  ModalSuccess,
} from "../../components/ModalsComponent";

import {
  IConfirmModal,
  IFailModal,
  ILoadingModal,
  ISuccessModal,
} from "../../interfaces/ModalsInterface";
import { renderProviderRouter } from "../testHelper/test-provider";

let history: any = null;
beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
  store.dispatch(destroyAllModals());
});

let objModalConfirm: IConfirmModal = {
  show: true,
  disabledButtons: false,
  textAction: "ButtonAction",
  executed: 100,
  variantAction: "secondary",
  textTitle: "TESTE TITULO",
  textBody: "TESTE BODY",
  errorExecute: "TESTE ERROR",
};

let objModalLoading: ILoadingModal = {
  show: true,
  message: "TESTE LOADING",
};

let objModalFail: IFailModal = {
  show: true,
  redirect: "/fake.redirect.url",
  textFail: "FAKE TEXTO FALHA",
  textButton: "FAKE BOTÃO FALHOU",
};

let objModalSuccess: ISuccessModal = {
  show: true,
  redirect: "/fake.redirect.url.",
  textSuccess: "FAKE TEXTO SUCESSO",
  textButton: "FAKE BOTÃO SUCESSO",
};

describe("ModalsComponent snapshot", () => {
  test("ModalConfirm", () => {
    expect(
      renderModal(<ModalConfirm />, confirmModal(objModalConfirm)).baseElement
    ).toMatchSnapshot();
  });
  test("ModalLoading", () => {
    expect(
      renderModal(<ModalLoading />, loadingModal(objModalLoading)).baseElement
    ).toMatchSnapshot();
  });
  test("ModalFail", () => {
    expect(
      renderModal(<ModalFail />, failModal(objModalFail)).baseElement
    ).toMatchSnapshot();
  });
  test("ModalSuccess", () => {
    expect(
      renderModal(<ModalSuccess />, successModal(objModalSuccess)).baseElement
    ).toMatchSnapshot();
  });
});
describe("ModalsComponent execute", () => {
  test("ModalConfirm", () => {
    // @ts-ignore
    const startState = store.getState().modals.confirm;

    const wrapper = renderModal(
      <ModalConfirm />,
      confirmModal(objModalConfirm)
    );
    // @ts-ignore
    expect(wrapper.getByText(objModalConfirm.textAction)).toBeTruthy();
    // @ts-ignore
    expect(wrapper.getByText(objModalConfirm.textTitle)).toBeTruthy();
    // @ts-ignore
    expect(wrapper.getByText(objModalConfirm.textBody)).toBeTruthy();
    // @ts-ignore
    expect(wrapper.getByText(objModalConfirm.errorExecute)).toBeTruthy();
    // verifica se 'Spinner' esta oculto
    expect(
      // @ts-ignore
      wrapper.getByText(objModalConfirm.textBody).querySelector("div")
    ).toHaveAttribute("hidden");
    //Executa ação
    // @ts-ignore
    const btExecute = wrapper.getByText(objModalConfirm.textAction);
    fireEvent.click(btExecute);
    // @ts-ignore
    expect(store.getState().modals.confirm.executed).toEqual(
      // @ts-ignore
      objModalConfirm.executed + 1
    );
    //Altera botão para desabilitado e exibe 'Spinner'
    store.dispatch(
      confirmModal({
        show: true,
        disabledButtons: true,
      })
    );
    expect(
      // @ts-ignore
      wrapper.getByText(objModalConfirm.textBody).querySelector("div")
    ).not.toHaveAttribute("hidden");
    //Altera botão para habilitado e oculta 'Spinner'
    store.dispatch(
      confirmModal({
        show: true,
        disabledButtons: false,
      })
    );
    expect(
      // @ts-ignore
      wrapper.getByText(objModalConfirm.textBody).querySelector("div")
    ).toHaveAttribute("hidden");
    const btClose = wrapper.getByText("Fechar");
    fireEvent.click(btClose);
    // @ts-ignore
    expect(store.getState().modals.confirm).toEqual(startState);
  });

  test("ModalLoading", () => {
    // @ts-ignore
    const startState = store.getState().modals.loading;
    const wrapper = renderModal(
      <ModalLoading />,
      loadingModal(objModalLoading)
    );
    // Verifica o componente apenas com o spinner
    expect(wrapper.getByText(/Loading..../i)).toBeTruthy();
    // Insere mensagem e verifica componente
    store.dispatch(
      loadingModal({ show: true, message: "LOADING MESSAGE TEXT" })
    );
    expect(wrapper.getByText(/LOADING MESSAGE TEXT/i)).toBeTruthy();
    // Fecha mensagem de loading
    store.dispatch(loadingModal({ show: false }));
    // @ts-ignore
    expect(store.getState().modals.loading).toEqual(startState);
  });

  test("ModalFail", () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, "push"); // or 'replace', 'goBack', etc.
    // @ts-ignore
    const startState = store.getState().modals.fail;
    const wrapper = renderModal(
      <Router history={history}>
        <ModalFail />
      </Router>,
      failModal(objModalFail)
    );
    expect(wrapper.getByText(objModalFail.textFail)).toBeTruthy();
    const buttonClose = wrapper.getByText(objModalFail.textButton);
    expect(buttonClose).toBeTruthy();
    fireEvent.click(buttonClose);
    // @ts-ignore
    expect(store.getState().modals.fail).toEqual(startState);
    expect(pushSpy).toHaveBeenCalled();
    expect(history.location.pathname).toEqual(objModalFail.redirect);
  });

  test("ModalSuccess", () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, "push"); // or 'replace', 'goBack', etc.
    // @ts-ignore
    const startState = store.getState().modals.success;
    const wrapper = renderModal(
      <Router history={history}>
        <ModalSuccess />
      </Router>,
      successModal(objModalSuccess)
    );
    expect(wrapper.getByText(objModalSuccess.textSuccess)).toBeTruthy();
    const buttonClose = wrapper.getByText(objModalSuccess.textButton);
    expect(buttonClose).toBeTruthy();
    fireEvent.click(buttonClose);
    // @ts-ignore
    expect(store.getState().modals.success).toEqual(startState);
    expect(pushSpy).toHaveBeenCalled();
    expect(history.location.pathname).toEqual(objModalSuccess.redirect);
  });
});

const renderModal = (modalComponent: any, dispatchFunc: any) => {
  store.dispatch(dispatchFunc);
  return renderProviderRouter(
    render,
    <>{modalComponent}</>,
    history,
    store,
    false
  );
  // return render(<>{modalComponent}</>, {
  //   store: store,
  // });
};
