/**  @type import("../Login/LoginData").ICurrentSession */
import {
  IReduxAction,
  IReduxDispatch,
  IReducer,
  ICompanySlice,
} from "../interfaces/ReduxInterface";
import { ISessionSlice } from "../interfaces/SessionInterface";

const initialState: ISessionSlice = {
  userId: 0,
  company: { id: 0, nome: "" },
  group: { id: 0, nome: "", access: [] },
};

export default function sessionReducer(
  state = initialState,
  action: IReduxAction<ISessionSlice>
) {
  switch (action.type) {
    case "session/currentUser": {
      return action.payload;
    }
    case "session/changeCompany": {
      return action.payload;
    }
    case "session/destroy": {
      return initialState;
    }
    default:
      return state;
  }
}

/**
 * Carrega usuário na para seção.
 * @param {import("../Login/LoginData").ICurrentSession} currentUser
 */
export function loadCurrentUser(currentUser: ISessionSlice) {
  return function change(dispatch: IReduxDispatch<ISessionSlice>) {
    dispatch({ type: "session/currentUser", payload: currentUser });
  };
}
/**
 * Altera a empresa do usuário.
 * @param { id: number, nome: string } company_id_nome -> objeto para alterar empresa (id e nome)
 */
export function changeCompany(value: ICompanySlice) {
  return function change(
    dispatch: IReduxDispatch<ISessionSlice>,
    getState: IReducer
  ) {
    let session: ISessionSlice = { ...getState().session, company: value };
    dispatch({ type: "session/changeCompany", payload: session });
  };
}

export function logout() {
  return function change(dispatch: IReduxDispatch<null>) {
    dispatch({ type: "USER_LOGOUT" });
  };
}

// Trunk Function
export function destroySession() {
  return function destroy(dispatch: IReduxDispatch<null>) {
    dispatch({ type: "user/destroy" });
  };
}
