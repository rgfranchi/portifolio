import {
  screen,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { confirmModal } from "../../redux/modalSlice";

/**
 * Verifica se os elementos de save da tela foram executados com sucesso.
 * @param {boolean} isSuccess
 * @param {*} store
 */
export const verifyScreenAfterSave = async (isSuccess: boolean, store: any) => {
  // verifica se o modal Loading está ativo
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  // verifica mensagem de falha.
  expect(store.getState().alert.hidden).toBe(true);
  // aguarda modal finalizar
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

  // Verifica estado dos elementos.
  if (isSuccess) {
    expect(store.getState().modals.success.show).toBe(true);
    expect(store.getState().modals.success.textButton).toMatch(/Retornar/i);
  } else {
    expect(store.getState().alert.hidden).toBe(false);
    expect(store.getState().alert.message).toMatch(/ERROR STATUS\[/i);
  }
};

/**
 * Executa comando de exclusão da tela List
 * @param {number} buttonPosition
 * @param {*} store
 */
export const verifyExecuteScreenDelete = async (
  buttonPosition: number,
  store: any
) => {
  // clica sobre o segundo link
  userEvent.click(screen.getAllByRole("button")[buttonPosition]);
  // verifica se alterou para exibir modal
  expect(store.getState().modals.confirm.show).toBe(true);
  // variável de NÃO executado.
  expect(store.getState().modals.confirm.executed).toBe(0);
  // realiza chamada de execução do modal.
  store.dispatch(confirmModal({ show: true, executed: 1 }));
  expect(store.getState().modals.confirm.executed).toBe(1);

  await waitForElement(() => screen.getByText(/Carregando/i));

  await waitForElementToBeRemoved(() => screen.getByText(/Carregando/i));
};

/**
 * Verifica e guarda carregar valores no tela, Create e Update
 * @param {boolean} isSuccess
 * @param {"modal" | "alert"} type "modal" | "alert"
 * @param {*} store
 */
export const loadingScreenValues = async (
  isSuccess: boolean,
  type: "modal" | "alert",
  store: any
) => {
  // state do loading exibido
  expect(store.getState().modals.loading.show).toBe(true);
  // elementos carregando Página de Loading
  expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  // verifica mensagem de falha.
  expect(store.getState().alert.hidden).toBe(true);
  // aguarda loading finalizar.
  await waitForElementToBeRemoved(() => screen.getByText(/Carregando/i));
  if (type === "modal") {
    if (isSuccess) {
      // state do loading oculto
      expect(store.getState().modals.loading.show).toBe(false);
    } else {
      expect(store.getState().modals.fail.show).toBe(true);
      expect(store.getState().modals.fail.textFail).toMatch(/vazia/i);
    }
  } else {
    expect(store.getState().alert.hidden).toBe(false);
    expect(store.getState().alert.message).toMatch(/vazia/i);
  }
};
