import React from "react";

import { createMemoryHistory } from "history";

import { useDispatch } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";

import store from "../../redux/store";
import { listAlert } from "../../redux/alertSlice";

import { AlertList } from "../../components/AlertsComponent";
import { IAlertSlice } from "../../interfaces/ReduxInterface";
import { renderProviderRouter } from "../testHelper/test-provider";

// objeto que é enviado
let alertDispatch: IAlertSlice;
let history: any = null;
beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});

describe("AlertList action", () => {
  let ret: any = null;
  beforeEach(() => {
    ret = renderSlice(false, "Mensagem teste", "info");
  });
  test("snapshot", () => {
    expect(ret.container).toMatchSnapshot();
  });
  test("open close", () => {
    expect(ret.getByText(/×/i).closest("div")).not.toHaveAttribute("hidden");
    expect(ret.queryAllByText(/Mensagem teste/).length).toBe(1);
    fireEvent.click(ret.getByText(/×/i));
    expect(ret.getByText(/×/i).closest("div")).toHaveAttribute("hidden");
  });
});

describe("AlertList parameters", () => {
  test("default", () => {
    const ret = renderSlice(false);
    expect(ret.queryAllByText(/não definida/).length).toBe(1);
  });

  test("paramentos mensagem:objeto", () => {
    const ret = renderSlice(
      false,
      {
        nome: "teste nome",
        id: 999,
        objeto: { id: 333, url: "http://1234.com.br" },
      },
      "danger"
    );
    const res = ret.getByText("id:999").parentElement?.textContent;
    expect(res).toContain("nome:teste nome");
    expect(res).toContain("id:333");
    expect(res).toContain("url:http://1234.com.br");
  });
});

const MockDispatchListAlert: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(listAlert(alertDispatch));
  return <></>;
};

const renderSlice = (hidden: boolean, message?: any, variant?: string) => {
  alertDispatch = {
    hidden: hidden,
    message: message,
    variant: variant,
  };
  return renderProviderRouter(
    render,
    <>
      <MockDispatchListAlert />
      <AlertList />
    </>,
    history,
    store
  );
};
