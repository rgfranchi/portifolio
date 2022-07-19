import React from "react";

import { act } from "react-dom/test-utils";

import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  ModuleFormAccordion,
  ModuleFormFields,
  validateModuleFormFields,
} from "../../Module/ModuleForm";

import {
  loadModuleInvalidValues,
  loadModuleValidValues,
  moduleMock,
} from "../server/serverModule";
import { emptyModule } from "../../Module/ModuleData";
import { defaultFormTextValidate } from "../testHelper/test-text-defaults";
import { IFormSelectValue } from "../../components/FormsComponent";
import { loadPlacesByCompany } from "../server/serverPlace";
import { IOperator } from "../../Operator/OperatorData";
import { loadOperatorsByCompany } from "../server/serverOperator";

let wrapper: any = null;
const objectMock = { module: moduleMock };
const objectEmpty = { module: emptyModule };
const submitMock = jest.fn();
let loadPlaces: IFormSelectValue[] = [];
let loadOperators: IOperator[] = [];

beforeEach(() => {
  cleanup();
  const company_id = 2;
  const places = loadPlacesByCompany(company_id);
  places.forEach((place) => {
    loadPlaces.push({ id: place.id, value: place.nome });
  });

  loadOperators = loadOperatorsByCompany(company_id);

  jest.setTimeout(20000);
});

describe("ModuleForm snapshot", () => {
  test("empty", async () => {
    await setWrapperDefault(objectEmpty, submitMock, loadPlaces, loadOperators);
    expect(wrapper.container).toMatchSnapshot();
  });
  test("with data", async () => {
    await setWrapperDefault(objectMock, submitMock, loadPlaces, loadOperators);
    expect(wrapper.container).toMatchSnapshot();
  });
});

describe("ModuleForm validate", () => {
  test("valid", async () => {
    await setWrapperDefault(objectEmpty, submitMock, loadPlaces, loadOperators);
    await act(async () => {
      await loadModuleValidValues(userEvent, fireEvent, screen);
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
    await setWrapperDefault(objectEmpty, submitMock, loadPlaces, loadOperators);
    await act(async () => {
      fireEvent.click(screen.getByText("Salvar"));
    });
    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(2);
    await act(async () => {
      await loadModuleInvalidValues(userEvent, fireEvent, screen);
    });
    expect(
      screen.queryAllByText(defaultFormTextValidate.preenchimento).length
    ).toBe(1);
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
});

/**
 * Sub elemento de um Formik.
 * Utilizar sempre o nome da entidade no objeto.
 * Ex: Validade e mockObjeto e mockEmpty
 * @param object
 * @param handleSubmit
 */
const setWrapperDefault = async (
  object: any,
  handleSubmit: any = () => {},
  places: IFormSelectValue[],
  operators: IOperator[]
) => {
  await act(async () => {
    wrapper = render(
      <Formik
        initialValues={object}
        enableReinitialize={true}
        validationSchema={Yup.object({
          module: validateModuleFormFields,
        })}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <ModuleFormAccordion
              formik={formik}
              loadPlaces={places}
              loadOperators={operators}
            />
            <button type="submit">Salvar</button>
          </form>
        )}
      </Formik>
    );
  });
};
