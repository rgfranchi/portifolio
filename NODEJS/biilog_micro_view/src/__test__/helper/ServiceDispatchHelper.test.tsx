import React from "react";
import { createMemoryHistory } from "history";
import { cleanup, render } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";

import store from "../../redux/store";
import { ICompany } from "../../Company/CompanyData";
import { listCompanyMock } from "../server/serverCompany";
import { confirmModal, loadingModal } from "../../redux/modalSlice";

import {
  listDispatchHelper,
  dataDispatchHelper,
  valuesDispatchHelper,
  deleteLoadDispatchHelper,
  deleteDispatchHelper,
  clearDispatchHelper,
  loadingDispatchHelper,
} from "../../helper/ServiceDispatchHelper";
import { renderProviderRouter } from "../testHelper/test-provider";
import { listAlert } from "../../redux/alertSlice";

const dataMock: ICompany[] = listCompanyMock;
let dispatch: any;
// objeto recebido
let objReceive: any;
let history: any = null;
beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});

describe("listDispatchHelper", () => {
  const mockGetList = jest.fn((x) => x);
  beforeEach(() => {
    mockGetList.mockClear();
    // carrega loading
    renderSlice();
    expect(mockGetList.mock.calls.length).toBe(0);
    dispatch(loadingModal({ show: true, message: "FAKE LOADING" }));
    expect(objReceive.modals.loading.show).toBeTruthy();
  });
  afterEach(() => {
    // loadingModal
    expect(objReceive.modals.loading.show).toBeFalsy();
    expect(mockGetList.mock.calls.length).toBe(1);
    expect(mockGetList.mock.results[0].value.loaded).toBeTruthy();
  });
  test("string até 299 fail", () => {
    listDispatchHelper<ICompany>(
      { response: "LESS 299", status: 298 },
      dispatch,
      mockGetList
    );
    expect(objReceive.alert.hidden).toBeFalsy();
    expect(objReceive.alert.message).toEqual("LESS 299");
    expect(objReceive.alert.variant).toEqual("danger");
    expect(mockGetList.mock.results[0].value.values).toEqual([]);
  });
  test("string maior 299 error", () => {
    listDispatchHelper<ICompany>(
      { response: "MORE 299", status: 301 },
      dispatch,
      mockGetList
    );
    expect(objReceive.modals.fail.show).toBeTruthy();
    expect(objReceive.modals.fail.redirect).toBeNull();
    expect(objReceive.modals.fail.textFail).toEqual("MORE 299");
    expect(objReceive.modals.fail.textButton).toEqual("Retornar");
    expect(mockGetList.mock.results[0].value.values).toEqual([]);
  });
  test("data", () => {
    listDispatchHelper<ICompany>(
      { response: dataMock, status: 200 },
      dispatch,
      mockGetList
    );
    expect(mockGetList.mock.results[0].value.values).toEqual(dataMock);
  });
});

describe("dataDispatchHelper", () => {
  const mockSetInitValues = jest.fn((x) => x);
  beforeEach(() => {
    mockSetInitValues.mockClear();
    // carrega loading
    renderSlice();
    expect(mockSetInitValues.mock.calls.length).toBe(0);
    dispatch(loadingModal({ show: true, message: "FAKE LOADING" }));
    expect(objReceive.modals.loading.show).toBeTruthy();
  });
  afterEach(() => {
    // loadingModal
    expect(objReceive.modals.loading.show).toBeFalsy();
  });
  test("string status 204 ou maior que 299 fail", () => {
    dataDispatchHelper<ICompany>(
      { response: "LESS 299 NOT 204", status: 298 },
      dispatch,
      mockSetInitValues
    );
    expect(objReceive.alert.hidden).toBeFalsy();
    expect(objReceive.alert.message).toEqual("LESS 299 NOT 204");
    expect(objReceive.alert.variant).toEqual("danger");
    expect(mockSetInitValues.mock.calls.length).toBe(0);
  });
  test("string status diferente de 204 ou menor que 299 fail", () => {
    dataDispatchHelper<ICompany>(
      { response: "MORE 299 OR 204", status: 302 },
      dispatch,
      mockSetInitValues
    );

    expect(objReceive.modals.fail.show).toBeTruthy();
    expect(objReceive.modals.fail.redirect).toBeNull();
    expect(objReceive.modals.fail.textFail).toEqual("MORE 299 OR 204");
    expect(objReceive.modals.fail.textButton).toEqual("Retornar");

    expect(mockSetInitValues.mock.calls.length).toBe(0);
  });
  test("data", () => {
    dataDispatchHelper<ICompany>(
      { response: dataMock[1], status: 200 },
      dispatch,
      mockSetInitValues
    );
    expect(mockSetInitValues.mock.calls.length).toBe(1);
    expect(mockSetInitValues.mock.results[0].value).toEqual(dataMock[1]);
  });
});

describe("valuesDispatchHelper", () => {
  const mockSetValues = jest.fn((x) => x);
  beforeEach(() => {
    mockSetValues.mockClear();
    // carrega loading
    renderSlice();
    expect(mockSetValues.mock.calls.length).toBe(0);
    dispatch(loadingModal({ show: true, message: "FAKE LOADING" }));
    expect(objReceive.modals.loading.show).toBeTruthy();
  });
  afterEach(() => {
    // loadingModal
    expect(mockSetValues.mock.calls.length).toBe(1);
    expect(objReceive.modals.loading.show).toBeFalsy();
  });
  test("string status 204 ou maior que 299 fail", () => {
    valuesDispatchHelper<ICompany>(
      [{ response: "LESS 299 NOT 204 MANY", status: 298 }],
      dispatch,
      mockSetValues
    );
    expect(objReceive.alert.hidden).toBeFalsy();
    expect(objReceive.alert.message).toEqual("LESS 299 NOT 204 MANY");
    expect(objReceive.alert.variant).toEqual("danger");
  });
  test("string status diferente de 204 ou menor que 299 fail", () => {
    valuesDispatchHelper<ICompany>(
      [{ response: "MORE 299 OR 204 MANY", status: 302 }],
      dispatch,
      mockSetValues
    );
    expect(objReceive.modals.fail.show).toBeTruthy();
    expect(objReceive.modals.fail.redirect).toBeNull();
    expect(objReceive.modals.fail.textFail).toEqual("MORE 299 OR 204 MANY");
    expect(objReceive.modals.fail.textButton).toEqual("Retornar");
  });
  test("data", () => {
    valuesDispatchHelper<ICompany>(
      [{ response: dataMock, status: 200 }],
      dispatch,
      mockSetValues
    );
    expect(mockSetValues.mock.results[0].value[0].response).toEqual(dataMock);
  });
});
describe("deleteLoadDispatchHelper", () => {
  test("confirm", () => {
    renderSlice();
    expect(objReceive.modals.confirm.show).toBeFalsy();
    deleteLoadDispatchHelper(dispatch);
    expect(objReceive.modals.confirm.show).toBeTruthy();
    expect(objReceive.modals.confirm.textTitle).toEqual("Excluir Registro?");
    expect(objReceive.modals.confirm.textBody).toEqual(
      "Esta ação não pode ser desfeita."
    );
    expect(objReceive.modals.confirm.textAction).toEqual("Excluir");
    expect(objReceive.modals.confirm.variantAction).toEqual("warning");
  });
});
describe("deleteDispatchHelper", () => {
  const mockSetReload = jest.fn((x) => x);
  const mockSetList = jest.fn((x) => x);
  beforeEach(() => {
    mockSetReload.mockClear();
    mockSetList.mockClear();
    // carrega loading
    renderSlice();
    expect(mockSetReload.mock.calls.length).toBe(0);
    expect(mockSetList.mock.calls.length).toBe(0);
    dispatch(
      confirmModal({
        show: true,
        textTitle: "FAKE Excluir Registro?",
        textBody: "FAKE Esta ação não pode ser desfeita.",
        textAction: "FAKE Excluir",
        variantAction: "warning",
      })
    );
    expect(objReceive.modals.confirm.show).toBeTruthy();
  });

  test("202", () => {
    deleteDispatchHelper<ICompany>(
      { status: 202, response: "" },
      dispatch,
      9,
      mockSetReload,
      mockSetList
    );
    expect(objReceive.modals.confirm.show).toBeFalsy();
    expect(objReceive.modals.confirm.textTitle).toBeNull();
    expect(objReceive.modals.confirm.textBody).toBeNull();
    expect(objReceive.modals.confirm.textAction).toEqual("Executar");
    expect(objReceive.modals.confirm.variantAction).toEqual("primary");

    expect(mockSetReload.mock.results[0].value).toEqual(10);
    expect(mockSetList.mock.results[0].value.loaded).toBeFalsy();
    expect(mockSetList.mock.results[0].value.values).toEqual([]);
  });
  test("fail", () => {
    deleteDispatchHelper<ICompany>(
      { status: 205, response: "REGISTRO FAKE NÃO PODE SER EXCLUIDO" },
      dispatch,
      9,
      mockSetReload,
      mockSetList
    );
    expect(objReceive.modals.confirm.show).toBeTruthy();
    expect(objReceive.modals.confirm.textTitle).toEqual(
      "FAKE Excluir Registro?"
    );
    expect(objReceive.modals.confirm.textBody).toEqual(
      "FAKE Esta ação não pode ser desfeita."
    );
    expect(objReceive.modals.confirm.textAction).toEqual("FAKE Excluir");
    expect(objReceive.modals.confirm.variantAction).toEqual("warning");
    expect(objReceive.modals.confirm.errorExecute).toEqual(
      "REGISTRO FAKE NÃO PODE SER EXCLUIDO"
    );
    expect(mockSetReload.mock.results).toEqual([]);
    expect(mockSetList.mock.results).toEqual([]);
  });
});

describe("clearDispatchHelper", () => {
  test("clean values", () => {
    // carrega loading
    renderSlice();
    dispatch(
      listAlert({
        hidden: false,
        message: "FAKE Alert Message.",
        variant: "danger",
      })
    );
    expect(objReceive.alert.hidden).toBeFalsy();
    clearDispatchHelper(dispatch);
    expect(objReceive.alert.hidden).toBeTruthy();
  });
});

describe("loadingDispatchHelper", () => {
  test("loading", () => {
    // carrega loading
    renderSlice();
    expect(objReceive.modals.loading.show).toBeFalsy();
    loadingDispatchHelper(dispatch, "MOCK LOADING MODAL");
    expect(objReceive.modals.loading.show).toBeTruthy();
    expect(objReceive.modals.loading.message).toEqual("MOCK LOADING MODAL");
  });
});

const renderSlice = (objRender: any = null) => {
  return renderProviderRouter(
    render,
    <>
      <MockDispatch />
      {objRender}
      <MockState />
    </>,
    history,
    store
  );
};

const MockDispatch = () => {
  dispatch = useDispatch();
  return <></>;
};

const MockState = () => {
  objReceive = useSelector((state: any) => state);
  return <></>;
};
