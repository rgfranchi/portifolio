import React from "react";
import { createMemoryHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
import { cleanup, render } from "@testing-library/react";

import store from "../../redux/store";
import {
  objMockEmptySession,
  objMockSession,
} from "../testHelper/test-session";
import {
  destroySession,
  changeCompany,
  logout,
  loadCurrentUser,
} from "../../redux/sessionSlice";
import { ICompanySlice, IState } from "../../interfaces/ReduxInterface";
import { ISessionSlice } from "../../interfaces/SessionInterface";
import { ICompany } from "../../Company/CompanyData";
import { renderProviderRouter } from "../testHelper/test-provider";

// objeto recebido
let objReceive: ISessionSlice;
// objeto esperado no retorno
let objExpect: ISessionSlice = objMockEmptySession;
// objeto que é enviado
let objSender: any;
let history: any = null;
beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});

describe("SessionSlice empty", () => {
  test("initialUser", () => {
    renderSlice(<></>);
  });
  test("logout", () => {
    renderSlice(<MockDispatch action={logout} />);
  });
  afterEach(() => {
    expect(objReceive).toEqual(objExpect);
  });
});

describe("SessionSlice values", () => {
  test("changeCompany", () => {
    objExpect.company = {
      nome: objMockSession.company.nome,
      id: objMockSession.company.id,
    };
    objSender = {
      id: objMockSession.company.id,
      nome: objMockSession.company.nome,
    };
    renderSlice(<MockDispatch action={changeCompany} />);
    expect(objReceive).toEqual(objExpect);
  });

  //verificar como funciona e possibilidade de melhoria "companySlice FetchCompanies list"
  test("loadCurrentUser", () => {
    objExpect = objMockSession;
    objSender = { state: objMockSession };
    renderSlice(<MockDispatch action={loadCurrentUser} />);
    expect(objReceive).toEqual({
      state: objExpect,
    });
  });
});

const renderSlice = (objRender: any) => {
  return renderProviderRouter(
    render,
    <>
      <MockDispatch action={destroySession} />
      {objRender}
      <MockState />
    </>,
    history,
    store
  );
  // render(
  //   <>
  //     <MockDispatch action={destroySession} />
  //     {objRender}
  //     <MockState />
  //   </>,
  //   {
  //     store: store,
  //   }
  // );
};

const MockDispatch: React.FC<{ action: any }> = (value) => {
  const dispatch = useDispatch();
  dispatch(value.action(objSender));
  return <></>;
};

const MockState: React.FC = () => {
  objReceive = useSelector((state: IState) => state.session);
  return <></>;
};
