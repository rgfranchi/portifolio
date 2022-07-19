import React from "react";

import { act } from "react-dom/test-utils";

import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { renderProviderRouter } from "../testHelper/test-provider";

import { defaultFormTextValidate } from "../testHelper/test-text-defaults";

import {
  companyMock,
  loadCompanyInvalidValues,
  loadCompanyValidValues,
} from "../server/serverCompany";

import CompanyForm from "../../Company/CompanyForm";
import { emptyCompany } from "../../Company/CompanyData";

let wrapper: any = null;
let history: any = null;
const objectMock = companyMock;
const objectEmpty = emptyCompany;
const submitMock = jest.fn();

beforeEach(() => {
  cleanup();
  jest.setTimeout(20000);
  history = createMemoryHistory();
});

describe("CompanyForm snapshot", () => {
  test("empty", async () => {
    history.entries[0].key = "EMPTY_01";
    await setWrapperDefault(objectEmpty, submitMock);
    expect(wrapper.container).toMatchSnapshot();
  });
  test("with data", async () => {
    history.entries[0].key = "DATA_01";
    await setWrapperDefault(objectMock, submitMock);
    expect(wrapper.container).toMatchSnapshot();
  });
});

describe("CompanyForm validate", () => {
  test("Validate", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    await act(async () => {
      await loadCompanyValidValues(userEvent, screen);
    });
    expect(
      screen.queryByText(defaultFormTextValidate.preenchimento)
    ).toBeNull();
    expect(
      screen.queryByText(defaultFormTextValidate.minimo3caracteres)
    ).toBeNull();
    expect(
      screen.queryByText(defaultFormTextValidate.emailInvalido)
    ).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
  test("Invalidate", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });

    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(4);

    await act(async () => {
      await loadCompanyInvalidValues(userEvent, screen);
    });

    expect(
      screen.queryAllByText(defaultFormTextValidate.minimo3caracteres).length
    ).toBe(2);
    expect(
      screen.queryAllByText(defaultFormTextValidate.emailInvalido).length
    ).toBe(1);
    expect(
      screen.queryAllByText(defaultFormTextValidate.cepFormato).length
    ).toBe(1);
    expect(
      screen.queryAllByText(defaultFormTextValidate.cnpjInvalido).length
    ).toBe(1);

    expect(submitMock).toHaveBeenCalledTimes(1);
  });
});

describe("CompanyForm load", () => {
  test("CEP", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    const cepInput = screen.getByLabelText("CEP");
    const logradouroInput = screen.getByLabelText("Logradouro");
    await act(async () => {
      await userEvent.type(cepInput, "05520-200", {
        delay: 100,
      });
      await waitForElementToBeRemoved(() =>
        screen.getByText(defaultFormTextValidate.cepFormato)
      );
    });
    cepInput.focus();
    //@ts-ignore
    userEvent.tab();
    expect(document.querySelector("div.modal-content")).toBeTruthy();
    await waitForElementToBeRemoved(() =>
      document.querySelector("div.modal-content")
    ).then(() => {
      //@ts-ignore
      expect(logradouroInput.value).toBe("Avenida Professor Francisco Morato");
    });
  });
});

const setWrapperDefault = async (object: any, handleSubmit: any = () => {}) => {
  await act(async () => {
    wrapper = await renderProviderRouter(
      render,
      <CompanyForm initValues={object} submitForm={handleSubmit} />,
      history,
      store
    );
  });
};
