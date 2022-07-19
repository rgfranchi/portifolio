/**
 * @todo Melhorar para salvar apenas o necessário do estado.
 */

import { IReducer } from "../interfaces/ReduxInterface";

/**
 * Recupera estado da aplicação (seção)
 */
export const loadStorage = (): IReducer | undefined => {
  try {
    const serializedState: string | null = localStorage.getItem("state");
    if (serializedState === null || serializedState.length === 0) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

/**
 * Salva estado da aplicação (seção).
 * @param {*} state
 */
export const saveStorage = (state: IReducer) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Destroy estado da aplicação (seção)
 */
export const destroyStorage = () => {
  try {
    localStorage.setItem("state", "");
  } catch (err) {
    console.error(err);
    localStorage.clear();
  }
};
