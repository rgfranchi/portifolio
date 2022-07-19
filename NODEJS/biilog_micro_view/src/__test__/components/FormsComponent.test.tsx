import React from "react";

import { cleanup } from "@testing-library/react";

import Enzime, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import {
  FromSelect,
  FormDatePicker,
  StringArrayToList,
} from "../../components/FormsComponent";

afterEach(cleanup);

Enzime.configure({ adapter: new Adapter() });

describe("FormsComponent snapshot", () => {
  test("StringArrayToList", () => {
    const wrapper = shallow(
      <StringArrayToList stringArray={["texto 1", "texto 2", "texto 3"]} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("FromSelect", () => {
    const wrapper = mockFromSelect();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("FormDatePicker", () => {
    const wrapper = shallow(
      <FormDatePicker
        name="mockDatePicker"
        formikSetFieldValue={() => {}}
        value="2020-01-01"
        dateFormat="dd/MM/yyyy"
        format="yyyy-MM-dd"
        isInvalid={true}
        showTimeInput={true}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("FormsComponent execute", () => {
  test("FromSelect", () => {
    const wrapper = mockFromSelect();
    let formSelect = wrapper.find("FormControl");
    formSelect.simulate("change", { value: ["VALOR 3"] });
    expect(mockFromChange).toHaveBeenCalledWith({ value: ["VALOR 3"] });
  });
});

const mockFromChange = jest.fn();
const mockFromData = [
  { id: 1, value: "VALOR 1" },
  { id: 2, value: "VALOR 2" },
  { id: 3, value: "VALOR 3" },
];
const mockFromSelect = (
  dataList: any = mockFromData,
  handleChange: any = mockFromChange
) => {
  return shallow(
    <FromSelect
      label="Teste Select Mock"
      name="mockSelect"
      dataId={"2"}
      dataList={dataList}
      dataEmpty={{ id: 0, value: "VALOR 0" }}
      handleChange={handleChange}
      handleBlur={() => {}}
      errors={""}
      isInvalid={true}
    />
  );
};
