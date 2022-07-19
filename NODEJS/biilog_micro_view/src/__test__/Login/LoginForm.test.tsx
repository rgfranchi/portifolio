import React from "react";

import { act } from "react-dom/test-utils";

import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { renderProviderRouter } from "../testHelper/test-provider";

import { defaultFormTextValidate } from "../testHelper/test-text-defaults";

import LoginForm from "../../Login/LoginForm";
import { emptyLogin } from "../../Login/LoginData";
import {
  loadLoginInvalidValues,
  loadLoginValidValues,
  userMock,
} from "../server/serverUser";

let wrapper: any = null;
let history: any = null;
const objectMock = userMock;
const objectEmpty = emptyLogin;
const submitMock = jest.fn();

beforeEach(() => {
  cleanup();
  jest.setTimeout(20000);
  history = createMemoryHistory();
});

describe("LoginForm snapshot", () => {
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

describe("LoginForm validate", () => {
  test("valid", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    await act(async () => {
      await loadLoginValidValues(userEvent, screen);
    });
    expect(
      screen.queryByText(defaultFormTextValidate.preenchimento)
    ).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByText("Login"));
    });
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
  test("invalid", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    await act(async () => {
      fireEvent.click(screen.getByText("Login"));
    });
    expect(screen.queryAllByText(/informar um E-mail/i).length).toBe(1);
    expect(screen.queryAllByText(/informar uma senha/i).length).toBe(1);
    await act(async () => {
      await loadLoginInvalidValues(userEvent, screen);
    });
    expect(
      screen.queryAllByText(defaultFormTextValidate.emailInvalido).length
    ).toBe(1);
  });
});

const setWrapperDefault = async (object: any, handleSubmit: any = () => {}) => {
  await act(async () => {
    wrapper = await renderProviderRouter(
      render,
      <LoginForm initValues={object} submitForm={handleSubmit} />,
      history,
      store
    );
  });
};

// Enzime.configure({ adapter: new Adapter() });

// beforeEach(() => {
//   cleanup();
// });

// test("LoginForm snapshot empty", () => {
//   const startStateConfirm = store.getState().modals.confirm;
//   const submitMock = jest.fn();
//   const wrapper = render(
//     <LoginForm initValues={emptyData} submitForm={submitMock} />,
//     {
//       initialState: {},
//       store: store,
//     }
//   );
//   expect(wrapper).toMatchSnapshot();
// });

// test("LoginForm submit Validade", async () => {
//   const startStateConfirm = store.getState().modals.confirm;
//   const submitMock = jest.fn();
//   render(<LoginForm initValues={emptyData} submitForm={submitMock} />, {
//     initialState: {},
//     store: store,
//   });
//   await act(async () => {
//     await userEvent.type(
//       screen.getByPlaceholderText("E-mail cadastrado"),
//       "operador@teste.com",
//       {
//         delay: 100,
//       }
//     );
//     await userEvent.type(screen.getByPlaceholderText("Senha"), "123456", {
//       delay: 100,
//     });
//   });

//   expect(screen.queryByText("É Necessário informar um E-mail")).toBeNull();
//   expect(screen.queryByText("Endereço de e-mail inválido")).toBeNull();
//   expect(screen.queryByText("É Necessário informar uma senha")).toBeNull();

//   // submit form.
//   await act(async () => {
//     fireEvent.click(screen.getByText("Login"));
//   });
//   expect(submitMock).toHaveBeenCalledTimes(1);
//   expect(submitMock.mock.calls[0][0]).toEqual({
//     email: "operador@teste.com",
//     password: "123456",
//   });
// });

// test("LoginForm submit Invalidate", async () => {
//   const startStateConfirm = store.getState().modals.confirm;
//   const submitMock = jest.fn();
//   render(<LoginForm initValues={emptyData} submitForm={submitMock} />, {
//     initialState: {},
//     store: store,
//   });

//   // submit form.
//   await act(async () => {
//     fireEvent.click(screen.getByText("Login"));
//   });

//   expect(screen.queryByText("É Necessário informar um E-mail")).toBeTruthy();
//   expect(screen.queryByText("É Necessário informar uma senha")).toBeTruthy();
//   await act(async () => {
//     await userEvent.type(
//       screen.getByPlaceholderText("E-mail cadastrado"),
//       "operador$teste.com",
//       {
//         delay: 100,
//       }
//     );
//   });
//   // submit form.
//   await act(async () => {
//     fireEvent.click(screen.getByText("Login"));
//   });
//   expect(screen.queryByText("Endereço de e-mail inválido")).toBeTruthy();
//   expect(submitMock).toHaveBeenCalledTimes(0);
// });
