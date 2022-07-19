import React from "react";
import { createMemoryHistory } from "history";

import { useDispatch, useSelector } from "react-redux";
import {
  act,
  render,
  fireEvent,
  screen,
  cleanup,
} from "@testing-library/react";

import store from "../../redux/store";
import { ICompany } from "../../Company/CompanyData";
import { companyMock } from "../server/serverCompany";
import { Formik, FormikHelpers } from "formik";
import { renderProviderRouter } from "../testHelper/test-provider";

import { SubmitForm } from "../../helper/ServiceHelper";

let dataMock: ICompany = companyMock;
let dispatch: any;
// objeto recebido
let objReceive: any;
let formResult: any;
let history: any = null;

beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});

afterEach(() => {
  expect(objReceive.modals.loading.show).toBeFalsy();
});

describe("SubmitForm", () => {
  test("CreateUpdate 200 201", async () => {
    const mockSaveData = jest.fn((value) => {
      const data = value;
      const status = 200;
      const response = "MOCK SALVO COM SUCESSO";
      return { data, status, response };
    });
    await setWrapperDefault(mockSaveData);
    expect(mockSaveData.mock.calls.length).toBe(0);
    await act(async () => {
      fireEvent.click(screen.getByText("SUBMIT"));
    });
    const res = await formResult;
    expect(res.data).toBe(dataMock);
    expect(res.status).toBe(200);
    expect(res.response).toBe("MOCK SALVO COM SUCESSO");

    expect(objReceive.modals.success.show).toBeTruthy();
    expect(objReceive.modals.success.redirect).toBeNull();
    expect(objReceive.modals.success.textSuccess).toEqual(
      "MOCK SALVO COM SUCESSO"
    );
    expect(objReceive.modals.success.textButton).toEqual("Retornar");

    expect(mockSaveData.mock.calls.length).toBe(1);
  });
  test("CreateUpdate 500", async () => {
    const mockSaveData = jest.fn((value) => {
      const data = value;
      const status = 500;
      const response = "MOCK FALHA AO SALVAR REGISTRO";
      return { data, status, response };
    });
    await setWrapperDefault(mockSaveData);
    expect(mockSaveData.mock.calls.length).toBe(0);
    await act(async () => {
      fireEvent.click(screen.getByText("SUBMIT"));
    });
    const res = await formResult;
    expect(res.data).toBe(dataMock);
    expect(res.status).toBe(500);
    expect(res.response).toBe("MOCK FALHA AO SALVAR REGISTRO");

    expect(objReceive.alert.hidden).toBeFalsy();
    expect(objReceive.alert.message).toEqual("MOCK FALHA AO SALVAR REGISTRO");
    expect(objReceive.alert.variant).toEqual("danger");

    expect(mockSaveData.mock.calls.length).toBe(1);
  });
});

const setWrapperDefault = async (mockSaveData: any) => {
  const handleSubmit = (
    value: ICompany = dataMock,
    formikHelper: FormikHelpers<ICompany>
  ) => {
    formResult = SubmitForm<ICompany>({
      values: value,
      formikHelper: formikHelper,
      //@ts-ignore
      saveData: mockSaveData,
      dispatch: dispatch,
      messageLoading: "MOCK Carregando Formulário",
    });
  };
  await act(async () => {
    await renderProviderRouter(
      render,
      <>
        <MockDispatch />
        <MockForm values={dataMock} handleSubmit={handleSubmit} />
        <MockState />
      </>,
      history,
      store
    );
  });
};

const MockForm: React.FC<{ values: any; handleSubmit: any }> = ({
  values,
  handleSubmit,
}) => {
  return (
    <>
      <Formik initialValues={values} onSubmit={handleSubmit}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <input
              onChange={formik.handleChange}
              value={formik.values.nome}
              type="text"
              name="MOCK"
            ></input>
            <button type="submit">SUBMIT</button>
          </form>
        )}
      </Formik>
    </>
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
