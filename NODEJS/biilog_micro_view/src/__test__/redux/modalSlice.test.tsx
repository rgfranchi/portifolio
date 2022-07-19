import React from "react";
import { createMemoryHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { modalSliceDefault } from "../testHelper/test-text-defaults";

import {
  loadingModal,
  confirmModal,
  failModal,
  successModal,
  destroyModals,
} from "../../redux/modalSlice";
import store from "../../redux/store";
import { IConfirmModal, ILoadingModal } from "../../interfaces/ModalsInterface";
import { IModalSlice } from "../../interfaces/ReduxInterface";
import { renderProviderRouter } from "../testHelper/test-provider";

// objeto recebido
let objReceive: IModalSlice;
// objeto que é enviado
let objSender: IConfirmModal;
// objeto esperado no retorno
let objExpect: IModalSlice = modalSliceDefault;
let history: any = null;

beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});

describe("ModalSlice empty", () => {
  test("initialModal", () => {
    renderSlice();
    expect(objReceive).toEqual(objExpect);
  });
});

describe("ModalSlice load", () => {
  test("loadingModal", () => {
    let current: ILoadingModal = objExpect.loading;
    objSender = current = { show: true, message: "MENSAGEM de Teste" };
    renderSlice(<MockDispatch action={loadingModal} />);
    expect(objReceive.loading).toEqual(current);
  });
  test("confirmModal", () => {
    let current = objExpect.confirm;
    objSender = current = {
      show: true,
      executed: 2,
      disabledButtons: false,
      textTitle: "TESTE TITULO",
      textBody: "TESTE CORPO",
      textAction: "TESTE AÇÃO",
      errorExecute: "TESTE ERRO EXECUTADO",
      variantAction: "primary",
    };
    renderSlice(<MockDispatch action={confirmModal} />);
    expect(objReceive.confirm).toEqual(current);
  });
  test("failModal", () => {
    let current = objExpect.fail;
    objSender = current = {
      show: true,
      redirect: "URL de Redirecionamento",
      textFail: "TEXTO da Falha",
      textButton: "TEXTO do Botão",
    };
    renderSlice(<MockDispatch action={failModal} />);
    expect(objReceive.fail).toEqual(current);
  });

  test("successModal", () => {
    let current = objExpect.success;
    objSender = current = {
      show: true,
      redirect: "URL de Redirecionamento",
      textSuccess: "TEXTO da Sucesso",
      textButton: "TEXTO do Botão",
    };
    renderSlice(<MockDispatch action={successModal} />);
    expect(objReceive.success).toEqual(current);
  });
});

const renderSlice = (objRender: any = null) => {
  return renderProviderRouter(
    render,
    <>
      <MockDispatch action={destroyModals} />
      {objRender}
      <MockState />
    </>,
    history,
    store
  );
};

const MockDispatch = (value: any) => {
  const dispatch = useDispatch();
  dispatch(value.action(objSender));
  return <></>;
};

const MockState = () => {
  objReceive = useSelector((state: any) => state.modals);
  return <></>;
};
