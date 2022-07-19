import React from "react";
import { IReducer } from "../../interfaces/ReduxInterface";
import store from "../../redux/store";

import { objMockEmptySession } from "../testHelper/test-session";

import {
  modalSliceDefault,
  alertSliceDefault,
} from "../testHelper/test-text-defaults";

/**
 * @todo Verificar pq não está aceitando a construção com interface.
 */
let mockState: IReducer = {
  // empty
  // @ts-ignore
  companies: [],
  session: objMockEmptySession,
  modals: modalSliceDefault,
  alert: alertSliceDefault,
};

describe("store empty", () => {
  test("state", () => {
    expect(store.getState()).toEqual(mockState);
  });
});

describe("store load", () => {
  test("state", () => {
    expect(store.getState()).toEqual(mockState);
  });
});
