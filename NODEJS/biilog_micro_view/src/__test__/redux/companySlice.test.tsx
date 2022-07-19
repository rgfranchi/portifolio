import React from "react";
import { createMemoryHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
import { cleanup, render } from "@testing-library/react";

import store from "../../redux/store";

import {
  fetchCompanies,
  createCompany,
  updateCompany,
  dropCompany,
  destroyCompany,
} from "../../redux/companySlice";

import { companyMock, listCompanyMock } from "../server/serverCompany";
import { ICompanySlice, IState } from "../../interfaces/ReduxInterface";
import { renderProviderRouter } from "../testHelper/test-provider";

// objetos esperados no retorno
const objExpect1: ICompanySlice = listCompanyMock[0];
const objExpect2: ICompanySlice = listCompanyMock[1];
const objExpectChange: ICompanySlice = companyMock;

// objeto recebido
let objReceive: ICompanySlice[];
let history: any = null;

beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});

describe("CompanySlice save", () => {
  test("createCompany", () => {
    renderSlice(
      <>
        <MockDispatch action={createCompany} value={objExpect1} />
        <MockDispatch action={createCompany} value={objExpect2} />
      </>
    );
    expect(objReceive).toEqual([objExpect1, objExpect2]);
  });
  test("updateCompany", () => {
    objExpectChange.id = objExpect1.id;
    renderSlice(
      <>
        <MockDispatch action={createCompany} value={objExpect1} />
        <MockDispatch action={createCompany} value={objExpect2} />
        <MockDispatch action={updateCompany} value={objExpectChange} />
      </>
    );
    expect(objReceive).toEqual([objExpectChange, objExpect2]);
  });
});

describe("CompanySlice delete", () => {
  test("dropCompany", () => {
    renderSlice(
      <>
        <MockDispatch action={createCompany} value={objExpect1} />
        <MockDispatch action={createCompany} value={objExpect2} />
        <MockDispatch action={dropCompany} value={objExpect2.id} />
      </>
    );
    expect(objReceive).toEqual([objExpect1]);
  });
  test("destroyCompany", () => {
    renderSlice(
      <>
        <MockDispatch action={createCompany} value={objExpect1} />
        <MockDispatch action={createCompany} value={objExpect2} />
        <MockDispatch action={destroyCompany} value={null} />
      </>
    );
    expect(objReceive).toEqual([]);
  });
});

describe("CompanySlice load", () => {
  test("fetchCompanies", async () => {
    renderSlice(
      <>
        <MockDispatch action={fetchCompanies} value={listCompanyMock} />
      </>
    );
    expect(objReceive).toEqual(listCompanyMock);
  });
});

const renderSlice = (objRender: any) => {
  renderProviderRouter(
    render,
    <>
      <MockDispatch action={destroyCompany} />
      {objRender}
      <MockState />
    </>,
    history,
    store
  );
};

const MockDispatch: React.FC<{ action: any; value?: any }> = (args) => {
  const dispatch = useDispatch();
  dispatch(args.action(args.value));
  return <></>;
};

const MockState: React.FC = () => {
  objReceive = useSelector((state: IState) => state.companies);
  return <></>;
};
