import React from "react";

import { act } from "react-dom/test-utils";

import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { renderProviderRouter } from "../testHelper/test-provider";

import { defaultFormTextValidate } from "../testHelper/test-text-defaults";

import { emptyUser } from "../../User/UserData";
import {
  userMock,
  loadUserValidValues,
  loadUserInvalidValues,
} from "../server/serverUser";
import UserForm from "../../User/UserForm";
import { listGroupMock } from "../server/serverGroup";

let wrapper: any = null;
let history: any = null;
const objectMock = userMock;
const objectEmpty = emptyUser;
const submitMock = jest.fn();

beforeEach(() => {
  cleanup();
  jest.setTimeout(20000);
  history = createMemoryHistory();
});

describe("UserForm snapshot", () => {
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

describe("UserForm validate", () => {
  test("valid", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    await act(async () => {
      await loadUserValidValues(userEvent, screen);
    });
    expect(
      screen.queryByText(defaultFormTextValidate.preenchimento)
    ).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
  test("invalid", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });
    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(4);
    await act(async () => {
      await loadUserInvalidValues(userEvent, screen);
    });
    expect(
      screen.queryAllByText(defaultFormTextValidate.minimo3caracteres).length
    ).toBe(1);
    expect(
      screen.queryAllByText(defaultFormTextValidate.selecioneOpcao).length
    ).toBe(1);
    expect(
      screen.queryAllByText(defaultFormTextValidate.emailInvalido).length
    ).toBe(1);
    expect(screen.queryAllByText(/menos uma letra caixa 'ALTA'/i).length).toBe(
      1
    );
    expect(screen.queryAllByText(/confirmação incorreto/i).length).toBe(1);
  });
});

const setWrapperDefault = async (
  object: any,
  handleSubmit: any = () => {},
  loadValues: any = { groups: listGroupMock }
) => {
  await act(async () => {
    wrapper = await renderProviderRouter(
      render,
      <UserForm
        initValues={object}
        submitForm={handleSubmit}
        loadValues={loadValues}
      />,
      history,
      store
    );
  });
};
