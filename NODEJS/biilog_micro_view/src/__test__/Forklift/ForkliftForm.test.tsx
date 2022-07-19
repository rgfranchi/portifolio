import React from "react";

import { act } from "react-dom/test-utils";

import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { renderProviderRouter } from "../testHelper/test-provider";

import { defaultFormTextValidate } from "../testHelper/test-text-defaults";

import {
  forkliftMock,
  loadForkliftInvalidValues,
  loadForkliftValidValues,
} from "../server/serverForklift";

import ForkliftForm from "../../Forklift/ForkliftForm";
import { emptyForklift } from "../../Forklift/ForkliftData";
import { loadOperatorsByCompany } from "../server/serverOperator";
import { IOperator } from "../../Operator/OperatorData";
import { IPlace } from "../../Place/PlaceData";
import { loadPlacesByCompany } from "../server/serverPlace";

let wrapper: any = null;
let history: any = null;
const objectMock = forkliftMock;
const objectEmpty = emptyForklift;
let loadValues: { operators: IOperator[]; places: IPlace[] } = {
  operators: [],
  places: [],
};
const submitMock = jest.fn();

beforeEach(() => {
  cleanup();
  jest.setTimeout(20000);
  history = createMemoryHistory();
  loadValues.operators = loadOperatorsByCompany(objectMock.module.companyId);
  loadValues.places = loadPlacesByCompany(objectMock.module.companyId);
});

describe("ForkliftForm snapshot", () => {
  test("empty", async () => {
    history.entries[0].key = "EMPTY_01";
    await setWrapperDefault(objectEmpty, submitMock, loadValues);
    expect(wrapper.container).toMatchSnapshot();
  });
  test("with data", async () => {
    history.entries[0].key = "DATA_01";
    await setWrapperDefault(objectMock, submitMock, loadValues);
    expect(wrapper.container).toMatchSnapshot();
  });
});

describe("ForkliftForm validate", () => {
  test("valid", async () => {
    await setWrapperDefault(objectEmpty, submitMock, loadValues);
    await act(async () => {
      await loadForkliftValidValues(userEvent, fireEvent, screen);
    });
    expect(
      screen.queryByText(defaultFormTextValidate.preenchimento)
    ).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
  test("invalid", async () => {
    await setWrapperDefault(objectEmpty, submitMock, loadValues);
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });
    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(3);
    await act(async () => {
      await loadForkliftInvalidValues(userEvent, fireEvent, screen);
    });
    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(2);
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
});

const setWrapperDefault = async (
  object: any,
  handleSubmit: any = () => {},
  loadValues: any
) => {
  await act(async () => {
    wrapper = await renderProviderRouter(
      render,
      <ForkliftForm
        initValues={object}
        submitForm={handleSubmit}
        loadValues={loadValues}
      />,
      history,
      store
    );
  });
};
