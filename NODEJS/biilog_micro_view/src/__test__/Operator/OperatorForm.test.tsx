import React from "react";

import { act } from "react-dom/test-utils";

import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { renderProviderRouter } from "../testHelper/test-provider";

import { defaultFormTextValidate } from "../testHelper/test-text-defaults";

import {
  operatorMock,
  loadOperatorValidValues,
  loadOperatorInvalidValues,
} from "../server/serverOperator";

import OperatorForm from "../../Operator/OperatorForm";
import { emptyOperator } from "../../Operator/OperatorData";

let wrapper: any = null;
let history: any = null;
const objectMock = operatorMock;
const objectEmpty = {
  ...emptyOperator,
  ...{
    acessoDataFinal: "2021-01-08",
    acessoDataInicial: "2021-01-08",
  },
};
const submitMock = jest.fn();

beforeEach(() => {
  cleanup();
  jest.setTimeout(20000);
  history = createMemoryHistory();
});

describe("OperatorForm snapshot", () => {
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

describe("OperatorForm validade", () => {
  test("valid", async () => {
    await setWrapperDefault(objectEmpty, submitMock);
    await act(async () => {
      await loadOperatorValidValues(userEvent, screen);
    });
    expect(
      screen.queryByText(defaultFormTextValidate.preenchimento)
    ).toBeNull();
    expect(
      screen.queryByText(defaultFormTextValidate.minimo3caracteres)
    ).toBeNull();
    expect(
      screen.queryByText(defaultFormTextValidate.selecioneOpcao)
    ).toBeNull();
    expect(
      screen.queryByText(defaultFormTextValidate.emailInvalido)
    ).toBeNull();
    expect(
      screen.queryByText(/Acesso Inicial deve ser ANTERIOR a Final/i)
    ).toBeNull();
    expect(
      screen.queryByText(/Acesso Final deve ser POSTERIOR a Inicial/i)
    ).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });
    expect(submitMock).toHaveBeenCalledTimes(1);
  });

  test("invalid", async () => {
    await act(async () => {
      await setWrapperDefault(objectEmpty, submitMock);
      fireEvent.click(screen.getByText("Salvar"));
    });

    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(4);

    await act(async () => {
      await loadOperatorInvalidValues(userEvent, screen);
    });

    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(2);
    expect(
      screen.queryAllByText(defaultFormTextValidate.minimo3caracteres).length
    ).toBe(1);
    expect(
      screen.queryAllByText(defaultFormTextValidate.selecioneOpcao).length
    ).toBe(1);
    expect(
      screen.queryAllByText(defaultFormTextValidate.emailInvalido).length
    ).toBe(1);
    expect(
      screen.queryAllByText(/Acesso Inicial deve ser ANTERIOR a Final/i).length
    ).toBe(1);
    expect(
      screen.queryAllByText(/Acesso Final deve ser POSTERIOR a Inicial/i).length
    ).toBe(1);
  });
});

const setWrapperDefault = async (object: any, handleSubmit: any = () => {}) => {
  await act(async () => {
    wrapper = await renderProviderRouter(
      render,
      <OperatorForm initValues={object} submitForm={handleSubmit} />,
      history,
      store
    );
  });
};

// Enzime.configure({ adapter: new Adapter() });

// beforeEach(() => {
//   cleanup();
// });

// test("OperatorForm snapshot empty", () => {
//   const empty = {
//     ...emptyOperator,
//     ...{
//       acessoDataFinal: "2021-01-08",
//       acessoDataInicial: "2021-01-08",
//     },
//   };
//   const wrapper = mount(
//     <OperatorForm
//       initValues={empty}
//       submitForm={() => {
//         console.log("Submit");
//       }}
//     />
//   );
//   // valores vazio
//   expect(toJson(wrapper)).toMatchSnapshot();
// });

// test("OperatorForm snapshot valores", () => {
//   const wrapper = mount(
//     <OperatorForm
//       initValues={listOperatorMock[1]}
//       submitForm={() => {
//         console.log("Submit");
//       }}
//     />
//   );
//   expect(toJson(wrapper)).toMatchSnapshot();
// });

// test("OperatorForm validos Create", async () => {
//   jest.setTimeout(20000);
//   const submitMock = jest.fn();
//   render(<OperatorForm initValues={emptyOperator} submitForm={submitMock} />);
//   await act(async () => {
//     userEvent.selectOptions(screen.getByLabelText("Sexo"), ["Masculino"]);
//     await userEvent.type(
//       screen.getByLabelText("E-mail"),
//       "operador@teste.com",
//       {
//         delay: 100,
//       }
//     );
//     await userEvent.type(screen.getByLabelText("Nome"), "NOME TESTE", {
//       delay: 100,
//     });
//     await userEvent.type(screen.getByLabelText("Código"), "Código 9999", {
//       delay: 100,
//     });
//     await userEvent.type(screen.getByLabelText("Tipo"), "Operador Teste", {
//       delay: 100,
//     });
//     await userEvent.type(screen.getByLabelText("Código RFID"), "RFID_TESTE", {
//       delay: 100,
//     });
//     await userEvent.type(screen.getByLabelText("Senha"), "SENHA_TESTE", {
//       delay: 100,
//     });
//     await userEvent.type(
//       screen.getByLabelText("Observações"),
//       "Operador Observações de texto",
//       {
//         delay: 100,
//       }
//     );
//   });
//   // verifica se não possui msg de erro.
//   expect(screen.queryByText("Preenchimeto obrigatório")).toBeNull();
//   expect(screen.queryByText("Nome com no mínimo 3 caracteres")).toBeNull();
//   expect(screen.queryByText("Selecione Uma Opção")).toBeNull();
//   expect(
//     screen.queryByText("Acesso Inicial deve ser ANTERIOR a Final")
//   ).toBeNull();
//   expect(
//     screen.queryByText("Acesso Final deve ser POSTERIOR a Inicial")
//   ).toBeNull();

//   // expect(screen.queryByText("Endereço de e-mail inválido")).toBeNull();
//   expect(screen.queryByText("Selecione uma empresa .... ")).toBeNull();
//   // submit form.
//   await act(async () => {
//     fireEvent.click(screen.getByText("Salvar"));
//   });
//   expect(submitMock).toHaveBeenCalledTimes(1);

//   // recebe data atual apara comparar.
//   const nowString = dateTimeNowToString(false);
//   expect(submitMock.mock.calls[0][0]).toEqual({
//     acessoDataFinal: nowString,
//     acessoDataInicial: nowString,
//     codOperador: "Código 9999",
//     companyId: 0, // está no contexto da aplicação.
//     email: "operador@teste.com",
//     id: 0,
//     nome: "NOME TESTE",
//     observacao: "Operador Observações de texto",
//     rfid: "RFID_TESTE",
//     senha: "SENHA_TESTE",
//     sexo: "Masculino",
//     tipo: "Operador Teste",
//   });
// });

// test("OperatorForm validade inválidos", async () => {
//   jest.setTimeout(20000);
//   const submitMock = jest.fn();
//   render(<OperatorForm initValues={emptyOperator} submitForm={submitMock} />);
//   // executa post sem valor preenchido
//   await act(async () => {
//     fireEvent.click(screen.getByText("Salvar"));
//     // await new Promise((r) => setTimeout(r, 500)); // aguarda resposta do banco de dados
//   });
//   // verifica os campos em branco Nome / Código / Tipo / E-mail
//   expect(screen.queryAllByText("Preenchimento obrigatório").length).toBe(4);
//   expect(screen.queryByText("Selecione Uma Opção")).toBeTruthy();
//   await act(async () => {
//     await userEvent.type(screen.getByLabelText("Nome"), "AB", {
//       delay: 300,
//     });
//     await userEvent.type(
//       screen.getByLabelText("Acesso Inicial"),
//       "01/01/2020",
//       {
//         delay: 300,
//       }
//     );
//     await userEvent.type(screen.getByLabelText("Acesso Final"), "01/01/2000", {
//       delay: 300,
//     });
//     await userEvent.type(screen.getByLabelText("E-mail"), "operador@xxxxx", {
//       delay: 300,
//     });
//   });
//   // verifica os campo Nome Com menos de 3 caracteres
//   expect(screen.queryByText("Nome com no mínimo 3 caracteres")).toBeTruthy();
//   // verifica se data inicial é menor que final
//   expect(
//     screen.queryByText("Acesso Inicial deve ser ANTERIOR a Final")
//   ).toBeTruthy();
//   expect(
//     screen.queryByText("Acesso Final deve ser POSTERIOR a Inicial")
//   ).toBeTruthy();
//   // verifica e-mail incorreto
//   expect(screen.queryByText("Endereço de e-mail inválido")).toBeTruthy();
//   // verifica id da empresa
// });
