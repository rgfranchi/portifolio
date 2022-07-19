import React from "react";

import { createMemoryHistory } from "history";

import { useDispatch, useSelector } from "react-redux";
import { cleanup, render } from "@testing-library/react";

import store from "../../redux/store";
import { destroyAlerts, listAlert } from "../../redux/alertSlice";
import { alertSliceDefault } from "../testHelper/test-text-defaults";
import { IAlertSlice, IReducer, IState } from "../../interfaces/ReduxInterface";
import { renderProviderRouter } from "../testHelper/test-provider";

// objeto recebido
let objReceive: IAlertSlice;
// objeto esperado no retorno
export let objExpect = alertSliceDefault;
// objeto que é enviado
let objSender: IAlertSlice;
let history: any = null;

beforeEach(() => {
  cleanup();
  history = createMemoryHistory();
});
describe("alertSlice empty", () => {
  test("initialState", () => {
    renderSlice(<></>);
    expect(objReceive).toEqual(objExpect);
  });
});

describe("alertSlice value", () => {
  test("hidden", () => {
    objExpect.message = null;
    objSender = {
      hidden: true,
      message: null,
    };
    renderSlice(<MockDispatch action={listAlert} />);
    expect(objReceive).toEqual(objExpect);
  });
  test("show", () => {
    objExpect.hidden = false;
    objExpect.message = "ALERT SHOW MESSAGE";
    objSender = {
      hidden: objExpect.hidden,
      message: objExpect.message,
    };
    renderSlice(<MockDispatch action={listAlert} />);
    expect(objReceive).toEqual(objExpect);
  });
});

const renderSlice = (objRender: any) => {
  return renderProviderRouter(
    render,
    <>
      <MockDispatch action={destroyAlerts} />
      {objRender}
      <MockState />
    </>,
    history,
    store
  );
  // render(
  //   <>
  //     <MockDispatch action={destroyAlerts} />
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
  objReceive = useSelector((state: IState) => state.alert);
  return <></>;
};
